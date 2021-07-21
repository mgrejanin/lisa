import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SellerQuery, SidenavService, EventTrackingService } from '@picpay/seller-panel/services';

import { AccountsQuery } from '../../state/accounts/accounts.query';
import { AccountsService } from '../../state';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalWarningComponent } from '../../components/modal-warning/modal-warning.component';
import { Account } from '../../models';
import { StepperQuery } from '../../state/stepper/stepper.query';
import { StepperService } from '../../state/stepper/stepper.service';

@Component({
    selector: 'seller-panel-bank-withdrawals',
    templateUrl: './bank-withdrawals.component.html',
    styleUrls: ['./bank-withdrawals.component.scss'],
})
export class BankWithdrawalsComponent implements OnInit, OnDestroy {
    readonly bankAccounts$: Observable<Account[]>;
    readonly selectedAccount$: Observable<Account>;
    readonly isEditAccount$: Observable<boolean>;
    readonly isLoading$: Observable<boolean>;
    readonly hasHangsAccount$: Observable<boolean>;
    readonly isAccountDetailsOpened$: Subject<boolean>;
    readonly hasSellerAccount$: Observable<boolean>;

    private readonly unsubscribe$: Subject<void>;

    editAccountId: number;

    constructor(
        private sidenavService: SidenavService,
        private accountsQuery: AccountsQuery,
        private stepperQuery: StepperQuery,
        private stepperService: StepperService,
        private sellerQuery: SellerQuery,
        private accountsService: AccountsService,
        private activatedRoute: ActivatedRoute,
        private matDialog: MatDialog,
        private eventTracking: EventTrackingService,
    ) {
        this.bankAccounts$ = this.accountsQuery.accounts$;
        this.isLoading$ = this.accountsQuery.isLoading$;
        this.isEditAccount$ = this.stepperQuery.isEdit$;
        this.isAccountDetailsOpened$ = this.sidenavService.opened$;
        this.hasSellerAccount$ = this.sellerQuery.hasSellerAccount$;
        this.hasHangsAccount$ = this.accountsQuery.hasHangsAccount$;
        this.unsubscribe$ = new Subject<void>();
    }

    ngOnInit() {
        this.onOpenSidenav();
        this.checkLock();
    }

    onModalWarning(): MatDialogRef<ModalWarningComponent> {
        return this.matDialog.open(ModalWarningComponent, {
            panelClass: 'o-modal-reset',
            width: '560px',
            data: {
                title: 'Saques bancários',
                subtitle: 'Opa, alteração não permitida',
                imagePath: '../assets/images/information.svg',
                caption:
                    'Você tem um empréstimo ativo com o Banco Original e a alteração da conta bancária não é permitida agora.',
                buttons: {
                    confirm: 'Ok, entendi',
                    help: 'Preciso de ajuda',
                },
            },
        });
    }

    onOpenSidenav(): void {
        this.activatedRoute.queryParamMap.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
            if (params.get('active') === 'true') {
                this.onCreateBankAccount();
            }
            if (params.get('editAccount')) {
                this.editAccountId = Number(params.get('editAccount'));
            }
        });
    }

    onCreateBankAccount(): void {
        this.eventTracking.eventTrackingUserCliked('ADICIONAR_CONTA', 'configuracoes/alterar-senha', window, document);

        if (this.accountsQuery.getValue().hasHangsAccount) {
            this.onModalWarning();
        } else {
            this.stepperService.updateEditMode(false);
            this.stepperService.updateSelectingBank(true);
            this.accountsService.clearCurrentAccount();

            this.sidenavService.open();
        }
    }

    checkLock() {
        this.accountsService.checkLockAccounts().pipe(takeUntil(this.unsubscribe$)).subscribe();
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
