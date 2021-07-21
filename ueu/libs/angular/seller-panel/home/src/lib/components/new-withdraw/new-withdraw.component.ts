import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { Account, AutoWithdrawalService, InfoWithDrawal } from '@picpay/seller-panel/bank-accounts';
import { RequestWithdrawalComponent } from '../modals/request-withdrawal/request-withdrawal.component';
import { customMessage } from '@picpay/angular/shared/validators';

@Component({
    selector: 'seller-panel-new-withdraw',
    templateUrl: './new-withdraw.component.html',
    styleUrls: ['./new-withdraw.component.scss'],
})
export class NewWithdrawComponent implements OnInit {
    priceForm: FormGroup;

    @Input() data: InfoWithDrawal;
    @Input() isError: boolean;
    @Input() isLoading: boolean;
    @Input() accountWithdraw: Account;

    @Output() goToListAccounts = new EventEmitter<boolean>();

    constructor(
        private autoWithDrawalsService: AutoWithdrawalService,
        private dialogRef: MatDialogRef<RequestWithdrawalComponent>,
        private formBuilder: FormBuilder,
    ) {}

    ngOnInit(): void {
        this.onBuildForm(this.data?.available_for_withdrawal);
    }

    onBuildForm(available_for_withdrawal: number): void {
        this.priceForm = this.formBuilder.group({
            price: [
                0,
                [
                    customMessage(Validators.min(5), 'Somente saques a partir de R$5,00'),
                    customMessage(Validators.max(available_for_withdrawal), 'O valor excedeu o saldo disponível'),
                ],
            ],
        });
    }

    onChangeAccount(): void {
        this.goToListAccounts.emit(true);
    }

    onConfirm(id?: number): void {
        if (this.priceForm.valid) {
            this.dialogRef.close({
                bankAccountId: id,
                ip: '127.0.0.1',
                confirm: true,
                value: this.priceForm.get('price').value,
            });
        }
    }

    onClose(): void {
        this.dialogRef.close({
            confirm: false,
        });
    }

    onTryAgain() {
        this.autoWithDrawalsService.getWithdrawalInfo();
    }
}
