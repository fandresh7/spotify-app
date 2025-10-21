import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { map } from 'rxjs'
import { TokenResponse } from '@core/interfaces/session.interfaces'

@Injectable({
  providedIn: 'root'
})
export class SessionApi {
  http = inject(HttpClient)

  getAuthorizeUrl() {
    return this.http.get<{ url: string }>('/api/session/authorize').pipe(map(res => res.url))
  }

  getToken(code: string) {
    return this.http.post<TokenResponse>('/api/session/token', {
      code
    })
  }

  isAuthenticated() {
    return this.http.get<{ authenticated: boolean }>('/api/session/status').pipe(map(res => res.authenticated))
  }
}
