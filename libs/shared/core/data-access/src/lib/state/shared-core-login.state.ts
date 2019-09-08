import { AngularFireAuth } from '@angular/fire/auth';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { auth } from 'firebase/app';
import { from } from 'rxjs';
import { tap, switchMap, isEmpty } from 'rxjs/operators';
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

  retrieveSession(){
    
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
