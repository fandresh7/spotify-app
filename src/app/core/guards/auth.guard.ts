import { inject } from '@angular/core'
import { Router, type CanActivateFn } from '@angular/router'
import { map } from 'rxjs'
import { SessionApi } from '@core/services/session-api/session-api'

export const authGuard: CanActivateFn = () => {
  const sessionApi = inject(SessionApi)
  const router = inject(Router)

  return sessionApi.isAuthenticated().pipe(
    map(isAuth => {
      if (!isAuth) {
        router.navigate(['/login'])
        return false
      }
      return true
    })
  )
}
