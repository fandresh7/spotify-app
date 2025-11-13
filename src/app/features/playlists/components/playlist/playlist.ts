import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SongCard } from '@features/songs/components/song-card/song-card'
import { Icon } from '@shared/components'

@Component({
  selector: 'playlist',
  imports: [SongCard, Icon],
  templateUrl: './playlist.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'p-4 bg-red-500/70 rounded-lg flex flex-col overflow-hidden'
  }
})
export class Playlist {}
