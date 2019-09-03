import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedUiMarketGridComponent } from './shared-ui-market-grid.component';
import { MatGridListModule } from '@angular/material';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [SharedUiMarketGridComponent],
  imports: [CommonModule, MatGridListModule, MatCardModule],
  exports: [SharedUiMarketGridComponent]
})
export class SharedUiMarketGridModule {}
