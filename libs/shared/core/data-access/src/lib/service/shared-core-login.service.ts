import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class SharedCoreLoginService {
  constructor(private afAuth: AngularFireAuth) {}

  async facebookLogin(): Promise<firebase.auth.UserCredential> {
    try {
      return await this.afAuth.auth.signInWithPopup(
        new firebase.auth.FacebookAuthProvider()
      );
    } catch (error) {
      throw error;
    }
  }

  async googleLogin(): Promise<firebase.auth.UserCredential> {
    try {
      const loginProvider = new firebase.auth.GoogleAuthProvider();
      loginProvider.addScope('https://www.googleapis.com/auth/cloud-platform');
      loginProvider.addScope('https://www.googleapis.com/auth/dialogflow');
      return await this.afAuth.auth.signInWithPopup(loginProvider);
    } catch (error) {
      throw error;
    }
  }
}
