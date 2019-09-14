import { ChatType } from './shared-chat.state';

export class ChatTextRequest {
  static readonly type = '[Chat] Chat text request';
  constructor(public payload: string) {}
}
export class AddChat {
  static readonly type = '[Chat] Add Chat';
  constructor(public payload: { message: string; type: ChatType }) {}
}

export class CleanChat{
  static readonly type = '[Chat] Clean Chat';
}