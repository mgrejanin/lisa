import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { SharedCoreLoginAction } from '@lisa/shared/core/data-access';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'lisa-shared-profile-container',
  template:
    '<lisa-shared-profile-ui-component (doLoginAction)="doLogin()"></lisa-shared-profile-ui-component>'
})
export class SharedProfileContainer {
  constructor(private store: Store) {}

  doLogin() {
    return this.store
      .dispatch(new SharedCoreLoginAction())
      .pipe(switchMap(() => this.store.dispatch(new Navigate([''])))).subscribe();
  }
}
