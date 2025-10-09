import { HttpClient } from '@angular/common/http'
import { Component, inject, signal } from '@angular/core'
import { RouterOutlet } from '@angular/router'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('spotify-app')

  http = inject(HttpClient)

  constructor() {
    this.http.get('/api/session/authorize').subscribe(console.log)
  }
}
