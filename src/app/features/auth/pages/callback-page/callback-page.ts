import { ChangeDetectionStrategy, Component, inject, PLATFORM_ID, afterNextRender } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router'
import { firstValueFrom } from 'rxjs'

import { SessionApi } from '@core/services/session-api/session-api'

@Component({
  selector: 'callback-page',
  imports: [],
  templateUrl: './callback-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CallbackPage {
  sessionApi = inject(SessionApi)
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
      const response$ = this.sessionApi.getToken(code)
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
