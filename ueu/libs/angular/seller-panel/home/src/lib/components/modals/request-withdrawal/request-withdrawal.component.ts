import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import {
    Account,
    AccountsQuery,
    AccountsService,
    AutoWithdrawalQuery,
    AutoWithdrawalService,
    InfoWithDrawal,
} from '@picpay/seller-panel/bank-accounts';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'seller-panel-request-withdrawal',
    templateUrl: './request-withdrawal.component.html',
    styleUrls: ['./request-withdrawal.component.scss'],
})
export class RequestWithdrawalComponent implements OnInit, OnDestroy {
    private readonly unsubscribe$: Subject<void>;

    readonly infoWithdrawal$: Observable<InfoWithDrawal>;
    readonly isErrorInfoWithdrawal$: Observable<boolean>;
    readonly isLoadingInfoWithdrawal$: Observable<boolean>;

    readonly accountsList$: Observable<Account[]>;
    readonly isErrorAccountsList$: Observable<boolean>;
    readonly isLoadingAccountsList$: Observable<boolean>;

    isChangeAccount = false;
    isOtherAccount: Account;
    selectedAccountId: number;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { is_success: boolean },
        public dialogRef: MatDialogRef<RequestWithdrawalComponent>,
        private router: Router,
        private autoWithDrawalsService: AutoWithdrawalService,
        private withdrawalQuery: AutoWithdrawalQuery,
        private accountsService: AccountsService,
        private accountsQuery: AccountsQuery,
    ) {
        this.unsubscribe$ = new Subject();

        if (!this.data?.is_success) {
            this.infoWithdrawal$ = this.withdrawalQuery.infoWithdrawal$;
            this.isLoadingInfoWithdrawal$ = this.withdrawalQuery.isLoading$;
            this.isErrorInfoWithdrawal$ = this.withdrawalQuery.isError$;

            this.accountsList$ = this.accountsQuery.accounts$;
            this.isLoadingAccountsList$ = this.accountsQuery.isLoading$;
            this.isErrorAccountsList$ = this.accountsQuery.hasError$;
        }
    }

    ngOnInit(): void {
        this.onLoadInformations();
        this.onLoadAccountsList();
    }

    onLoadInformations(): void {
        this.autoWithDrawalsService.getWithdrawalInfo();
    }

    onLoadAccountsList(): void {
        this.accountsService.getAccounts().pipe(takeUntil(this.unsubscribe$)).subscribe();
    }

    onToggleTemplates(arg: boolean): void {
        this.isChangeAccount = arg;
    }

    onReceiveAccount(account: Account): void {
        this.isOtherAccount = account;
    }

    async onPageExtract() {
        await this.router.navigate(['/extrato/listagem']);
        this.dialogRef.close();
    }

    onClose(): void {
        this.dialogRef.close({
            confirm: false,
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
