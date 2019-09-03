import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedUiToolbarModule } from '@lisa/shared/ui/toolbar';
import { SharedHomeUiComponent } from './shared-home-ui.component';
import { SharedUiThumbnailCarrousselModule } from '@lisa/shared/ui/thumbnail-carroussel';
import { SharedUiMarketGridModule } from '@lisa/shared/ui/market-grid';
import { SharedUiSearchModule } from '@lisa/shared/ui/search';
@NgModule({
  declarations: [SharedHomeUiComponent],
  imports: [
    CommonModule,
    SharedUiToolbarModule,
    SharedUiThumbnailCarrousselModule,
    SharedUiMarketGridModule,
    SharedUiSearchModule
  ],
  exports: [SharedHomeUiComponent]
})
export class SharedHomeUiModule {}
