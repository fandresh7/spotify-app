import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Icon } from '@shared/components'

@Component({
  selector: 'song-card',
  imports: [Icon],
  templateUrl: './song-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'group/song relative bg-transparent hover:bg-card-hover flex cursor-pointer flex-row items-center gap-2 overflow-hidden rounded pr-2 transition-all duration-500'
  }
})
export class SongCard {}
