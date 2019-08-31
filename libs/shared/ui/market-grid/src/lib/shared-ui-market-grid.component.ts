import { Component, Input } from '@angular/core';
import { MarketType } from '@lisa/shared/ui/thumbnail-carroussel';

@Component({
  selector: 'lisa-shared-ui-market-grid-component',
  templateUrl: './shared-ui-market-grid.component.html',
  styleUrls: ['./shared-ui-market-grid.component.scss']
})
export class SharedUiMarketGridComponent {
  @Input() markets: MarketType[];
}
