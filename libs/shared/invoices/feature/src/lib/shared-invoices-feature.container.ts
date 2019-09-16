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
      numero: '1'
    },
    {
      valor: 200,
      dataEmissao: new Date(),
      numero: '12'
    },
    {
      valor: 400,
      dataEmissao: new Date(),
      numero: '123'
    },
    {
      valor: 333,
      dataEmissao: new Date(),
      numero: '125'
    },
    {
      valor: 525.55,
      dataEmissao: new Date(),
      numero: '12355'
    },
    {
      valor: 30044,
      dataEmissao: new Date(),
      numero: '55554'
    },
    {
      valor: 781,
      dataEmissao: new Date(),
      numero: '231'
    },
    {
      valor: 300,
      dataEmissao: new Date(),
      numero: '34'
    }
  ];
}
