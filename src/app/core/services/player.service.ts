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
    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = localStorage.getItem('spotify_access_token')

      if (!token) {
        console.warn('No access token found. Please login first.')
        return
      }

      this.player = new window.Spotify.Player({
        name: 'Spotify Clone Web Player',
        getOAuthToken: (cb: (token: string) => void) => {
          cb(token)
        },
        volume: 0.5
      })

      // Ready
      this.player.addListener('ready', ({ device_id }: { device_id: string }) => {
        console.log('Ready with Device ID', device_id)
        this.deviceId = device_id
      })

      // Not Ready
      this.player.addListener('not_ready', ({ device_id }: { device_id: string }) => {
        console.log('Device ID has gone offline', device_id)
      })

      // Player state changed
      this.player.addListener('player_state_changed', (state: any) => {
        if (!state) return

        this.isPlaying.set(!state.paused)

        if (state.track_window.current_track) {
          const track = state.track_window.current_track
          console.log('Currently playing:', track.name)
        }
      })

      // Connect to the player
      this.player.connect()
    }
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
      console.warn('Device not ready yet')
      return
    }

    const token = localStorage.getItem('spotify_access_token')
    if (!token) {
      console.warn('No access token found')
      return
    }

    // Use Spotify Web API to play the track
    this.http
      .put(
        `https://api.spotify.com/v1/me/player/play?device_id=${this.deviceId}`,
        {
          uris: [track.uri]
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      .subscribe({
        next: () => console.log('Playing:', track.name),
        error: err => console.error('Error playing track:', err)
      })
  }

  pause() {
    if (this.player) {
      this.player.pause().then(() => {
        this.isPlaying.set(false)
        console.log('Paused')
      })
    }
  }

  resume() {
    if (this.player && this.currentTrack()) {
      this.player.resume().then(() => {
        this.isPlaying.set(true)
        console.log('Resumed')
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
    console.log('Stopped')
  }
}
