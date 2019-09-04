import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ChatTextRequest } from 'libs/shared/chat/data-access/src/lib/store/shared.chat.actions';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'lisa-shared-chat-container',
  template: '<div>oi</div>'
})
export class SharedChatFeatureContainer implements OnInit {
  constructor(private store: Store) {}
  ngOnInit() {
    this.store
      .dispatch(new ChatTextRequest('vinho'))
      .pipe(
        tap(res => {
          debugger;
        })
      )
      .subscribe();
  }
}
