import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { User } from '@core/interfaces/users.interfaces'

@Injectable({
  providedIn: 'root'
})
export class UsersApi {
  http = inject(HttpClient)

  getMe() {
    return this.http.get<User>('/api/users/me')
  }
}
