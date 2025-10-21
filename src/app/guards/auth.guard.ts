import { inject } from '@angular/core'
import { Router, type CanActivateFn } from '@angular/router'
import { map } from 'rxjs'
import { Session } from '../services/session/session'

export const authGuard: CanActivateFn = () => {
  const session = inject(Session)
  const router = inject(Router)

  return session.isAuthenticated().pipe(
    map(isAuth => {
      if (!isAuth) {
        router.navigate(['/login'])
        return false
      }
      return true
    })
  )
}
