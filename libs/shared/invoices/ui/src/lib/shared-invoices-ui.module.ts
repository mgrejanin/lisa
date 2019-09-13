import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SharedUiInvoicesComponent } from './shared-invoices-ui.component';
@NgModule({
  declarations: [SharedUiInvoicesComponent],
  exports: [SharedUiInvoicesComponent],
  imports: [CommonModule, MatCardModule, MatButtonModule]
})
export class SharedInvoicesUiModule {}
