import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { Location } from '@angular/common'
import { Router, NavigationEnd } from '@angular/router'
import { filter } from 'rxjs'
import { Icon } from '../icons/icons.component'

@Component({
  selector: 'navigation-buttons',
  imports: [Icon],
  templateUrl: './navigation-buttons.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationButtons {
  private location = inject(Location)
  private router = inject(Router)

  canGoBack = signal(false)
  canGoForward = signal(false)

  constructor() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.updateNavigationState()
    })
  }

  goBack() {
    this.location.back()
  }

  goForward() {
    this.location.forward()
  }

  private updateNavigationState() {
    this.canGoBack.set(window.history.length > 1)
    this.canGoForward.set(false)
  }
}
