/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, signal, computed, inject } from '@angular/core'
import { Track } from '@core/interfaces/songs.interface'
import { HttpClient } from '@angular/common/http'

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void
    Spotify: any
  }
}

@Injectable({ providedIn: 'root' })
export class PlayerService {
  private http = inject(HttpClient)

  private currentTrack = signal<Track | null>(null)
  private isPlaying = signal(false)
  private player: any = null
  private deviceId: string | null = null

  // Public readonly signals
  track = this.currentTrack.asReadonly()
  playing = this.isPlaying.asReadonly()

  // Computed signal to check if a specific track is currently playing
  isTrackPlaying = computed(() => {
    return (trackId: string) => {
      return this.currentTrack()?.id === trackId && this.isPlaying()
    }
  })

  constructor() {
    this.initializePlayer()
  }

  private initializePlayer() {
    // Check if SDK is already loaded
    if (window.Spotify) {
      this.http.get<{ accessToken: string }>('/api/session/access-token').subscribe({
        next: ({ accessToken }) => {
          this.initializeSpotifyPlayer(accessToken)
        },
        error: err => {
          console.error('Failed to get access token:', err)
        }
      })
      return
    }

    // Otherwise wait for SDK to load
    window.onSpotifyWebPlaybackSDKReady = () => {
      this.http.get<{ accessToken: string }>('/api/session/access-token').subscribe({
        next: ({ accessToken }) => {
          this.initializeSpotifyPlayer(accessToken)
        },
        error: err => {
          console.error('Failed to get access token:', err)
        }
      })
    }
  }

  private initializeSpotifyPlayer(token: string) {
    this.player = new window.Spotify.Player({
      name: 'Spotify Clone Web Player',
      getOAuthToken: (cb: (token: string) => void) => {
        cb(token)
      },
      volume: 0.5
    })

    // Ready
    this.player.addListener('ready', ({ device_id }: { device_id: string }) => {
      this.deviceId = device_id
    })

    // Not Ready
    this.player.addListener('not_ready', () => {
      this.deviceId = null
    })

    // Player state changed
    this.player.addListener('player_state_changed', (state: any) => {
      if (!state) return
      this.isPlaying.set(!state.paused)
    })

    // Connect to the player
    this.player.connect()
  }

  play(track: Track) {
    // If clicking the same track, toggle play/pause
    if (this.currentTrack()?.id === track.id) {
      this.togglePlayPause()
      return
    }

    // Otherwise, play the new track
    this.currentTrack.set(track)
    this.isPlaying.set(true)

    if (!this.deviceId) {
      return
    }

    // Call server endpoint to play the track
    this.http
      .put('/api/player/play', {
        deviceId: this.deviceId,
        uris: [track.uri]
      })
      .subscribe({
        error: err => console.error('Error playing track:', err)
      })
  }

  pause() {
    if (this.player) {
      this.player.pause().then(() => {
        this.isPlaying.set(false)
      })
    }
  }

  resume() {
    if (this.player && this.currentTrack()) {
      this.player.resume().then(() => {
        this.isPlaying.set(true)
      })
    }
  }

  togglePlayPause() {
    if (this.isPlaying()) {
      this.pause()
    } else {
      this.resume()
    }
  }

  stop() {
    if (this.player) {
      this.player.pause()
    }
    this.currentTrack.set(null)
    this.isPlaying.set(false)
  }
}
