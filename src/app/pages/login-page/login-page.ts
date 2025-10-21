import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { Session } from '../../services/session/session'

@Component({
  selector: 'login-page',
  imports: [],
  templateUrl: './login-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPage {
  session = inject(Session)

  authorizeUrl = toSignal(this.session.getAuthorizeUrl())

  login() {
    const url = this.authorizeUrl()
    if (!url) return

    window.location.href = url
  }
}
