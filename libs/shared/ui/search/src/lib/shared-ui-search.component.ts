import { Component } from "@angular/core";
import { FormControl } from '@angular/forms';
import { MarketType } from '@lisa/shared/ui/thumbnail-carroussel';
@Component({
  selector: 'lisa-shared-ui-search-component',
  templateUrl: './shared-ui-search.component.html',
  styleUrls:['./shared-ui-search.component.scss']
})
export class SharedUiSearchComponent{
  searchCtrl = new FormControl();

  markets: MarketType[] = [
    {
      name: 'Walmart',
      imgUrl:
        'https://ecommercenews.com.br/wp-content/uploads/2017/10/walmart.jpg'
    },
    {
      name: 'Pão de açucar',
      imgUrl:
        'https://upload.wikimedia.org/wikipedia/pt/d/dd/Logomarca_do_P%C3%A3o_de_A%C3%A7%C3%BAcar_%28supermercado%29.png'
    },
    {
      name: 'Nagumo',
      imgUrl:
        'data:image/jpeg;base64,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'
    },
    {
      name: 'Extra',
      imgUrl:
        'https://pbs.twimg.com/profile_images/864095415075037184/63dCY4DK_400x400.jpg'
    },
    {
      name: 'Carrefour',
      imgUrl:
        'https://www.carrefour.com.br/_ui/responsive/theme-carrefour/images/logo_carrefourgif.gif'
    },
    {
      name: "Sam's Club",
      imgUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Sams_Club.svg/1200px-Sams_Club.svg.png'
    }
  ];
}
