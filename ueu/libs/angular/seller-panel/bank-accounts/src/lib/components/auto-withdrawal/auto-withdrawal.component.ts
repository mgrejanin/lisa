import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ModalAutoWithdrawalComponent } from '@picpay/seller-panel/shared';

import { Observable, Subject } from 'rxjs';
import { take, takeUntil, withLatestFrom } from 'rxjs/operators';

import { AutoWithdrawalQuery } from '../../state/auto-withdrawal/auto-withdrawal.query';
import { AutoWithdrawalService } from '../../state/auto-withdrawal/auto-withdrawal.service';

@Component({
    selector: 'seller-panel-auto-withdrawal',
    templateUrl: './auto-withdrawal.component.html',
    styleUrls: ['./auto-withdrawal.component.scss'],
})
export class AutoWithdrawalComponent implements OnInit, OnDestroy {
    readonly isCheck$: Observable<boolean>;
    readonly price$: Observable<number>;
    readonly isError$: Observable<boolean>;
    readonly isLoading$: Observable<boolean>;
    checkControl: FormControl;
    unsubscribe$: Subject<void>;

    constructor(
        private autoWithDrawalsService: AutoWithdrawalService,
        public dialog: MatDialog,
        private withdrawalQuery: AutoWithdrawalQuery,
    ) {
        this.isCheck$ = this.withdrawalQuery.isCheck$;
        this.price$ = this.withdrawalQuery.price$;
        this.isLoading$ = this.withdrawalQuery.isLoading$;
        this.isError$ = this.withdrawalQuery.isError$;
        this.unsubscribe$ = new Subject();
    }

    ngOnInit(): void {
        this.onLoadInformations();
        this.onSetValue();
    }

    onLoadInformations() {
        this.autoWithDrawalsService.getWithdrawalInfo();
    }

    onSetValue(): void {
        this.isCheck$
            .pipe(withLatestFrom(this.price$))
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(([isChecked]) => {
                this.checkControl = new FormControl(isChecked);
                this.checkControl.setValue(isChecked);
            });
    }

    onToggle(): void {
        this.autoWithDrawalsService.updateCheck(this.checkControl.value);

        let dialog: MatDialogRef<ModalAutoWithdrawalComponent>;

        this.isCheck$
            .pipe(withLatestFrom(this.price$), take(1))
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(([isChecked, isPrice]) => {
                dialog = this.dialog.open(ModalAutoWithdrawalComponent, {
                    panelClass: ['o-modal-reset', 'full-screen-modal'],
                    width: '560px',
                    disableClose: true,
                    data: {
                        isCheck: isChecked,
                        price: isPrice,
                    },
                });
            });

        dialog.afterClosed().subscribe(result => {
            this.checkControl.setValue(result.confirm);
            this.autoWithDrawalsService.updateCheck(result.confirm);
        });
    }

    onTryAgain(): void {
        this.onLoadInformations();
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
