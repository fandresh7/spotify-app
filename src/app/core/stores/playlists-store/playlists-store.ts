import { computed, inject, Injectable, signal } from '@angular/core'
import { firstValueFrom } from 'rxjs'

import { Playlist } from '@core/interfaces/playlists.interfaces'
import { PlaylistsApi } from '@core/services/playlists-api/playlists-api'

export interface PlaylistsState {
  playlists: Playlist[]
  limit: number
  offset: number
  total: number
  hasNextPage: boolean
  loading: boolean
}

const initialState: PlaylistsState = {
  playlists: [],
  limit: 20,
  offset: 0,
  total: 0,
  hasNextPage: true,
  loading: false
}

@Injectable({
  providedIn: 'root'
})
export class PlaylistsStore {
  #playlistsApi = inject(PlaylistsApi)

  #state = signal<PlaylistsState>(initialState)

  // Selectors
  playlists = computed(() => this.#state().playlists)
  loading = computed(() => this.#state().loading)
  hasNextPage = computed(() => this.#state().hasNextPage)

  async loadPlaylists() {
    const { loading, hasNextPage, limit, offset } = this.#state()
    if (loading || !hasNextPage) return

    this.#state.update(state => ({ ...state, loading: true }))

    const response = await firstValueFrom(this.#playlistsApi.getPlaylists(limit, offset))

    this.#state.update(state => ({
      ...state,
      playlists: [...state.playlists, ...response.items],
      offset: state.offset + limit,
      total: response.total,
      hasNextPage: !!response.next,
      loading: false
    }))
  }
}
