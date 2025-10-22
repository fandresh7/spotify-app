import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core'
import { Router } from '@angular/router'
import { Icon } from '../icons/icons.component'

@Component({
  selector: 'user-menu',
  imports: [Icon],
  templateUrl: './user-menu.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMenu {
  private router = inject(Router)

  isOpen = input.required<boolean>()

  logout() {
    this.router.navigate(['/login'])
  }
}
