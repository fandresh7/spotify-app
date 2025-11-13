import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core'
import { Playlist } from '@core/interfaces/playlists.interfaces'
import { Track } from '@core/interfaces/songs.interface'
import { Icon } from '@shared/components'
import { SongCard } from '@features/songs/components/song-card/song-card'

@Component({
  selector: 'playlists-wrapper',
  imports: [Icon, SongCard],
  templateUrl: './playlists-wrapper.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block h-full'
  }
})
export class PlaylistsWrapper {
  playlist = input.required<Playlist>()
  tracks = input.required<Track[]>()

  supportPlaylists = signal<{ name: string; tracks: Track[] }[]>([
    {
      name: 'Liked songs',
      tracks: []
    },
    {
      name: 'Recently played',
      tracks: []
    },
    {
      name: 'Your top songs',
      tracks: []
    }
  ])
}
