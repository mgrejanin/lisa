import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AutoWithdrawalQuery, AutoWithdrawalService, InfoWithDrawal } from '@picpay/seller-panel/bank-accounts';
import { NewWithdraw, NewWithdrawResponse, EventTrackingService } from '@picpay/seller-panel/services';
import { BlockedBalanceComponent, RequestPasswordComponent } from '@picpay/seller-panel/shared';

import { RequestWithdrawalComponent } from '../modals/request-withdrawal/request-withdrawal.component';
import { AccountErrorComponent } from '../account-error/account-error.component';
import { NotificationsService, SnackbarTypes } from '@picpay/angular/shared/core/notifications';

@Component({
    selector: 'seller-panel-resume-balance-available',
    templateUrl: './resume-balance-available.component.html',
    styleUrls: ['./resume-balance-available.component.scss'],
})
export class ResumeBalanceAvailableComponent implements OnInit {
    private readonly unsubscribe$: Subject<void>;

    readonly infoWithdrawal$: Observable<InfoWithDrawal>;

    @Input() balance!: number;
    @Input() blockedBalance!: number;
    @Input() loading: boolean;
    @Input() error: boolean;
    @Input() accountError: string;
    @Input() checkingBankAccount: boolean;
    @Input() retryCheckBankAccount: boolean;

    constructor(
        private autoWithDrawalsService: AutoWithdrawalService,
        private withdrawalQuery: AutoWithdrawalQuery,
        private notificationService: NotificationsService,
        private matDialog: MatDialog,
        private eventTracking: EventTrackingService,
    ) {
        this.unsubscribe$ = new Subject();

        this.infoWithdrawal$ = this.withdrawalQuery.infoWithdrawal$;
    }

    ngOnInit() {
        this.onLoadInformations();
    }

    onLoadInformations(): void {
        this.autoWithDrawalsService.getWithdrawalInfo();
    }

    onOpenDialog(): void {
        this.eventTracking.eventTrackingUserCliked('NOVO_SAQUE', 'inicio', window, document);

        if (this.accountError) {
            this.matDialog.open(AccountErrorComponent, {
                width: '440px',
                panelClass: 'o-modal-reset',
                data: {
                    message: this.accountError,
                    retryCheckBankAccount: this.retryCheckBankAccount,
                },
            });
        } else {
            this.matDialog
                .open(RequestWithdrawalComponent, {
                    panelClass: ['o-modal-reset', 'full-screen-modal'],
                    width: '440px',
                    height: '496px',
                })
                .afterClosed()
                .pipe(takeUntil(this.unsubscribe$))
                .subscribe(data => {
                    if (data.confirm) {
                        this.onRequestPassword(data);
                    }
                });
        }
    }

    onRequestPassword(body: NewWithdraw): void {
        this.matDialog
            .open(RequestPasswordComponent, {
                panelClass: 'o-modal-reset',
                width: '490px',
                data: {
                    caption: 'Para sua segurança, informe a sua senha de acesso para continuar.',
                },
                disableClose: true,
            })
            .afterClosed()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(data => {
                if (data.confirm) {
                    this.onRequestWithdrawal(body);
                }
            });
    }

    onRequestWithdrawal(body: NewWithdraw): void {
        this.autoWithDrawalsService
        .newWithdrawal({
            bankAccountId: body.bankAccountId,
            value: body.value,
            ip: body.ip,
        })
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((result: NewWithdrawResponse) => {
            if (result?.codigo === 'error') {
                this.notificationService.openSnackbar(result.texto, SnackbarTypes.ERROR);
            }
                this.matDialog.open(RequestWithdrawalComponent, {
                    panelClass: ['o-modal-reset', 'full-screen-modal'],
                    width: '490px',
                    data: { is_success: true },
                });
            }
        );
    }

    onShowblockedBalanceModal() {
        this.matDialog.open(BlockedBalanceComponent, { width: '440px', panelClass: 'o-modal-reset' });
    }
}
