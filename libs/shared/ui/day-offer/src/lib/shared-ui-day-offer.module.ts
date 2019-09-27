import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedUiDayOfferComponent } from './shared-ui-day-offer.component';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [SharedUiDayOfferComponent],
  exports: [SharedUiDayOfferComponent],
  imports: [CommonModule, MatCardModule]
})
export class SharedUiDayOfferModule {}
