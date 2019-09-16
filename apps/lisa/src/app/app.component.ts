import { Component } from '@angular/core';

@Component({
  selector: 'lisa-root',
  template: `
    <ngx-ui-loader></ngx-ui-loader><router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'lisa';
}
