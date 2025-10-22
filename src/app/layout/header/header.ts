import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { NavigationButtons } from '@shared/components/navigation-buttons/navigation-buttons'
import { SearchBar } from '@shared/components/search-bar/search-bar'
import { UserProfile } from '@shared/components/user-profile/user-profile'
import { UserMenu } from '@shared/components/user-menu/user-menu'

@Component({
  selector: 'main-header',
  imports: [NavigationButtons, SearchBar, UserProfile, UserMenu],
  templateUrl: './header.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header {
  isUserMenuOpen = signal(false)

  onMenuToggle(isOpen: boolean) {
    this.isUserMenuOpen.set(isOpen)
  }
}
