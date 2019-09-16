import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { SetChatReceita } from 'libs/shared/chat/data-access/src/lib/store/shared.chat.actions';

@Component({
  selector: 'lisa-shared-toolbar-container',
  template:
    '<lisa-shared-ui-toolbar-component (setTitleAction)="setTitle($event)" [title]="title" (navigateToAction)="navigateTo($event)" [actualRoute]="actualRoute"></lisa-shared-ui-toolbar-component>'
})
export class SharedToolbarFeatureContainer {
  title = 'Lisa';
  actualRoute: string;

  constructor(private store: Store, private route: Router) {
    this.route.events.subscribe(res => {
      if (res instanceof NavigationEnd) {
        this.actualRoute = res.url;
      }
    });
  }

  navigateTo(route: string) {
    this.store.dispatch([
      new Navigate([route]),
      route === '/chat' ? new SetChatReceita() : null
    ]);
  }

  setTitle(title: string) {
    this.title = title;
  }
}
