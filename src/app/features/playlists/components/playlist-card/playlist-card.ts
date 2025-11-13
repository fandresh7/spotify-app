import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'playlist-card',
  imports: [],
  templateUrl: './playlist-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'bg-card-base hover:bg-card-hover flex cursor-pointer flex-row items-center gap-2 overflow-hidden rounded pr-2 transition-all duration-500'
  }
})
export class PlaylistCard {}
