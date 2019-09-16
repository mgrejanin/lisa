import { auth } from 'firebase/app';

// export class SharedCoreLoginAction {
//   static readonly type = '[SharedCoreLogin] Core login';
// }

export class SetUserInfo {
  static readonly type = '[SharedCoreLogin] Set User Info';
  constructor(public payload: auth.UserCredential) {}
}

export class Login{
  static readonly type = '[SharedCoreLogin] login';
}
