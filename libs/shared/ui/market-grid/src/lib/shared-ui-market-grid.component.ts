import { Component, Input } from '@angular/core';
import { MarketType } from '@lisa/shared/ui/thumbnail-carroussel';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'lisa-shared-ui-market-grid-component',
  templateUrl: './shared-ui-market-grid.component.html',
  styleUrls: ['./shared-ui-market-grid.component.scss']
})
export class SharedUiMarketGridComponent {
  @Input() markets: MarketType[];

  constructor(private store: Store) {}

  navigateTo() {
    this.store.dispatch(new Navigate(['/chat']));
  }
}
