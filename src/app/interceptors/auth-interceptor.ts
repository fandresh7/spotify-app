import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http'
import { inject, PLATFORM_ID } from '@angular/core'
import { Router } from '@angular/router'
import { catchError, throwError } from 'rxjs'
import { isPlatformBrowser } from '@angular/common'

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router)
  const platformId = inject(PLATFORM_ID)

  const reqWithCredentials = req.clone({
    withCredentials: true
  })

  return next(reqWithCredentials).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && isPlatformBrowser(platformId)) {
        router.navigate(['/login'])
      }

      return throwError(() => error)
    })
  )
}
