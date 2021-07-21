import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { EventTracking } from '@picpay/event-tracking';
import { TransactionTable } from '@picpay/seller-panel/services';

import { CancelTransactionComponent } from '../cancel-transaction/cancel-transaction.component';

@Component({
    selector: 'seller-panel-details-transactions',
    templateUrl: './details-transactions.component.html',
    styleUrls: ['./details-transactions.component.scss'],
})
export class DetailsTransactionsComponent implements OnInit {
    @Input() currentTransaction: TransactionTable;

    constructor(public dialog: MatDialog) {}

    ngOnInit() {
        this.onEventTracking();
    }

    onEventTracking(): void {
        EventTracking.track('User Clicked', {
            to: 'Transaction Detail',
            hit_type: 'event',
            event_category: 'clicked',
            event_action: 'User clicked',
            event_label: 'Transaction Detail',
        });
    }

    onCancelTransaction(): void {
        this.dialog.open(CancelTransactionComponent, {
            width: '350px',
            panelClass: 'o-modal-reset',
            data: this.currentTransaction,
        });
    }
}
