import { Routes } from '@angular/router'

import { LoginPage } from '@features/auth/pages/login-page/login-page'
import { CallbackPage } from '@features/auth/pages/callback-page/callback-page'
import { authGuard } from '@core/guards/auth.guard'
import { HomePage } from '@pages/home-page/home-page'
import { Layout } from '@layout/layout'

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'callback',
    component: CallbackPage
  },
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomePage
      }
    ]
  }
]
