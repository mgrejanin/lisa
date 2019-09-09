import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {
  ChatModel,
  ChatState,
  ChatType
} from 'libs/shared/chat/data-access/src/lib/store/shared-chat.state';
import { AddChat, ChatTextRequest } from 'libs/shared/chat/data-access/src/lib/store/shared.chat.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'lisa-shared-chat-container',
  template:
    '<lisa-shared-chat-ui-component [chats]="chats$ | async" (sendMessageAction)="sendMessage($event)"></lisa-shared-chat-ui-component>'
})
export class SharedChatFeatureContainer implements OnInit {
  @Select(ChatState.chats$) chats$: Observable<ChatModel>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(
      new AddChat({ message: 'Olá, em que posso ajudar?', type: ChatType.BOT })
      // new ChatTextRequest('vinho')
    );
  }

  sendMessage(message:string){
    this.store.dispatch(
      new AddChat({ message: message, type: ChatType.USER })
    );
  }
}
