import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiAiClient } from 'api-ai-javascript';

@Injectable()
export class ChatRestService {
  private baseUrl = '';
  private token = '076f9817cd1b404db747d4ba1bc4871c';
  private client = new ApiAiClient({ accessToken: this.token });
  constructor(private http: HttpClient) {}

  getResponse(query: string) {
    const data = {
      query,
      lang: 'pt',
      sessionId: ''
    };
    return this.http.post(`${this.baseUrl}`, data, {
      headers: this.getHeaders()
    });
  }

  getHeaders() {
    return new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }

  textRequest(text: string) {
    this.client.textRequest(text).then(res => {
      debugger;
    });
  }
}
