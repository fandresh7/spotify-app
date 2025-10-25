import { ChangeDetectionStrategy, Component } from '@angular/core'
import { PlaylistCard } from '@features/playlists/components/playlist-card/playlist-card'

@Component({
  selector: 'home-page',
  imports: [PlaylistCard],
  templateUrl: './home-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {}
