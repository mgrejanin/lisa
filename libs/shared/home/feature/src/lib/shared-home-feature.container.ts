import { Component } from '@angular/core';
import { MarketType } from '@lisa/shared/ui/thumbnail-carroussel';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'lisa-shared-home-container',
  template:
    '<lisa-shared-home-ui-component [toolbarTitle]="title" (nearbyMarketClick)="nearbyMarketClick($event)"></lisa-shared-home-ui-component>'
})
export class SharedHomeFeatureContainer {
  title = 'Lisa';

  constructor(private store: Store) {}

  nearbyMarketClick(market: MarketType) {
    this.store.dispatch(new Navigate(['/chat']));
  }
}
