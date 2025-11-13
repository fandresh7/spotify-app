import { ChangeDetectionStrategy, Component } from '@angular/core'
import { PlaylistCard } from '@features/playlists/components/playlist-card/playlist-card'
import { SongCard } from '@features/songs/components/song-card/song-card'
import { Playlist } from '@features/playlists/components/playlist/playlist'

@Component({
  selector: 'home-page',
  imports: [PlaylistCard, SongCard, Playlist],
  templateUrl: './home-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {}
