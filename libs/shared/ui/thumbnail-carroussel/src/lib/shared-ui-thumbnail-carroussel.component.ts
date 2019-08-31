import { Component, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { MarketType } from '../symbols';

@Component({
  selector: 'lisa-shared-ui-thumbnail-carrousel-component',
  templateUrl: './shared-ui-thumbnail-carroussel.component.html',
  styleUrls: ['./shared-ui-thumbnail-carroussel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SharedUiThumbnailCarrousselComponent {
  @Input() roundedThumbnail: boolean;
  @Input() markets: MarketType[];

  @Output() nearbyMarketActionClick = new EventEmitter<MarketType>();
}
