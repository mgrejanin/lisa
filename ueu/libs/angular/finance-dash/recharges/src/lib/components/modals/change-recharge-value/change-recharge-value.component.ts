import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApolloSnackbar } from '@picpay/design-system-angular-components';
import { Unsubscriber } from '@picpay/angular/shared/helpers';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { RechargesService } from '../../../data-access';

@Component({
    selector: 'finance-dash-change-recharge-value',
    templateUrl: './change-recharge-value.component.html',
    styleUrls: ['./change-recharge-value.component.scss'],
})
export class ChangeRechargeValueComponent implements AfterViewInit {
    @Unsubscriber() private readonly unsubscribe$: Subject<void>;

    @ViewChild('snackbar', { static: true }) snackbar: ApolloSnackbar;

    form: FormGroup;
    isLoading: boolean;
    verifyAmountValue: boolean;

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: {
            rechargeID: string;
            rechargeIDCounter: number;
            rechargeValue: number;
        },
        private dialogRef: MatDialogRef<ChangeRechargeValueComponent>,
        private rechargesService: RechargesService,
        private formBuilder: FormBuilder,
    ) {
        this.isLoading = false;

        this.form = this.formBuilder.group({
            rechargeValue: ['', [Validators.required, Validators.min(0.01)]],
        });
    }

    ngAfterViewInit(): void {
        this.form
            .get('rechargeValue')
            .valueChanges.pipe(takeUntil(this.unsubscribe$))
            .subscribe(value => {
                this.verifyAmountValue = value > 500;
            });
    }

    onApplyChangeValue(): void {
        if (this.form.invalid) {
            return;
        }

        const value = this.form.get('rechargeValue').value;
        const value_srt = value.toString();

        this.isLoading = true;

        const rechargeUpdateValue = {
            id: this.data.rechargeID,
            value,
            value_srt,
        };

        this.rechargesService
            .updateRechargeValue(rechargeUpdateValue)
            .pipe(
                takeUntil(this.unsubscribe$),
                finalize(() => (this.isLoading = false)),
            )
            .subscribe(() => {
                this.form.reset();
                this.dialogRef.close();
            });
    }

    onClose(): void {
        this.dialogRef.close();
    }
}
