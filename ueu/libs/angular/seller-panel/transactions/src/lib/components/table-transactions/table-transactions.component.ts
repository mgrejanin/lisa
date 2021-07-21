import { Component, Input } from '@angular/core';
import {
    DetailTransaction,
    EventTrackingService,
    SidenavService,
    TransactionTable,
} from '@picpay/seller-panel/services';

@Component({
    selector: 'seller-panel-table-transactions',
    templateUrl: './table-transactions.component.html',
    styleUrls: ['./table-transactions.component.scss'],
})
export class TableTransactionsComponent {
    @Input() displayedColumns;
    @Input() listTransactions: TransactionTable[];
    @Input() page?: string;

    detailTransaction: DetailTransaction;

    constructor(private sidenavService: SidenavService, private eventTracking: EventTrackingService) {}

    onOpenSidenav(transaction): void {
        this.eventTracking.eventTrackingUserCliked('MAIS_DETALHES', this.page, window, document);
        this.detailTransaction = transaction;
        this.sidenavService.open();
    }

    onCloseSidenav(): void {
        this.eventTracking.eventTrackingUserCliked('FECHAR_MAIS_DETALHES', this.page, window, document);
        this.sidenavService.close();
        this.sidenavService.closed();
    }
}
