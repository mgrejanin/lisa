import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedUiThumbnailCarrousselComponent } from './shared-ui-thumbnail-carroussel.component';
import { MatListModule } from '@angular/material';

@NgModule({
  declarations: [SharedUiThumbnailCarrousselComponent],
  imports: [CommonModule, MatListModule],
  exports: [SharedUiThumbnailCarrousselComponent]
})
export class SharedUiThumbnailCarrousselModule {}
