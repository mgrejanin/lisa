import { Login } from '@lisa/shared/core/data-access';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { append, patch } from '@ngxs/store/operators';
import { of } from 'rxjs';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { ChatRestService } from '../services/shared-chat-rest-service';
import {
  AddChat,
  ChatTextRequest,
  CleanChat,
  InitChat,
  SetChatReceita
} from './shared.chat.actions';
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
  isReceita: boolean;
}
const defaults: ChatStateModel = {
  data: [],
  loading: false,
  isReceita: false
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

  @Action(InitChat)
  InitChat({ getState, dispatch }: StateContext<ChatStateModel>) {
    const message = getState().isReceita
      ? 'Olá, quais ingredientes você tem por aí?'
      : 'Olá, em que posso ajudar?';
    return dispatch(new AddChat({ message, type: ChatType.BOT }));
  }

  @Action(AddChat)
  AddChat(
    { setState, dispatch }: StateContext<ChatStateModel>,
    { payload }: AddChat
  ) {
    setState(
      patch<ChatStateModel>({
        data: append([
          { message: payload.message, type: payload.type, date: new Date() }
        ])
      })
    );

    if (payload.type === ChatType.USER) {
      return dispatch(new ChatTextRequest(payload.message));
    }
  }

  @Action(ChatTextRequest)
  chatTextRequest(
    { setState, getState }: StateContext<ChatStateModel>,
    { payload }: ChatTextRequest
  ) {
    setState(patch<Partial<ChatStateModel>>({ loading: true }));
    return this.store.dispatch(new Login()).pipe(
      switchMap(res => this.service.textRequest( getState().isReceita ? 'receita' : payload)),
      tap(res => {
        if (res[0].speech) {
          setState(
            patch<ChatStateModel>({
              data: append([
                {
                  message: res[0].speech,
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
                message: res[0].payload.message,
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

  @Action(CleanChat)
  cleanChat({ setState }: StateContext<ChatStateModel>) {
    return of(setState(patch<ChatStateModel>({ data: [], isReceita: false })));
  }

  @Action(SetChatReceita)
  setChatReceita({ setState }: StateContext<ChatStateModel>) {
    return of(setState(patch<ChatStateModel>({ isReceita: true })));
  }
}
