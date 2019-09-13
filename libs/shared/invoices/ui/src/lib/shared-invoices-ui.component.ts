import { Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'lisa-shared-ui-invoices-component',
    templateUrl: './shared-invoices-ui.component.html',
    styleUrls: ['./shared-invoices-ui.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SharedUiInvoicesComponent{
    @Input() invoices;
}