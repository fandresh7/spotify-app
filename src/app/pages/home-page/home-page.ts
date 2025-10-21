import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { UserStore } from '@features/user/stores/user-store/user-store'

@Component({
  selector: 'home-page',
  imports: [],
  templateUrl: './home-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage implements OnInit {
  userStore = inject(UserStore)

  ngOnInit() {
    this.userStore.loadUser()
  }
}
