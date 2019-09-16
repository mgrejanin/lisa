import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { SharedUiInvoicesComponent } from './shared-invoices-ui.component';

@NgModule({
  declarations: [SharedUiInvoicesComponent],
  exports: [SharedUiInvoicesComponent],
  imports: [CommonModule, MatButtonModule, MatTableModule, MatIconModule]
})
export class SharedInvoicesUiModule {}
