import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core'
import { firstValueFrom, map } from 'rxjs'

import { Playlist } from '@core/interfaces/playlists.interfaces'
import { Track } from '@core/interfaces/songs.interface'
import { PlaylistsApi } from '@core/services/playlists-api/playlists-api'
import { PlaylistsStore } from '@core/stores/playlists-store/playlists-store'
import { PlaylistCard } from '@features/playlists/components/playlist-card/playlist-card'
import { PlaylistsWrapper } from '@features/playlists/components/playlists-wrapper/playlists-wrapper'

@Component({
  selector: 'home-page',
  imports: [PlaylistCard, PlaylistsWrapper],
  templateUrl: './home-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {
  playlistsStore = inject(PlaylistsStore)
  playlistsApi = inject(PlaylistsApi)

  playlists = computed(() => this.playlistsStore.playlists())

  selectedPlaylist = signal<Playlist | null>(null)
  tracks = signal<Track[]>([])

  constructor() {
    this.playlistsStore.loadPlaylists()
  }

  async loadPlaylistTracks(playlist: Playlist) {
    this.tracks.set([])

    const response$ = this.playlistsApi.getPlaylistTracks(playlist).pipe(map(response => response.items))
    const response = await firstValueFrom(response$)

    const tracks = response.map(item => item.track)
    this.tracks.set(tracks)
  }

  onPlaylistSelected(playlist: Playlist) {
    this.loadPlaylistTracks(playlist)
    this.selectedPlaylist.set(playlist)
  }
}
