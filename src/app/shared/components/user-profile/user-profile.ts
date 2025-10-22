import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core'
import { UserStore } from '@features/user/stores/user-store/user-store'
import { Icon } from '../icons/icons.component'

@Component({
  selector: 'user-profile',
  imports: [Icon],
  templateUrl: './user-profile.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfile {
  userStore = inject(UserStore)

  isMenuOpen = signal(false)
  menuToggle = output<boolean>()

  toggleMenu() {
    this.isMenuOpen.update(open => !open)
    this.menuToggle.emit(this.isMenuOpen())
  }
}
