import { AngularFireAuth } from '@angular/fire/auth';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { auth, User } from 'firebase/app';
import { from, of } from 'rxjs';
import {
  SetUserInfo,
  SharedCoreLoginAction
} from './shared-core-login.actions';
import { tap } from 'rxjs/operators';

export interface LoginStateModel {
  data: User;
  credential: auth.UserCredential;
  loading: boolean;
}
const defaults: LoginStateModel = {
  data: {} as User,
  credential: {} as auth.UserCredential,
  loading: false
};

@State<LoginStateModel>({
  name: 'login',
  defaults
})
export class LoginState {
  constructor(private afAuth: AngularFireAuth, private store: Store) {
    // auth().onAuthStateChanged(user => {
    //   if (user) {
    //     this.store.dispatch(new SetUserInfo(user));
    //   } else {
    //     localStorage.setItem('user', null);
    //   }
    // });
  }

  @Selector()
  static loginData$(state: LoginStateModel) {
    return state.data;
  }

  @Selector()
  static credential$(state: LoginStateModel) {
    return state.credential.credential;
  }

  verifySession() {
    const user = JSON.parse(localStorage.getItem('user'));
    return of(user !== null);
  }

  @Action(SetUserInfo)
  setUserInfo(
    { setState }: StateContext<LoginStateModel>,
    { payload }: SetUserInfo
  ) {
    setState(patch<LoginStateModel>({ credential: payload }));
    localStorage.setItem('user', JSON.stringify(payload));
    return true;
  }

  @Action(SharedCoreLoginAction)
  sharedCoreLoginService({
    getState,
    setState,
    dispatch
  }: StateContext<LoginStateModel>) {
    setState(patch<Partial<LoginStateModel>>({ loading: true }));
    if (
      Object.entries(getState().credential).length !== 0 &&
      getState().credential.constructor === Object
    ) {
      return from(getState().data.getIdToken());
    }

    // const user = JSON.parse(localStorage.getItem('user'));
    // debugger;
    // if (user !== null) {
    //   return dispatch(new SetUserInfo(user));
    // }

    let provider = new auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/dialogflow');
    return from(this.afAuth.auth.signInWithPopup(provider)).pipe(
      tap(res => {
        dispatch(new SetUserInfo(res));
      })
    );
  }
}
