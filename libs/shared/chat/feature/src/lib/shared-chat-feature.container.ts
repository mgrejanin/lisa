import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {
  ChatModel,
  ChatState,
  ChatType
} from 'libs/shared/chat/data-access/src/lib/store/shared-chat.state';
import { AddChat } from 'libs/shared/chat/data-access/src/lib/store/shared.chat.actions';
import { from, Observable, of } from 'rxjs';
import { concat, tap, take, distinctUntilChanged } from 'rxjs/operators';
import Speech from 'speak-tts';

@Component({
  selector: 'lisa-shared-chat-container',
  template:
    '<lisa-shared-chat-ui-component [chats]="chats$ | async" (sendMessageAction)="sendMessage($event)"></lisa-shared-chat-ui-component>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SharedChatFeatureContainer implements OnInit {
  @Select(ChatState.chats$) chats$: Observable<ChatModel>;
  speech = new Speech();
  constructor(private store: Store) {
    if (this.speech.hasBrowserSupport()) {
      console.log('Browser has support');
    }
  }

  ngOnInit() {
    const initialMessage = 'Olá, em que posso ajudar?';
    concat();
    from(this.speech.init({ lang: 'pt-BR' }))
      .pipe(
        take(1),
        tap(() => {
          this.speakMessage();
        }),
        tap(() => {
          this.store
            .dispatch(
              new AddChat({ message: initialMessage, type: ChatType.BOT })
            )
            .pipe(
              tap(() => {
                this.speakMessage();
              })
            )
            .subscribe();
        })
      )
      .subscribe();
  }

  speakMessage() {
    of(this.store.selectSnapshot(ChatState.chats$))
      .pipe(
        distinctUntilChanged(),
        tap((res: Array<ChatModel>) => {
          if (!res.length) {
            return;
          }
          const chat: ChatModel = res[res.length - 1];
          if (chat.type === ChatType.USER) {
            return;
          }
          this.speech.speak({
            text: chat.message,
            queue: true
          });
        })
      )
      .subscribe();
  }

  sendMessage(message: string) {
    this.store
      .dispatch(new AddChat({ message: message, type: ChatType.USER }))
      .pipe(tap(() => this.speakMessage()))
      .subscribe();
  }
}
