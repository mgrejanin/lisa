import { Component, Input, ViewEncapsulation } from '@angular/core';

export interface InvoiceModel {
    numero: string;
    dataEmissao: Date;
    valor: number;
  }

@Component({
  selector: 'lisa-shared-ui-invoices-component',
  templateUrl: './shared-invoices-ui.component.html',
  styleUrls: ['./shared-invoices-ui.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SharedUiInvoicesComponent {
  @Input() invoices;

  displayedColumns: string[] = ['numero', 'dataEmissao', 'valor', 'download'];
}
