import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedUiMarketGridComponent } from './shared-ui-market-grid.component';
import { MatGridListModule } from '@angular/material';

@NgModule({
  declarations: [SharedUiMarketGridComponent],
  imports: [CommonModule, MatGridListModule],
  exports: [SharedUiMarketGridComponent]
})
export class SharedUiMarketGridModule {}
