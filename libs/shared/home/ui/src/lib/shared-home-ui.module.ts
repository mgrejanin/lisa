import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedUiDayOfferModule } from '@lisa/shared/ui/day-offer';
import { SharedUiMarketGridModule } from '@lisa/shared/ui/market-grid';
import { SharedUiSearchModule } from '@lisa/shared/ui/search';
import { SharedUiThumbnailCarrousselModule } from '@lisa/shared/ui/thumbnail-carroussel';
import { SharedUiToolbarModule } from '@lisa/shared/ui/toolbar';
import { SharedHomeUiComponent } from './shared-home-ui.component';

@NgModule({
  declarations: [SharedHomeUiComponent],
  imports: [
    CommonModule,
    SharedUiToolbarModule,
    SharedUiThumbnailCarrousselModule,
    SharedUiMarketGridModule,
    SharedUiSearchModule,
    SharedUiDayOfferModule
  ],
  exports: [SharedHomeUiComponent]
})
export class SharedHomeUiModule {}
