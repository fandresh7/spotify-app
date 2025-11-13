import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core'
import { NgOptimizedImage } from '@angular/common'
import { Playlist } from '@core/interfaces/playlists.interfaces'

@Component({
  selector: 'playlist-card',
  imports: [NgOptimizedImage],
  templateUrl: './playlist-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: '@container/playlist-card hover:bg-card-hover cursor-pointer flex flex-row items-center gap-2 overflow-hidden rounded-sm transition-all duration-500 p-2',
    '(click)': 'onClick()'
  }
})
export class PlaylistCard {
  playlist = input.required<Playlist>()
  clicked = output<Playlist>()

  image = computed(() => this.playlist().images.at(-1)!)

  onClick() {
    this.clicked.emit(this.playlist())
  }
}
