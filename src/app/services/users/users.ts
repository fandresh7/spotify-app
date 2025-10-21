import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class Users {
  http = inject(HttpClient)

  getMe() {
    return this.http.get('/api/users/me')
  }
}
