import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core'
import { Track } from '@core/interfaces/songs.interface'
import { PlayerService } from '@core/services/player.service'
import { Icon } from '@shared/components'

@Component({
  selector: 'song-card',
  imports: [Icon],
  templateUrl: './song-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'group/song relative min-h-12 bg-transparent hover:bg-card-hover flex cursor-pointer flex-row items-center gap-2 overflow-hidden rounded pr-2 transition-colors duration-200'
  }
})
export class SongCard {
  private playerService = inject(PlayerService)

  track = input.required<Track>()

  isPlaying = computed(() => {
    return this.playerService.track()?.id === this.track().id && this.playerService.playing()
  })

  onPlayClick(event: Event) {
    event.stopPropagation()
    this.playerService.play(this.track())
  }
}
