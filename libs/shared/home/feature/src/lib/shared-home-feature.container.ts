import { Component } from '@angular/core';

@Component({
  selector: 'lisa-shared-home-container',
  template: '<lisa-shared-home-ui [toolbarTitle]="title"></lisa-shared-home-ui>'
})
export class SharedHomeFeatureContainer {
  title = 'Lisa';
}
