import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { EventTracking } from '@picpay/event-tracking';
import { SellerQuery } from '@picpay/seller-panel/services';

@Component({
    selector: 'seller-panel-account-error',
    templateUrl: './account-error.component.html',
    styleUrls: ['./account-error.component.scss'],
})
export class AccountErrorComponent implements OnInit {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: string,
        private dialogRef: MatDialogRef<AccountErrorComponent>,
        private router: Router,
        private sellerQuery: SellerQuery,
    ) {}

    ngOnInit(): void {
        EventTracking.track('User Clicked', {
            hit_type: 'event',
            event_category: 'clicked',
            event_action: 'User clicked',
            event_label: 'Bank Account Error Withdraw',
            error_type: this.data,
            seller_id: this.sellerQuery.getValue().organization?.id,
        });
    }

    onClose() {
        this.dialogRef.close();

        EventTracking.track('User Clicked', {
            hit_type: 'event',
            event_category: 'clicked',
            event_action: 'User clicked',
            event_label: 'Bank Account Error Withdraw - Not now',
            error_type: this.data,
            seller_id: this.sellerQuery.getValue().organization?.id,
        });
    }

    async onEditAccount() {
        this.dialogRef.close();
        await this.router.navigate(['/configuracoes/saques-bancarios']);

        EventTracking.track('User Clicked', {
            hit_type: 'event',
            event_category: 'clicked',
            event_action: 'User clicked',
            event_label: 'Bank Account Error Withdraw - To Update',
            error_type: this.data,
            seller_id: this.sellerQuery.getValue().organization?.id,
        });
    }
}
