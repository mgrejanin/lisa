import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { EventTracking } from '@picpay/event-tracking';
import { subscribeUntil } from '@picpay/angular/shared/helpers';
import { TransactionsService, TransactionTable } from '@picpay/seller-panel/services';
import { NotificationsService, SnackbarTypes } from '@picpay/angular/shared/core/notifications';

@Component({
    selector: 'seller-panel-cancel-transaction',
    templateUrl: './cancel-transaction.component.html',
    styleUrls: ['./cancel-transaction.component.scss'],
})
export class CancelTransactionComponent implements OnInit {
    cancelForm: FormGroup;
    isLoading = false;
    @ViewChild('password', { static: false }) password: ElementRef;
    private readonly PREFIX_FOR_SUCCESS: string = 'Transação cancelada com sucesso!';

    constructor(
        public dialogRef: MatDialogRef<CancelTransactionComponent>,
        @Inject(MAT_DIALOG_DATA) public data: TransactionTable,
        private transactionsService: TransactionsService,
        public notificationService: NotificationsService,
    ) {}

    ngOnInit(): void {
        this.onInitForm();
    }

    cancelTransaction(): void {
        this.isLoading = true;
        const { password } = this.cancelForm.value;
        const { id } = this.data;
        let service = this.transactionsService.cancelTransaction(id, password);

        if (this.cancelForm.invalid) {
            return;
        }

        if (this.data.checkout) {
            service = this.transactionsService.cancelExternalLinkTransaction(id, password);
        }

        service.pipe(subscribeUntil(this)).subscribe(
            response => {
                const message = response.toString();
                this.onUpdateStatusTransaction();
                this.notificationService.openSnackbar(`${this.PREFIX_FOR_SUCCESS} ${message}`, SnackbarTypes.DONE);
                this.isLoading = !this.isLoading;
                this.dialogRef.close();
            },
            () => {
                this.isLoading = !this.isLoading;
                this.dialogRef.close();
            },
        );
    }

    onInitForm(): void {
        this.cancelForm = new FormGroup({
            password: new FormControl('', Validators.required),
        });
    }

    onUpdateStatusTransaction(): void {
        this.data.status = 'Devolvida';
        this.data.status_id = 'highlight_off';
    }

    onClose(): void {
        EventTracking.track('Dialog Interacted', {
            action: 'cancel',
            hit_type: 'event',
            event_category: 'clicked',
            event_action: 'User clicked',
            event_label: 'Dialog Interacted',
        });
        this.dialogRef.close();
    }
}
