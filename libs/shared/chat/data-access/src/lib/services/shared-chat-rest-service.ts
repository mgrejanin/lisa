import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { of, from } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

export interface ChatRequestModel {
  queryInput: {
    text: {
      text: string;
      languageCode: string;
    };
  };
}

@Injectable()
export class ChatRestService {
  private baseUrl =
    'https://dialogflow.googleapis.com/v2/projects/mimo-5c2a6/agent/sessions/';
  private session: auth.UserCredential;
  private query: ChatRequestModel = {
    queryInput: {
      text: {
        text: '',
        languageCode: 'pt-br'
      }
    }
  } as ChatRequestModel;
  constructor(private http: HttpClient, private afAuth: AngularFireAuth) {}

  getHeaders() {
    return of(
      // switchMap(() => from(this.session.user.getIdToken())),
      // tap(() =>
      new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.session.credential['accessToken']}`
        // )
      )
    );
  }

  textRequest(text: string) {
    return this.verifySession()
      .pipe(
        switchMap(() => this.getHeaders()),
        // tap(res => {
        //   debugger;
        // }),
        tap(headers => {
          this.query.queryInput.text.text = text;
          this.http
            .post(
              this.baseUrl.concat(
                `${this.session.credential['idToken']}:detectIntent`
              ),
              this.query,
              { headers }
            )
            .subscribe();
        })
      )
      .subscribe();

    // console.log(this.session.credential.);/;
  }
  verifySession() {
    return from(
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
    ).pipe(tap(res => (this.session = res)));
    // if (!this.session) {
    //   this.afAuth.auth
    //     .signInWithPopup(new auth.GoogleAuthProvider())
    //     .then(res => {
    //       this.session = res;
    //     });
    //   return;
    // }
  }
}
