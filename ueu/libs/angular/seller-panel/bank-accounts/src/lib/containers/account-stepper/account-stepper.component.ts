import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { EventTracking } from '@picpay/event-tracking';
import { SellerQuery, SidenavService } from '@picpay/seller-panel/services';

import { Account, Bank } from '../../models';

import { AccountsQuery } from '../../state/accounts/accounts.query';
import { AccountsService } from '../../state/accounts/accounts.service';
import { BanksService } from '../../state/banks/banks.service';
import { StepperService } from '../../state';
import { StepperQuery } from '../../state/stepper/stepper.query';

@Component({
    selector: 'seller-panel-account-stepper',
    templateUrl: './account-stepper.component.html',
    styleUrls: ['./account-stepper.component.scss'],
})
export class AccountStepperComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('stepper', { static: false }) stepper: MatStepper;

    readonly isEdit$: Observable<boolean>;
    readonly isSelectingBank$: Observable<boolean>;
    readonly isLoading$: Observable<boolean>;
    readonly hasError$: Observable<boolean>;
    readonly currentAccount$: Observable<Account>;

    isOpened$: Observable<boolean>;

    stepperLength: number;
    selectedIndex: number;

    selectedBank: Bank;

    unsubscribe$: Subject<void>;
    isPhysicalPerson: boolean;

    constructor(
        private sidenavService: SidenavService,
        private accountsQuery: AccountsQuery,
        private accountsService: AccountsService,
        private banksService: BanksService,
        private stepperQuery: StepperQuery,
        private stepperService: StepperService,
        private sellerQuery: SellerQuery,
    ) {
        this.isEdit$ = this.stepperQuery.isEdit$;
        this.currentAccount$ = this.accountsQuery.currentAccount$;
        this.isSelectingBank$ = this.stepperQuery.isSelectingBank$;
        this.isLoading$ = this.accountsQuery.isLoading$;
        this.hasError$ = this.accountsQuery.hasError$;
        this.isOpened$ = this.sidenavService.opened$;
    }

    ngOnInit(): void {
        this.selectedIndex = 0;
        this.sidenavService.toggleCloseBtn(true);

        this.unsubscribe$ = new Subject();
        this.isPhysicalPerson = this.sellerQuery.getValue().organization?.pessoaFisica;
    }

    ngAfterViewInit(): void {
        this.sidenavService.closed$.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
            this.stepper.reset();
            this.accountsService.clearCurrentAccount();
            this.banksService.clearBanksStore();
        });

        if (this.stepper?._steps?.length) {
            this.stepperLength = this.stepper?.steps?.length;
        }
    }

    ngOnDestroy(): void {
        this.accountsService.clearAccountsStore();
        this.banksService.clearBanksStore();

        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    onNextStep(method: string): void {
        if (method === 'next') {
            this.stepper.next();

            EventTracking.track('User Clicked', {
                hit_type: 'event',
                event_category: 'clicked',
                event_action: 'User clicked',
                event_label: 'Bank Account - To continue',
                seller_id: this.sellerQuery.getValue().organization?.id,
            });
        } else {
            this.onClose();
        }
    }

    onPreviousStep() {
        this.sidenavService.toggleCloseBtn(true);
        this.accountsService.toggleError(false);
        this.stepperService.updateSelectingBank(false);
        this.stepper.previous();
    }

    onSelectionChange(event: StepperSelectionEvent): void {
        this.selectedIndex = event.selectedIndex;
        this.sidenavService.showCloseButton$.next(this.selectedIndex === 0);
    }

    onConfirmAccount(): void {
        const accountBody = this.accountsQuery.getValue().currentAccount;
        const accountId = accountBody.id;

        EventTracking.track('User Clicked', {
            hit_type: 'event',
            event_category: 'clicked',
            event_action: 'User clicked',
            event_label: 'Bank Account - Confirmed',
            bank_account_type: accountBody.type?.label,
            bank_name: accountBody.bank?.name,
            bank_id: accountBody.bank?.id,
            seller_id: this.sellerQuery.getValue().organization?.id,
        });

        if (this.stepperQuery.getValue().isEdit) {
            this.accountsService
                .editAccount(accountId, accountBody)
                .pipe(takeUntil(this.unsubscribe$))
                .subscribe(
                    response => {
                        this.accountsService.updateAccount(response.data);
                        this.onNextStep('next');

                        EventTracking.track('User Clicked', {
                            hit_type: 'event',
                            event_category: 'clicked',
                            event_action: 'User clicked',
                            event_label: 'Bank Account - Updated',
                            bank_account_type: accountBody.type?.label,
                            bank_name: accountBody.bank?.name,
                            bank_id: accountBody.bank?.id,
                            seller_id: this.sellerQuery.getValue().organization?.id,
                        });
                    },
                    () => {
                        this.onPreviousStep();
                    },
                );

            EventTracking.track('User Clicked', {
                hit_type: 'event',
                event_category: 'clicked',
                event_action: 'User clicked',
                event_label: 'Bank Account - Editing',
                bank_account_type: accountBody.type?.label,
                bank_name: accountBody.bank?.name,
                bank_id: accountBody.bank?.id,
                seller_id: this.sellerQuery.getValue().organization?.id,
            });
        } else {
            this.accountsService
                .createAccount(accountBody)
                .pipe(takeUntil(this.unsubscribe$))
                .subscribe(
                    response => {
                        this.accountsService.addAccount(response.data);
                        this.onNextStep('next');
                    },
                    () => {
                        this.onPreviousStep();
                    },
                );
        }
    }

    onClose(): void {
        this.sidenavService.close();
    }
}
