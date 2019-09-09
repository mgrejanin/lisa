import { SharedCoreLoginAction } from '@lisa/shared/core/data-access';
import { Action, State, StateContext, Store, Selector } from '@ngxs/store';
import { patch, insertItem, append } from '@ngxs/store/operators';
import { switchMap, tap, pluck, finalize } from 'rxjs/operators';
import { ChatRestService } from '../services/shared-chat-rest-service';
import { ChatTextRequest, AddChat } from './shared.chat.actions';
export enum ChatType {
  BOT = 'BOT',
  USER = 'USER'
}
export interface ChatModel {
  message?: string;
  action?: string;
  type: ChatType;
  date: Date;
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
  static chats$(state: ChatStateModel) {
    return state.data;
  }

  @Action(AddChat)
  AddChat({ setState, dispatch }: StateContext<ChatStateModel>, { payload }: AddChat) {
    setState(
      patch<ChatStateModel>({
        data: append([
          { message: payload.message, type: payload.type, date: new Date() }
        ])
      })
    );

    if(payload.type === ChatType.USER){
      return dispatch(new ChatTextRequest(payload.message));
    }
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
                  message: res[0].text.text[0],
                  type: ChatType.BOT,
                  date: new Date()
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
                action: res[0].payload.action,
                type: ChatType.BOT,
                date: new Date()
              }
            ])
          })
        );
      }),
      finalize(() => setState(patch<ChatStateModel>({ loading: false })))
    );
  }
}
