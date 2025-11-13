import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { UserProfile } from '@shared/components/user-profile/user-profile'
import { UserMenu } from '@shared/components/user-menu/user-menu'

@Component({
  selector: 'main-header',
  imports: [UserProfile, UserMenu],
  templateUrl: './header.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header {
  isUserMenuOpen = signal(false)

  onMenuToggle(isOpen: boolean) {
    this.isUserMenuOpen.set(isOpen)
  }
}
