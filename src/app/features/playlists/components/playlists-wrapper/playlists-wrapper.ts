import { ChangeDetectionStrategy, Component, inject, input, linkedSignal } from '@angular/core'
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'

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
  dialog = inject(Dialog)

  playlist = input.required<Playlist>()
  tracks = input.required<Track[]>()

  playlists = linkedSignal(() => {
    const original = {
      id: this.playlist().id,
      name: this.playlist().name,
      tracks: this.tracks(),
      original: true
    }

    const supportPlaylists = [
      {
        id: 'liked-songs',
        name: 'Liked songs',
        tracks: [],
        original: false
      },
      {
        id: 'recently-played',
        name: 'Recently played',
        tracks: [],
        original: false
      },
      {
        id: 'your-top-songs',
        name: 'Your top songs',
        tracks: [],
        original: false
      }
    ]

    return [original, ...supportPlaylists]
  })

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

  openCreatePlaylistModal() {
    const dialogRef = this.dialog.open(CreatePlaylistModal, {
      panelClass: 'modal',
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
        original: false
      }

      this.playlists.update(playlists => [...playlists, newPlaylist])
    })
  }

  openEditPlaylistModal(playlist: DragDropPlaylist) {
    const dialogRef = this.dialog.open(CreatePlaylistModal, {
      panelClass: 'modal',
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
