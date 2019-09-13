import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'lisa-shared-toolbar-container',
  template:
    '<lisa-shared-ui-toolbar-component (navigateToAction)="navigateTo($event)" [actualRoute]="actualRoute"></lisa-shared-ui-toolbar-component>'
})
export class SharedToolbarFeatureContainer {
  title = 'Lisa';
  actualRoute:string;

  constructor(private store: Store, private route: Router) {
    this.route.events.subscribe(res => {
      if(res instanceof NavigationEnd){
        this.actualRoute = res.url;
      }
    })
  }

  navigateTo(route: string) {
    this.store.dispatch(new Navigate([route]));
  }
}
