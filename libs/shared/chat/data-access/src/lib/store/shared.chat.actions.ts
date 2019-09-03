export class ChatTextRequest {
  static readonly type = '[Chat] Chat text request';
  constructor(public payload: string) {}
}
