import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { Account, AccountsService } from '@picpay/seller-panel/bank-accounts';
import { RequestWithdrawalComponent } from '../modals/request-withdrawal/request-withdrawal.component';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'seller-panel-accounts',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnDestroy {
    private readonly unsubscribe$: Subject<void>;

    @Input() data: Account[];
    @Input() isError: boolean;
    @Input() isLoading: boolean;
    @Input() selectedAccountId: number;

    @Output() backToNewWithdraw = new EventEmitter<boolean>();
    @Output() accountWithdraw = new EventEmitter<Account>();

    @Output() selected = new EventEmitter<number>();

    constructor(
        private accountsService: AccountsService,
        private dialogRef: MatDialogRef<RequestWithdrawalComponent>,
        private router: Router,
    ) {
        this.unsubscribe$ = new Subject();
    }

    onSelectAccount(account: Account): void {
        this.selected.emit(account.id);
        this.accountWithdraw.emit(account);
        this.onBack();
    }

    async onAddAccount() {
        await this.router.navigate(['/configuracoes/saques-bancarios'], { queryParams: { active: true } });
        this.dialogRef.close();
    }

    onBack(): void {
        this.backToNewWithdraw.emit(false);
    }

    onClose(): void {
        this.dialogRef.close({
            confirm: false,
        });
    }

    onTryAgain(): void {
        this.accountsService.getAccounts().pipe(takeUntil(this.unsubscribe$)).subscribe();
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
