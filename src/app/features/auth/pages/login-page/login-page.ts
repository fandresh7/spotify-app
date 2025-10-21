import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { SessionApi } from '@core/services/session-api/session-api'

@Component({
  selector: 'login-page',
  imports: [],
  templateUrl: './login-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPage {
  sessionApi = inject(SessionApi)

  authorizeUrl = toSignal(this.sessionApi.getAuthorizeUrl())

  login() {
    const url = this.authorizeUrl()
    if (!url) return

    window.location.href = url
  }
}
