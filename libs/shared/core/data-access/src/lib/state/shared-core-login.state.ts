import { AngularFireAuth } from '@angular/fire/auth';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { auth } from 'firebase/app';
import { from, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RetrieveSession, SharedCoreLoginAction } from './shared-core-login.actions';

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

  @Action(RetrieveSession)
  retrieveSession({ dispatch, setState }: StateContext<LoginStateModel>) {
    const loginData = JSON.parse(window.localStorage.getItem('loginData'));
    if (loginData != null) {
      return dispatch(setState(patch<Partial<LoginStateModel>>({ data: loginData })));
    }

    return of(false);
  }

  @Action(SharedCoreLoginAction)
  sharedCoreLoginService({
    getState,
    setState
  }: StateContext<LoginStateModel>) {
    setState(patch<Partial<LoginStateModel>>({ loading: true }));
    if (
      Object.entries(getState().data).length !== 0 &&
      getState().data.constructor === Object
    ) {
      return from(getState().data.user.getIdToken());
    }
    let provider = new auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/dialogflow');
    return from(this.afAuth.auth.signInWithPopup(provider)).pipe(
      tap(res => setState(patch<LoginStateModel>({ data: res, loading: true })))
    );
  }
}
