import { ChangeDetectionStrategy, Component, computed, inject, output, signal } from '@angular/core'
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

  user = computed(() => this.userStore.user())

  toggleMenu() {
    this.isMenuOpen.update(open => !open)
    this.menuToggle.emit(this.isMenuOpen())
  }
}
