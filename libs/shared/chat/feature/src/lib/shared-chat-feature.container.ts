import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { ChatTextRequest } from 'libs/shared/chat/data-access/src/lib/store/shared.chat.actions';
import { ChatState, ChatModel } from 'libs/shared/chat/data-access/src/lib/store/shared-chat.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'lisa-shared-chat-container',
  template: '<lisa-shared-chat-ui-component [chats]="chats$ | async"></lisa-shared-chat-ui-component>'
})
export class SharedChatFeatureContainer implements OnInit {
  @Select(ChatState.chats$) chats$: Observable<ChatModel>;

  constructor(private store: Store) {}
  ngOnInit() {
    this.store.dispatch(new ChatTextRequest('fruta')).subscribe();
  }
}
