import { SharedCoreLoginAction } from '@lisa/shared/core/data-access';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { patch, insertItem } from '@ngxs/store/operators';
import { switchMap, tap, pluck } from 'rxjs/operators';
import { ChatRestService } from '../services/shared-chat-rest-service';
import { ChatTextRequest } from './shared.chat.actions';
export enum ChatTypeEnum {
  BOT = 'BOT',
  USER = 'USER'
}
export interface ChatModel {
  chatMessage?: string;
  chatAction?: string;
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
  constructor(private store: Store, private service: ChatRestService) {}

  @Action(ChatTextRequest)
  chatTextRequest(
    { setState }: StateContext<ChatStateModel>,
    { payload }: ChatTextRequest
  ) {
    setState(patch<Partial<ChatStateModel>>({ loading: true }));
    return this.store.dispatch(new SharedCoreLoginAction()).pipe(
      switchMap(res => this.service.textRequest(payload)),
      pluck('queryResult', 'fulfillmentMessages'),
      tap(res => {
        if (res[0].text) {
          setState(patch<Partial<ChatModel>>({ data: insertItem(ite) }));
        }
      })
    );
  }
}
