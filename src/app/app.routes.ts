import { Routes } from '@angular/router'
import { HomePage } from './pages/home-page/home-page'
import { LoginPage } from './pages/login-page/login-page'
import { CallbackPage } from './pages/callback-page/callback-page'
import { authGuard } from './guards/auth.guard'

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'callback',
    component: CallbackPage
  }
]
