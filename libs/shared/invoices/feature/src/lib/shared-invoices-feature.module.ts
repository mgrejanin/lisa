import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedInvoicesUiModule } from '@lisa/shared/invoices/ui';
import { SharedInvoicesContainer } from './shared-invoices-feature.container';
@NgModule({
  declarations: [SharedInvoicesContainer],
  imports: [
    SharedInvoicesUiModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SharedInvoicesContainer
      }
    ])
  ]
})
export class SharedInvoicesFeatureModule {}
