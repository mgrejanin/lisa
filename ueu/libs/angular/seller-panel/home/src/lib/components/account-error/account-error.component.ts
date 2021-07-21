import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { EventTracking } from '@picpay/event-tracking';
import { AccountsService } from '@picpay/seller-panel/bank-accounts';
import { SellerQuery } from '@picpay/seller-panel/services';
import { subscribeUntil } from '@picpay/angular/shared/helpers';

@Component({
    selector: 'seller-panel-account-error',
    templateUrl: './account-error.component.html',
    styleUrls: ['./account-error.component.scss'],
})
export class AccountErrorComponent implements OnInit {
    loading: boolean;
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: { message: string; retryCheckBankAccount: boolean },
        private dialogRef: MatDialogRef<AccountErrorComponent>,
        private router: Router,
        private sellerQuery: SellerQuery,
        private accountsService: AccountsService,
    ) {}

    ngOnInit(): void {
        EventTracking.track('User Clicked', {
            hit_type: 'event',
            event_category: 'clicked',
            event_action: 'User Clicked',
            event_label: 'Bank Account Error Withdraw',
            error_type: this.data.message,
            seller_id: this.sellerQuery.getValue().organization?.id,
        });
    }

    onClose() {
        this.dialogRef.close();

        EventTracking.track('User Clicked', {
            hit_type: 'event',
            event_category: 'clicked',
            event_action: 'User Clicked',
            event_label: 'Bank Account Error Withdraw - Not now',
            error_type: this.data.message,
            seller_id: this.sellerQuery.getValue().organization?.id,
        });
    }

    onTryAgain() {
        this.loading = true;
        this.accountsService
            .checkAccounts()
            .pipe(subscribeUntil(this))
            .subscribe(
                () => (this.data.retryCheckBankAccount = false),
                e => {
                    this.data.message = `Erro checking bank account ${e.message}`;
                    this.data.retryCheckBankAccount = true;
                },
            )
            .add(() => (this.loading = false));
    }

    async onEditAccount() {
        if (this.data.retryCheckBankAccount) {
            this.onTryAgain();
        } else {
            this.dialogRef.close();
            await this.router.navigate(['/configuracoes/saques-bancarios']);

            EventTracking.track('User Clicked', {
                hit_type: 'event',
                event_category: 'clicked',
                event_action: 'User Clicked',
                event_label: 'Bank Account Error Withdraw - To Update',
                error_type: this.data.message,
                seller_id: this.sellerQuery.getValue().organization?.id,
            });
        }
    }

    get title() {
        return this.data.retryCheckBankAccount
            ? 'Opa! Algo deu errado'
            : 'Antes de sacar, corrija seus dados bancários';
    }

    get description() {
        return this.data.retryCheckBankAccount
            ? 'Algo aconteceu e não conseguimos continuar. Que tal tentar novamente?'
            : 'Encontramos erros na conta bancária cadastrada. Para retirar o dinheiro, edite sua conta.';
    }

    get buttonText() {
        return this.data.retryCheckBankAccount ? 'Tentar novamente' : 'Editar conta bancária';
    }
}
