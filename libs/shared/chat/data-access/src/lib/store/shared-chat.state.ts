import { SharedCoreLoginAction } from '@lisa/shared/core/data-access';
import { Action, State, StateContext, Store, Selector } from '@ngxs/store';
import { patch, insertItem, append } from '@ngxs/store/operators';
import { switchMap, tap, pluck } from 'rxjs/operators';
import { ChatRestService } from '../services/shared-chat-rest-service';
import { ChatTextRequest } from './shared.chat.actions';
export enum ChatType {
  BOT = 'BOT',
  USER = 'USER'
}
export interface ChatModel {
  chatMessage?: string;
  chatAction?: string;
  chatType: ChatType;
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

  @Selector()
  static chats$(state: ChatStateModel){
    return state.data;
  }

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
          setState(
            patch<ChatStateModel>({
              data: append([
                {
                  chatMessage: res[0].text.text[0],
                  chatType: ChatType.BOT
                }
              ])
            })
          );
          return;
        }
        setState(
          patch<ChatStateModel>({
            data: append([
              {
                chatAction: res[0].payload.action,
                chatType: ChatType.BOT
              }
            ])
          })
        );
      })
    );
  }
}
