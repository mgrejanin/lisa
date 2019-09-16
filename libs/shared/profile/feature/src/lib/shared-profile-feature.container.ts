import { Component } from '@angular/core';
import { Login, LoginState } from '@lisa/shared/core/data-access';
import { Select, Store } from '@ngxs/store';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';

@Component({
  selector: 'lisa-shared-profile-container',
  template:
    '<lisa-shared-profile-ui-component (doLoginAction)="doLogin()" [credential]="credential$ | async"></lisa-shared-profile-ui-component>'
})
export class SharedProfileContainer {
  @Select(LoginState.credential$)
  credential$: Observable<auth.UserCredential>;
  constructor(private store: Store) {}

  doLogin() {
    return this.store.dispatch(new Login()).subscribe();
  }
}
