import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core'
import { Playlist as PlaylistInterface } from '@core/interfaces/playlists.interfaces'
import { Song } from '@core/interfaces/songs.interface'
import { PlaylistsApi } from '@core/services/playlists-api/playlists-api'
import { PlaylistsStore } from '@core/stores/playlists-store/playlists-store'
import { PlaylistCard } from '@features/playlists/components/playlist-card/playlist-card'
import { firstValueFrom, map } from 'rxjs'
import { Playlist } from '@features/playlists/components/playlist/playlist'

@Component({
  selector: 'home-page',
  imports: [PlaylistCard, Playlist],
  templateUrl: './home-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {
  playlistsStore = inject(PlaylistsStore)
  playlistsApi = inject(PlaylistsApi)

  playlists = computed(() => this.playlistsStore.playlists())

  selectedPlaylist = signal<PlaylistInterface | null>(null)
  tracks = signal<Song[] | null>(null)

  constructor() {
    this.playlistsStore.loadPlaylists()
  }

  async loadPlaylistTracks(playlist: PlaylistInterface) {
    const tracks$ = this.playlistsApi.getPlaylistTracks(playlist).pipe(map(response => response.items))
    const tracks = await firstValueFrom(tracks$)
    this.tracks.set(tracks)
  }

  onPlaylistSelected(playlist: PlaylistInterface) {
    this.loadPlaylistTracks(playlist)
    this.selectedPlaylist.set(playlist)
  }
}
