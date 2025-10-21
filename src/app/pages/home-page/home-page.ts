import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { Users } from '../../services/users/users'

@Component({
  selector: 'home-page',
  imports: [],
  templateUrl: './home-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {
  users = inject(Users)

  constructor() {
    this.users.getMe().subscribe()
  }
}
