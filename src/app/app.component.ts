import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'zoom-video';

  constructor() {}

  prefersDark() {
    return !!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  changeTheme() {
    if (document.documentElement.classList.contains('theme-dark')) {
      document.documentElement.classList.remove('theme-dark')
    } else {
      document.documentElement.classList.add('theme-dark')
    }
  }
}
