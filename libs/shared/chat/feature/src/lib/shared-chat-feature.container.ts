import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {
  ChatModel,
  ChatState,
  ChatType
} from 'libs/shared/chat/data-access/src/lib/store/shared-chat.state';
import {
  AddChat,
  CleanChat,
  InitChat
} from 'libs/shared/chat/data-access/src/lib/store/shared.chat.actions';
import { from, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import Speech from 'speak-tts';

@Component({
  selector: 'lisa-shared-chat-container',
  template:
    '<lisa-shared-chat-ui-component [chats]="chats$ | async" (speakMessageAction)="speakMessage($event)" (sendMessageAction)="sendMessage($event)"></lisa-shared-chat-ui-component>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SharedChatFeatureContainer implements OnInit, OnDestroy {
  @Select(ChatState.chats$) chats$: Observable<ChatModel>;
  speech = new Speech();
  constructor(private store: Store) {
    if (this.speech.hasBrowserSupport()) {
      console.log('Browser has support');
    }
  }

  ngOnDestroy() {
    this.store.dispatch(new CleanChat());
  }

  ngOnInit() {
    from(this.speech.init({ lang: 'pt-BR' }))
      .pipe(
        take(1),
        tap(() => {
          this.store
            .dispatch([this.store.dispatch(new InitChat())])
            .subscribe();
        })
      )
      .subscribe();
  }

  speakMessage(message) {
    this.speech.speak({
      text: message,
      queue: false
    });
  }

  sendMessage(message: string) {
    return this.store
      .dispatch(new AddChat({ message, type: ChatType.USER }))
      .pipe(tap(() => this.showTimedMessage()))
      .subscribe();
  }

  showTimedMessage() {
    setTimeout(() => {
      return this.store.dispatch(
        new AddChat({
          message: 'Posso te ajudar com mais alguma coisa?',
          type: ChatType.BOT
        })
      );
    }, 15000);
  }
}
