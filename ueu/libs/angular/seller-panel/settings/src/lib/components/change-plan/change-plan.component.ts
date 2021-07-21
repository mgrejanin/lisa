import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { EcommerceService, SellerService } from '@picpay/seller-panel/services';

@Component({
    selector: 'seller-panel-change-plan',
    templateUrl: './change-plan.component.html',
    styleUrls: ['./change-plan.component.scss'],
})
export class ChangePlanComponent implements OnDestroy {
    isReadyToChange: boolean;
    isChangingPlan: boolean;
    changePlanButtonLabel: string;
    changeConfirmLabel: string;
    changePlanError: boolean;

    private readonly unsubscribe$: Subject<void>;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { id: string; name: string; fee: number },
        private dialogRef: MatDialogRef<ChangePlanComponent>,
        private ecommerceService: EcommerceService,
        private sellerService: SellerService,
    ) {
        this.isReadyToChange = true;
        this.changePlanError = false;

        this.changeConfirmLabel = 'Alterar meu plano';

        this.unsubscribe$ = new Subject();
    }

    onClose() {
        this.dialogRef.close({
            confirm: false,
        });
    }

    onConfirm() {
        if (this.isReadyToChange) {
            this.onSetPlan();
        } else {
            this.dialogRef.close({
                confirm: true,
                currentPlanId: this.data.id,
            });
        }
    }

    onSetPlan(): void {
        this.isChangingPlan = true;

        this.ecommerceService
            .setPlan(this.data.id)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                () => {
                    this.sellerService.refreshSellerData();
                },
                () => {
                    this.changePlanError = true;
                    this.isChangingPlan = false;
                    this.isReadyToChange = false;
                },
                () => {
                    this.changePlanError = false;
                    this.isChangingPlan = false;
                    this.isReadyToChange = false;
                    this.changeConfirmLabel = 'Ok, entendi';
                },
            );
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
