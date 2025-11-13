import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Playlist, PlaylistResponse } from '@core/interfaces/playlists.interfaces'
import { PlaylistItemsResponse } from '@core/interfaces/songs.interface'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PlaylistsApi {
  #http = inject(HttpClient)

  getPlaylists(limit: number, offset: number): Observable<PlaylistResponse> {
    console.log({ limit, offset })
    return this.#http.get<PlaylistResponse>('/playlists.json')
  }

  getPlaylistTracks(playlist: Playlist): Observable<PlaylistItemsResponse> {
    const tracks = playlist.tracks.total
    console.log({ tracks })
    return this.#http.get<PlaylistItemsResponse>('/playlist.json')
  }
}
