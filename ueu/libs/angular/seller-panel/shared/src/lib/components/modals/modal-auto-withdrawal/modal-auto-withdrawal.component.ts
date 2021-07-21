import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UpdateWithDrawalResponse, WithdrawalsService } from '@picpay/seller-panel/services';
import { AutoWithDrawalModal } from '../../../models/auto-withdrawal-modal.model';
import { NotificationsService, SnackbarTypes } from '@picpay/angular/shared/core/notifications';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'seller-panel-modal-auto-withdrawal',
    templateUrl: './modal-auto-withdrawal.component.html',
    styleUrls: ['./modal-auto-withdrawal.component.scss'],
})
export class ModalAutoWithdrawalComponent implements OnDestroy {
    isError = false;
    isLoading = false;
    price: number;
    isCheck: boolean;
    enablingConfirm: boolean;
    unsubscribe$: Subject<void>;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: AutoWithDrawalModal,
        private dialogRef: MatDialogRef<ModalAutoWithdrawalComponent>,
        private withdrawalsService: WithdrawalsService,
        public notificationService: NotificationsService,
    ) {
        this.isCheck = this.data.isCheck;
        this.price = this.data.price;
        this.enablingConfirm = false;
        this.unsubscribe$ = new Subject();
    }

    onClose(): void {
        this.dialogRef.close({
            confirm: !this.isCheck,
        });
    }

    onConfirm(): void {
        this.dialogRef.close({
            confirm: this.isCheck,
        });
    }

    onNext(): void {
        this.onAutoWithdrawal(this.isCheck);
    }

    onAutoWithdrawal(value: boolean): void {
        this.isLoading = true;
        this.withdrawalsService
            .autoWithdrawal(value)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                (response: UpdateWithDrawalResponse) => {
                    this.isLoading = !this.isLoading;
                    this.notificationService.openSnackbar(response.message, SnackbarTypes.DONE);
                    if (value) {
                        this.enablingConfirm = value;
                    } else {
                        this.dialogRef.close({
                            confirm: response.enabled,
                        });
                    }
                },
                () => {
                    this.isError = true;
                    this.isLoading = !this.isLoading;
                },
            );
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
