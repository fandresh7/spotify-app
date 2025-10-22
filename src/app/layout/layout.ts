import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { Header } from './header/header'

@Component({
  selector: 'layout',
  imports: [RouterOutlet, Header],
  templateUrl: './layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Layout {}
