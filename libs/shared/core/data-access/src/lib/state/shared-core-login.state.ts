import { AngularFireAuth } from '@angular/fire/auth';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { auth } from 'firebase/app';
import { from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SharedCoreLoginAction } from './shared-core-login.actions';

export interface LoginStateModel {
  data: auth.UserCredential;
  loading: boolean;
}
const defaults: LoginStateModel = {
  data: {} as auth.UserCredential,
  loading: false
};

@State<LoginStateModel>({
  name: 'login',
  defaults
})
export class LoginState {
  constructor(private afAuth: AngularFireAuth) {}

  @Selector()
  static loginData$(state: LoginStateModel) {
    return state.data;
  }

  @Action(SharedCoreLoginAction)
  sharedCoreLoginService({ setState }: StateContext<LoginStateModel>) {
    setState(patch<Partial<LoginStateModel>>({ loading: true }));
    let provider = new auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/dialogflow');
    return from(this.afAuth.auth.signInWithPopup(provider)).pipe(
      tap(res => setState(patch<LoginStateModel>({ data: res, loading: true })))
    );
  }
}
