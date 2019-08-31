import { Component } from '@angular/core';
import { MarketType } from '@lisa/shared/ui/thumbnail-carroussel';

@Component({
  selector: 'lisa-shared-home-container',
  template:
    '<lisa-shared-home-ui-component [toolbarTitle]="title" (nearbyMarketClick)="nearbyMarketClick($event)"></lisa-shared-home-ui-component>'
})
export class SharedHomeFeatureContainer {
  title = 'Lisa';

  nearbyMarketClick(market: MarketType) {
    console.log({ market });
  }
}
