import { Component, Input, EventEmitter, Output } from '@angular/core';
import { MarketType } from '@lisa/shared/ui/thumbnail-carroussel';

@Component({
  selector: 'lisa-shared-home-ui-component',
  templateUrl: './shared-home-ui.component.html',
  styleUrls: ['./shared-home-ui.component.scss']
})
export class SharedHomeUiComponent {
  @Input() toolbarTitle: string;

  @Output() nearbyMarketClick = new EventEmitter<MarketType>();

  markets: MarketType[] = [
    {
      name: 'Walmart',
      imgUrl:
        'assets/imgs/walmart.jpg'
    },
    {
      name: 'Nagumo',
      imgUrl:
        'assets/imgs/nagumo.png'
    },
    {
      name: 'Extra',
      imgUrl:
        'assets/imgs/extra.jpg'
    },
    {
      name: 'Droga raia',
      imgUrl:
        'assets/imgs/droga_raia.png'
    },
    {
      name: "Sam's Club",
      imgUrl:
        'assets/imgs/sams_club.png'
    }
  ];
}
