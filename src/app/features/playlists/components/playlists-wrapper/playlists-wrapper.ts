import { ChangeDetectionStrategy, Component, inject, input, linkedSignal, signal } from '@angular/core'
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { HttpClient } from '@angular/common/http'

import { Playlist } from '@core/interfaces/playlists.interfaces'
import { Track } from '@core/interfaces/songs.interface'
import { Icon } from '@shared/components'
import { SongCard } from '@features/songs/components/song-card/song-card'
import { Dialog } from '@angular/cdk/dialog'
import { CreatePlaylistModal } from '../create-playlist-modal/create-playlist-modal'

interface DragDropPlaylist {
  id: string
  name: string
  tracks: Track[]
  original: boolean
  color: string
}

@Component({
  selector: 'playlists-wrapper',
  imports: [DragDropModule, Icon, SongCard],
  templateUrl: './playlists-wrapper.html',
  styleUrl: './playlists-wrapper.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block h-full'
  }
})
export class PlaylistsWrapper {
  private http = inject(HttpClient)
  dialog = inject(Dialog)

  playlist = input.required<Playlist>()
  tracks = input.required<Track[]>()

  private playlistColors = [
    'linear-gradient(135deg, #5b21b6 0%, #3b0764 100%)', // Purple
    'linear-gradient(135deg, #0d9488 0%, #134e4a 100%)', // Teal
    'linear-gradient(135deg, #ea580c 0%, #9a3412 100%)', // Orange
    'linear-gradient(135deg, #db2777 0%, #831843 100%)', // Pink
    'linear-gradient(135deg, #4f46e5 0%, #312e81 100%)', // Indigo
    'linear-gradient(135deg, #dc2626 0%, #7f1d1d 100%)', // Red
    'linear-gradient(135deg, #16a34a 0%, #14532d 100%)', // Green
    'linear-gradient(135deg, #0891b2 0%, #164e63 100%)', // Cyan
    'linear-gradient(135deg, #c026d3 0%, #701a75 100%)' // Fuchsia
  ]

  playlists = linkedSignal(() => {
    const original = {
      id: this.playlist().id,
      name: this.playlist().name,
      tracks: this.tracks(),
      original: true,
      color: 'linear-gradient(135deg, #1e3a5f 0%, #0d1b2a 100%)'
    }

    return [original]
  })

  private colorIndex = signal(0)

  dropPlaylist(event: CdkDragDrop<DragDropPlaylist[]>) {
    const playlists = [...this.playlists()]
    moveItemInArray(playlists, event.previousIndex, event.currentIndex)
    this.playlists.set(playlists)
  }

  dropTrack(event: CdkDragDrop<Track[]>) {
    const playlists = [...this.playlists()]

    if (event.previousContainer === event.container) {
      // Reordenar dentro de la misma playlist
      const playlistIndex = playlists.findIndex(p => p.id === event.container.id)
      if (playlistIndex !== -1) {
        const tracks = [...playlists[playlistIndex].tracks]
        moveItemInArray(tracks, event.previousIndex, event.currentIndex)
        playlists[playlistIndex] = { ...playlists[playlistIndex], tracks }
        this.playlists.set(playlists)
      }
    } else {
      // Transferir entre playlists diferentes
      const sourcePlaylistIndex = playlists.findIndex(p => p.id === event.previousContainer.id)
      const targetPlaylistIndex = playlists.findIndex(p => p.id === event.container.id)

      if (sourcePlaylistIndex !== -1 && targetPlaylistIndex !== -1) {
        const sourceTracks = [...playlists[sourcePlaylistIndex].tracks]
        const targetTracks = [...playlists[targetPlaylistIndex].tracks]

        transferArrayItem(sourceTracks, targetTracks, event.previousIndex, event.currentIndex)

        playlists[sourcePlaylistIndex] = { ...playlists[sourcePlaylistIndex], tracks: sourceTracks }
        playlists[targetPlaylistIndex] = { ...playlists[targetPlaylistIndex], tracks: targetTracks }
        this.playlists.set(playlists)
      }
    }
  }

  save() {
    const playlists = this.playlists()

    // Find the original playlist (the one from Spotify)
    const originalPlaylist = playlists.find(p => p.original)

    if (!originalPlaylist) {
      console.error('No original playlist found')
      return
    }

    // Get all track URIs from the original playlist
    const trackUris = originalPlaylist.tracks.map(track => track.uri)

    // Update the playlist in Spotify
    this.http
      .put(`/api/playlists/${originalPlaylist.id}/tracks`, {
        uris: trackUris
      })
      .subscribe({
        next: () => {
          console.log('Playlist updated successfully')
        },
        error: err => {
          console.error('Error updating playlist:', err)
        }
      })
  }

  openCreatePlaylistModal() {
    const dialogRef = this.dialog.open(CreatePlaylistModal, {
      panelClass: 'modal',
      autoFocus: 'input',
      data: {
        type: 'create'
      }
    })

    dialogRef.closed.subscribe(data => {
      if (!data) return

      const name = (data as { name: string }).name

      const newPlaylist: DragDropPlaylist = {
        id: `playlist-${Date.now()}`,
        name,
        tracks: [],
        original: false,
        color: this.playlistColors[this.colorIndex() % this.playlistColors.length]
      }

      this.colorIndex.update(index => index + 1)
      this.playlists.update(playlists => [...playlists, newPlaylist])
    })
  }

  openEditPlaylistModal(playlist: DragDropPlaylist) {
    const dialogRef = this.dialog.open(CreatePlaylistModal, {
      panelClass: 'modal',
      autoFocus: 'input',
      data: {
        type: 'edit',
        name: playlist.name
      }
    })

    dialogRef.closed.subscribe(data => {
      if (!data) return

      const name = (data as { name: string }).name

      this.playlists.update(playlists => playlists.map(p => (p.id === playlist.id ? { ...p, name } : p)))
    })
  }

  getConnectedLists(): string[] {
    return this.playlists().map(p => p.id)
  }
}
