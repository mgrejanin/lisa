import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'lisa-shared-toolbar-container',
  template:
    '<lisa-shared-ui-toolbar-component (navigateToAction)="navigateTo($event)"></lisa-shared-ui-toolbar-component>'
})
export class SharedToolbarFeatureContainer {
  title = 'Lisa';

  constructor(private store: Store) {}

  navigateTo(route: string) {
    this.store.dispatch(new Navigate([route]));
  }
}
