import { ChangeDetectionStrategy, Component } from '@angular/core'
import { PlaylistCard } from '@features/playlists/components/playlist-card/playlist-card'
import { Playlist } from '@features/playlists/components/playlist/playlist'

@Component({
  selector: 'home-page',
  imports: [PlaylistCard, Playlist],
  templateUrl: './home-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {}
