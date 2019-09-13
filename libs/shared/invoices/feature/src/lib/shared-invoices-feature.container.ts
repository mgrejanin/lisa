import { Component } from '@angular/core';

export interface InvoiceModel {
  numero: string;
  dataEmissao: Date;
  valor: number;
}

@Component({
  selector: 'lisa-shared-invoices-container',
  template: '<lisa-shared-ui-invoices-component [invoices]="invoices"></lisa-shared-ui-invoices-component>'
})
export class SharedInvoicesContainer {
  invoices: InvoiceModel[] = [
    {
      valor: 100,
      dataEmissao: new Date(),
      numero: '123'
    },
    {
      valor: 100,
      dataEmissao: new Date(),
      numero: '123'
    },
    {
      valor: 100,
      dataEmissao: new Date(),
      numero: '123'
    }
  ];
}
