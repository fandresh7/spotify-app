import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { filter } from 'rxjs'
import { Icon } from '../icons/icons.component'

@Component({
  selector: 'search-bar',
  imports: [FormsModule, Icon],
  templateUrl: './search-bar.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBar {
  private router = inject(Router)

  searchQuery = signal('')
  showSearch = signal(false)

  constructor() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.updateSearchVisibility()
    })
  }

  onSearchChange() {
    console.log('Search query:', this.searchQuery())
  }

  clearSearch() {
    this.searchQuery.set('')
  }

  private updateSearchVisibility() {
    const currentUrl = this.router.url
    const searchRoutes = ['/search', '/home', '/playlists']
    this.showSearch.set(searchRoutes.some(route => currentUrl.includes(route)))
  }
}
