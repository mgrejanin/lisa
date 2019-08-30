import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedUiToolbarModule } from '@lisa/shared/ui/toolbar';
import { SharedHomeUiComponent } from './shared-home-ui.component';
import { SharedUiThumbnailCarrousselModule } from '@lisa/shared/ui/thumbnail-carroussel';
@NgModule({
  declarations: [SharedHomeUiComponent],
  imports: [CommonModule, SharedUiToolbarModule, SharedUiThumbnailCarrousselModule],
  exports: [SharedHomeUiComponent]
})
export class SharedHomeUiModule {}
