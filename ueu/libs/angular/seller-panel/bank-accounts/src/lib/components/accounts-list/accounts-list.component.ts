import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { SellerQuery, SidenavService } from '@picpay/seller-panel/services';
import { ConfirmComponent } from '@picpay/seller-panel/shared';

import { EventTracking } from '@picpay/event-tracking';
import { AccountsQuery } from '../../state/accounts/accounts.query';
import { AccountsService } from '../../state/accounts/accounts.service';
import { BanksService } from '../../state/banks/banks.service';
import { ModalWarningComponent } from '../modal-warning/modal-warning.component';
import { Account } from '../../models';
import { StepperService } from '../../state/stepper/stepper.service';

@Component({
    selector: 'seller-panel-accounts-list',
    templateUrl: './accounts-list.component.html',
    styleUrls: ['./accounts-list.component.scss'],
})
export class AccountsListComponent implements OnInit, OnDestroy {
    @Input() disableItemActions: boolean;
    @Input() editAccountId: number;
    readonly accountsList$: Observable<Account[]>;
    readonly isLoading$: Observable<boolean>;
    readonly hasHangsAccount$: Observable<boolean>;
    readonly hasBankAccountsListError$: Observable<boolean>;
    readonly unsubscribe$: Subject<void>;
    actionTypeAccount: string;

    constructor(
        private matDialog: MatDialog,
        private accountsService: AccountsService,
        private banksService: BanksService,
        private accountsQuery: AccountsQuery,
        private sidenavService: SidenavService,
        private stepperService: StepperService,
        private sellerQuery: SellerQuery,
    ) {
        this.accountsList$ = this.accountsQuery.accounts$;
        this.isLoading$ = this.accountsQuery.isLoading$;
        this.hasHangsAccount$ = this.accountsQuery.hasHangsAccount$;
        this.hasBankAccountsListError$ = this.accountsQuery.hasError$;
        this.unsubscribe$ = new Subject();
    }

    ngOnInit(): void {
        this.getAccounts();
    }

    getAccounts(): void {
        this.accountsService
            .getAccounts()
            .pipe(
                takeUntil(this.unsubscribe$),
                switchMap(() => this.accountsList$),
            )
            .subscribe(accounts => {
                if (this.editAccountId) {
                    const account = accounts.find(accountItem => accountItem.id === this.editAccountId);
                    if (account) {
                        this.openEditAccount(account);
                    }
                    this.editAccountId = null;
                }
            });
    }

    dispatchEventChangeAccount(account: Account): void {
        switch (this.actionTypeAccount) {
            case 'onSetAsPrincipalAccount':
                this.onSetAsPrincipalAccount(account);
                break;
            case 'openEditAccount':
                this.openEditAccount(account);
                break;
            case 'onRemoveAccount':
                this.onRemoveAccount(account);
                break;
            default:
                break;
        }
    }

    verifyPermissionEditAccount(account: Account, actionType: string): void {
        this.actionTypeAccount = actionType;
        if (this.accountsQuery.getValue().hasHangsAccount) {
            this.accountsService
                .unlockAccounts()
                .pipe(takeUntil(this.unsubscribe$))
                .subscribe(
                    (response: boolean) => {
                        if (response) {
                            this.dispatchEventChangeAccount(account);
                        } else {
                            this.onModalWarning(
                                'Saques bancários',
                                'Opa, alteração não permitida',
                                '../assets/images/information.svg',
                                'Você tem um empréstimo ativo com o Banco Original e a alteração da conta bancária não é permitida agora.',
                                {
                                    confirm: 'Ok, entendi',
                                    help: 'Preciso de ajuda',
                                },
                            );
                        }
                    },
                    () => {
                        this.onModalWarning(
                            'Desculpe! Nosso sistema falhou',
                            null,
                            '../assets/images/feedback-error.svg',
                            'Ocorreu um erro ao tentar acessar o sistema e não conseguimos concluir, tente novamente.',
                            {
                                confirm: 'Ok, entendi',
                                help: null,
                            },
                        );
                    },
                );
        } else {
            this.dispatchEventChangeAccount(account);
        }
    }

    openEditAccount(account: Account): void {
        this.stepperService.updateEditMode(true);
        this.stepperService.updateSelectingBank(false);

        this.accountsService.setCurrentAccount(account);
        this.banksService.setSelectedBank(account.bank);

        this.sidenavService.open();

        EventTracking.track('User Clicked', {
            hit_type: 'event',
            event_category: 'clicked',
            event_action: 'User clicked',
            event_label: 'Bank Account - To edit',
            seller_id: this.sellerQuery.getValue().organization?.id,
        });
    }

    onSetAsPrincipalAccount(account: Account): void {
        this.accountsService.setAccountAsPrincipal(account.id).pipe(takeUntil(this.unsubscribe$)).subscribe();
    }

    onModalWarning(
        title: string,
        subtitle: string,
        imagePath: string,
        caption: string,
        buttons: {
            confirm: string;
            help: string;
        },
    ): MatDialogRef<ModalWarningComponent> {
        return this.matDialog.open(ModalWarningComponent, {
            panelClass: 'o-modal-reset',
            width: '560px',
            data: {
                title,
                subtitle,
                imagePath,
                caption,
                buttons,
            },
        });
    }

    openConfirm(): MatDialogRef<ConfirmComponent> {
        return this.matDialog.open(ConfirmComponent, {
            panelClass: 'o-modal-reset',
            width: '360px',
            data: {
                title: 'Excluir conta',
                caption: 'Ei, você está prestes a excluir uma conta. Deseja realmente fazer isso agora?',
                buttons: {
                    cancel: 'Cancelar',
                    confirm: 'Sim, excluir',
                },
            },
        });
    }

    onRemoveAccount(account: Account): void {
        this.openConfirm()
            .afterClosed()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(result => {
                if (result.confirm) {
                    this.accountsService.removeAccount(account.id).pipe(takeUntil(this.unsubscribe$)).subscribe();
                }
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
