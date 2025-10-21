import { inject, Injectable, signal } from '@angular/core'
import { User } from '@core/interfaces/users.interfaces'
import { UsersApi } from '@core/services/users-api/users-api'
import { firstValueFrom } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserStore {
  usersApi = inject(UsersApi)

  #user = signal<User | null>(null)
  user = this.#user.asReadonly()

  async loadUser() {
    const user = await firstValueFrom(this.usersApi.getMe())
    console.log(user)
    this.#user.set(user)
  }
}
