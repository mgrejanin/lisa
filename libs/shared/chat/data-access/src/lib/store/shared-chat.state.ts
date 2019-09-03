import { Action, State, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { ChatRestService } from '../services/shared-chat-rest-service';
import { ChatTextRequest } from './shared.chat.actions';
export enum ChatTypeEnum {
  BOT = 'BOT',
  USER = 'USER'
}
export interface ChatModel {
  chatMessage: string;
  chatType: ChatTypeEnum;
}
export interface ChatStateModel {
  data: ChatModel[];
  loading: boolean;
}
const defaults: ChatStateModel = {
  data: [],
  loading: false
};

@State<ChatStateModel>({
  name: 'chat',
  defaults
})
export class ChatState {
  constructor(private service: ChatRestService) {}

  @Action(ChatTextRequest)
  chatTextRequest(
    { setState }: StateContext<ChatStateModel>,
    { payload }: ChatTextRequest
  ) {
    setState(patch<Partial<ChatStateModel>>({ loading: true }));
    this.service.textRequest(payload);
  }
}
