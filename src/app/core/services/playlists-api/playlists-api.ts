import { HttpClient, HttpParams } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Playlist, PlaylistResponse } from '@core/interfaces/playlists.interfaces'
import { PlaylistItemsResponse, Track } from '@core/interfaces/songs.interface'
import { Observable, forkJoin, map, of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PlaylistsApi {
  #http = inject(HttpClient)

  getPlaylists(limit: number, offset: number): Observable<PlaylistResponse> {
    console.log({ limit, offset })
    const params = new HttpParams().set('limit', limit).set('offset', offset)
    return this.#http.get<PlaylistResponse>('/api/playlists', { params })
  }

  getPlaylistTracks(playlist: Playlist): Observable<Track[]> {
    const total = playlist.tracks.total
    const limit = 50
    const pages = Math.ceil(total / limit)

    // If no tracks, return empty array
    if (total === 0) {
      return of([])
    }

    // Create array of requests for each page
    const requests: Observable<PlaylistItemsResponse>[] = []

    for (let i = 0; i < pages; i++) {
      const offset = i * limit
      const params = new HttpParams().set('limit', limit).set('offset', offset)

      requests.push(this.#http.get<PlaylistItemsResponse>(`/api/playlists/${playlist.id}`, { params }))
    }

    // Execute all requests in parallel and combine results
    return forkJoin(requests).pipe(
      map(responses => {
        // Flatten all tracks from all pages
        return responses.flatMap(response => response.items.map(item => item.track))
      })
    )
  }
}
