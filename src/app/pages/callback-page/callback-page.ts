import { ChangeDetectionStrategy, Component, inject, PLATFORM_ID, afterNextRender } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { firstValueFrom } from 'rxjs'
import { Session } from '../../services/session/session'
import { isPlatformBrowser } from '@angular/common'

@Component({
  selector: 'callback-page',
  imports: [],
  templateUrl: './callback-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CallbackPage {
  session = inject(Session)
  router = inject(Router)
  route = inject(ActivatedRoute)
  platformId = inject(PLATFORM_ID)

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      afterNextRender(() => {
        this.handleCallback()
      })
    }
  }

  private handleCallback() {
    const code = this.route.snapshot.queryParams['code']
    const state = this.route.snapshot.queryParams['state']
    const error = this.route.snapshot.queryParams['error']

    if (error) {
      this.router.navigate(['/login'], {
        queryParams: { error: 'access_denied' }
      })
      return
    }

    if (!code) {
      this.router.navigate(['/login'])
      return
    }

    if (!state) {
      this.router.navigate(['/login'])
      return
    }

    this.getToken(code)
  }

  async getToken(code: string) {
    try {
      const response$ = this.session.getToken(code)
      const response = await firstValueFrom(response$)

      if (!response.success) {
        this.router.navigate(['/login'])
        return
      }

      this.router.navigate(['/'])
    } catch (error) {
      console.error('Error getting token:', error)
      this.router.navigate(['/login'])
    }
  }
}
