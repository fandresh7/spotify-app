import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'header',
  imports: [],
  templateUrl: './header.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header {}
