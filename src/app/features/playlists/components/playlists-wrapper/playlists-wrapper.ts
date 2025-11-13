import { ChangeDetectionStrategy, Component, input } from '@angular/core'
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
    class: 'grid h-full min-h-0 grid-cols-2 overflow-y-hidden rounded-lg'
  }
})
export class PlaylistsWrapper {
  playlist = input.required<Playlist>()
  tracks = input.required<Track[]>()
}
