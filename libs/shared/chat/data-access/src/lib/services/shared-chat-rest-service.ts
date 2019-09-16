import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { pluck } from 'rxjs/operators';
declare var ApiAi;

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
  private clientToken = 'ce898c74f7ff4568912dc97d342c0d28';
  readonly client = new ApiAi.ApiAiClient({ accessToken: this.clientToken });
  // private baseUrl =
  //   'https://dialogflow.googleapis.com/v2/projects/mimo-5c2a6/agent/sessions/';
  // private query: ChatRequestModel = {
  //   queryInput: {
  //     text: {
  //       text: '',
  //       languageCode: 'pt-br'
  //     }
  //   }
  // } as ChatRequestModel;

  getHeaders(credential) {
    return new HttpHeaders().set(
      'Authorization',
      `Bearer ${credential['oauthAccessToken'] || credential['accessToken']}`
    );
  }

  textRequest(text: string) {
    return from(this.client.textRequest(text)).pipe(
      pluck('result', 'fulfillment', 'messages')
    );
  }
}
