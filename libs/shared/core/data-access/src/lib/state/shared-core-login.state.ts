import { Action, Selector, State, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { auth, User } from 'firebase/app';
import { from, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SharedCoreLoginService } from '../service/shared-core-login.service';
import { Login, SetUserInfo } from './shared-core-login.actions';

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
  constructor(private service: SharedCoreLoginService) {
    // auth().onAuthStateChanged(user => {
    //   if (user) {
    //     this.store.dispatch(new SetUserInfo(user));
    //   } else {
    //     localStorage.setItem('user', null);
    //   }
    // });
  }

  // @Selector()
  // static loginData$(state: LoginStateModel) {
  //   return state.data;
  // }

  @Selector()
  static credential$(state: LoginStateModel) {
    return state.credential;
  }

  @Action(Login)
  login({ setState }: StateContext<LoginStateModel>) {
    const saveUserCredential = JSON.parse(localStorage.getItem('credential'));
    if (saveUserCredential !== null) {
      return of(setState(patch({ credential: saveUserCredential })));
    }
    return from(this.service.googleLogin()).pipe(
      tap(credential => {
        setState(patch({ credential }));
        localStorage.setItem('credential', JSON.stringify(credential));
      })
    );
  }

  // @Action(SharedCoreLoginAction)
  // sharedCoreLoginService({
  //   getState,
  //   setState,
  //   dispatch
  // }: StateContext<LoginStateModel>) {
  //   setState(patch<Partial<LoginStateModel>>({ loading: true }));
  //   if (
  //     Object.entries(getState().credential).length !== 0 &&
  //     getState().credential.constructor === Object
  //   ) {
  //     return from(getState().data.getIdToken());
  //   }

  //   // const user = JSON.parse(localStorage.getItem('user'));
  //   // debugger;
  //   // if (user !== null) {
  //   //   return dispatch(new SetUserInfo(user));
  //   // }

  //   let provider = new auth.GoogleAuthProvider();
  //   provider.addScope('https://www.googleapis.com/auth/dialogflow');
  //   return from(this.afAuth.auth.signInWithPopup(provider)).pipe(
  //     tap(res => {
  //       dispatch(new SetUserInfo(res));
  //     })
  //   );
  // }
}
