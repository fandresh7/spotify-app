// aqui van todos los íconos

import { ChangeDetectionStrategy, Component, input } from '@angular/core'

@Component({
  selector: 'icon',
  template: `
    @switch (name()) {
      @case ('chevron-left') {
        <svg
          [attr.width]="size()"
          [attr.height]="size()"
          viewBox="0 0 16 16"
          fill="currentColor">
          <path d="M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8 9.97.47a.75.75 0 0 1 1.06 0z" />
        </svg>
      }
      @case ('chevron-right') {
        <svg
          [attr.width]="size()"
          [attr.height]="size()"
          viewBox="0 0 16 16"
          fill="currentColor">
          <path d="M4.97.47a.75.75 0 0 0 0 1.06L11.44 8l-6.47 6.47a.75.75 0 1 0 1.06 1.06L13.56 8 6.03.47a.75.75 0 0 0-1.06 0z" />
        </svg>
      }
      @case ('chevron-down') {
        <svg
          [attr.width]="size()"
          [attr.height]="size()"
          viewBox="0 0 16 16"
          fill="currentColor">
          <path d="M4.47 6.22a.75.75 0 0 1 1.06 0L8 8.69l2.47-2.47a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 0 1 0-1.06z" />
        </svg>
      }
      @case ('search') {
        <svg
          [attr.width]="size()"
          [attr.height]="size()"
          viewBox="0 0 16 16"
          fill="currentColor">
          <path d="M7 1.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5zM.25 7a6.75 6.75 0 1 1 12.096 4.12l3.184 3.185a.75.75 0 1 1-1.06 1.06L11.304 12.18A6.75 6.75 0 0 1 .25 7z" />
        </svg>
      }
      @case ('x') {
        <svg
          [attr.width]="size()"
          [attr.height]="size()"
          viewBox="0 0 16 16"
          fill="currentColor">
          <path d="M2.47 2.47a.75.75 0 0 1 1.06 0L8 6.94l4.47-4.47a.75.75 0 1 1 1.06 1.06L9.06 8l4.47 4.47a.75.75 0 1 1-1.06 1.06L8 9.06l-4.47 4.47a.75.75 0 0 1-1.06-1.06L6.94 8 2.47 3.53a.75.75 0 0 1 0-1.06z" />
        </svg>
      }
      @case ('bell') {
        <svg
          [attr.width]="size()"
          [attr.height]="size()"
          viewBox="0 0 16 16"
          fill="currentColor">
          <path d="M8 1.5A4.505 4.505 0 0 0 3.5 6v4.5H2.75a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5H12.5V6A4.505 4.505 0 0 0 8 1.5zm-3 4.5a3 3 0 1 1 6 0v4.5h-6V6zm2.938 6.5h2.124a1.75 1.75 0 0 1-3.5 0h1.376z" />
        </svg>
      }
      @case ('user') {
        <svg
          [attr.width]="size()"
          [attr.height]="size()"
          viewBox="0 0 16 16"
          fill="currentColor">
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 1.5a6.5 6.5 0 0 0-6.5 6.5.75.75 0 0 0 1.5 0 5 5 0 0 1 10 0 .75.75 0 0 0 1.5 0A6.5 6.5 0 0 0 8 9.5z" />
        </svg>
      }
      @case ('profile') {
        <svg
          [attr.width]="size()"
          [attr.height]="size()"
          viewBox="0 0 16 16"
          fill="currentColor">
          <path d="M13.985 8.625h-8.5a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5z" />
          <path d="M11.5 1.75a.75.75 0 0 1 .75.75v11a.75.75 0 0 1-1.5 0v-11a.75.75 0 0 1 .75-.75z" />
        </svg>
      }
      @case ('premium') {
        <svg
          [attr.width]="size()"
          [attr.height]="size()"
          viewBox="0 0 16 16"
          fill="currentColor">
          <path d="M11.078 0a.75.75 0 0 1 .672.415l3.5 7a.75.75 0 0 1-.672 1.085h-1.594l.967 5.316a.75.75 0 0 1-1.316.657l-7.5-9a.75.75 0 0 1 .566-1.223h2.103L6.238.418A.75.75 0 0 1 6.914 0h4.164z" />
        </svg>
      }
      @case ('logout') {
        <svg
          [attr.width]="size()"
          [attr.height]="size()"
          viewBox="0 0 16 16"
          fill="currentColor">
          <path
            d="M2.75 2a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5H2.75zm0 10.5a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5H2.75zm5.47-4.72a.75.75 0 0 0 0 1.06l1.72 1.72H2.75a.75.75 0 0 0 0 1.5h7.19l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 0 0-1.06 0z" />
        </svg>
      }
      @case ('home') {
        <svg
          [attr.width]="size()"
          [attr.height]="size()"
          viewBox="0 0 16 16"
          fill="currentColor">
          <path
            d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
        </svg>
      }
      @case ('library') {
        <svg
          [attr.width]="size()"
          [attr.height]="size()"
          viewBox="0 0 16 16"
          fill="currentColor">
          <path
            d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13z" />
        </svg>
      }
      @case ('play') {
        <svg
          [attr.width]="size()"
          [attr.height]="size()"
          viewBox="0 0 16 16"
          fill="currentColor">
          <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z" />
        </svg>
      }
      @case ('pause') {
        <svg
          [attr.width]="size()"
          [attr.height]="size()"
          viewBox="0 0 16 16"
          fill="currentColor">
          <path d="M5.5 3.5A1.5 1.5 0 0 1 7 2h1.5v12H7a1.5 1.5 0 0 1-1.5-1.5v-9zm5 0A1.5 1.5 0 0 1 12 2h1.5v12H12a1.5 1.5 0 0 1-1.5-1.5v-9z" />
        </svg>
      }
      @case ('heart') {
        <svg
          [attr.width]="size()"
          [attr.height]="size()"
          viewBox="0 0 16 16"
          fill="currentColor">
          <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
        </svg>
      }
      @case ('heart-outline') {
        <svg
          [attr.width]="size()"
          [attr.height]="size()"
          viewBox="0 0 16 16"
          fill="currentColor">
          <path
            d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
        </svg>
      }
      @case ('plus') {
        <svg
          [attr.width]="size()"
          [attr.height]="size()"
          viewBox="0 0 16 16"
          fill="currentColor">
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>
      }
      @case ('volume') {
        <svg
          [attr.width]="size()"
          [attr.height]="size()"
          viewBox="0 0 16 16"
          fill="currentColor">
          <path
            d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707zm-1.414-1.414A6.478 6.478 0 0 0 12.025 8a6.478 6.478 0 0 0-1.903-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.889l.707.707zM10.717 8a4.486 4.486 0 0 0-1.312-3.182l-.707.707A3.49 3.49 0 0 1 9.717 8a3.49 3.49 0 0 1-1.02 2.475l.707.707A4.486 4.486 0 0 0 10.717 8zM6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5H4.5A1.5 1.5 0 0 1 3 11.5v-7A1.5 1.5 0 0 1 4.5 3H6z" />
        </svg>
      }
      @case ('volume-mute') {
        <svg
          [attr.width]="size()"
          [attr.height]="size()"
          viewBox="0 0 16 16"
          fill="currentColor">
          <path
            d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zM6 5.04 4.312 6.39A.5.5 0 0 1 4 6.5H2v3h2a.5.5 0 0 1 .312.11L6 10.96V5.04zm7.854.606a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z" />
        </svg>
      }
      @case ('shuffle') {
        <svg
          [attr.width]="size()"
          [attr.height]="size()"
          viewBox="0 0 16 16"
          fill="currentColor">
          <path
            d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z" />
          <path
            d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z" />
        </svg>
      }
      @case ('repeat') {
        <svg
          [attr.width]="size()"
          [attr.height]="size()"
          viewBox="0 0 16 16"
          fill="currentColor">
          <path
            d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192Zm3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z" />
        </svg>
      }
      @case ('skip-back') {
        <svg
          [attr.width]="size()"
          [attr.height]="size()"
          viewBox="0 0 16 16"
          fill="currentColor">
          <path
            d="M.5 3.5A.5.5 0 0 1 1 4v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v2.94l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L8.5 8.752v2.94c0 .653-.713.998-1.233.696L1 8.752V12a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm7 1.133L1.696 8 7.5 11.367V4.633zm7.5 0L9.196 8 15 11.367V4.633z" />
        </svg>
      }
      @case ('skip-forward') {
        <svg
          [attr.width]="size()"
          [attr.height]="size()"
          viewBox="0 0 16 16"
          fill="currentColor">
          <path
            d="M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V8.752l-6.267 3.636c-.52.302-1.233-.043-1.233-.696v-2.94l-6.267 3.636C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696L7.5 7.248v-2.94c0-.653.713-.998 1.233-.696L15 7.248V4a.5.5 0 0 1 .5-.5zM1 4.633v6.734L6.804 8 1 4.633zm7.5 0v6.734L14.304 8 8.5 4.633z" />
        </svg>
      }
      @case ('spotify') {
        <svg
          [attr.width]="size()"
          [attr.height]="size()"
          viewBox="0 0 16 16"
          fill="currentColor">
          <path
            d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.669 11.538a.498.498 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686zm.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858zm.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288z" />
        </svg>
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Icon {
  name = input.required<
    | 'chevron-left'
    | 'chevron-right'
    | 'chevron-down'
    | 'search'
    | 'x'
    | 'bell'
    | 'user'
    | 'profile'
    | 'premium'
    | 'logout'
    | 'home'
    | 'library'
    | 'play'
    | 'pause'
    | 'heart'
    | 'heart-outline'
    | 'plus'
    | 'volume'
    | 'volume-mute'
    | 'shuffle'
    | 'repeat'
    | 'skip-back'
    | 'skip-forward'
    | 'spotify'
  >()
  size = input<number>(16)
}
