import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginState } from '@lisa/shared/core/data-access';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import { switchMap, tap, pluck } from 'rxjs/operators';

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
    'https://dialogflow.googleapis.com/v2/projects/lisa-b88ed/agent/sessions/';
  private query: ChatRequestModel = {
    queryInput: {
      text: {
        text: '',
        languageCode: 'pt-br'
      }
    }
  } as ChatRequestModel;
  constructor(private http: HttpClient, private store: Store) {}

  async getHeaders() {
    return new HttpHeaders().set(
      'Authorization',
      `Bearer ${
        this.store.selectSnapshot(LoginState.credential$)['accessToken']
      }`
    );
  }

  async textRequest(text: string) {
    this.query.queryInput.text.text = text;
    const headers = await this.getHeaders();
    return this.http
      .post(
        this.baseUrl.concat(
          `${await this.store.selectSnapshot(LoginState.credential$)[
            'idToken'
          ]}:detectIntent`
        ),
        this.query,
        { headers }
      )
      .toPromise();
  }
}
