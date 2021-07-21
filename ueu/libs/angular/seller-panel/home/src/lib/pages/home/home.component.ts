import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import { EventTracking } from '@picpay/event-tracking';
import { AccountsService } from '@picpay/seller-panel/bank-accounts';
import { getErrorMessage } from '@picpay/seller-panel/helpers';
import {
    ExtractService,
    EventTrackingService,
    SellerQuery,
    SellerService,
    TransactionsService,
    TransactionTable,
    Wallet,
} from '@picpay/seller-panel/services';
import { OnboardingComponent } from '@picpay/seller-panel/shared';
import { subscribeUntil } from '@picpay/angular/shared/helpers';
import { SellerPanelAuthService } from '@picpay/seller-panel/auth';

@Component({
    selector: 'seller-panel-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
    isLoading: boolean;
    isLoadingWallet = true;
    checkingBankAccount = false;
    openShipment = false;
    hasError: string;
    transactionsError: boolean;

    balanceAvaliable: number;
    blockedBalance: number;
    balanceError: boolean;
    accountError: string;
    showAccountError: boolean;
    bankAccountIdError: number;
    retryCheckBankAccount: boolean;

    b2p: boolean;

    balanceFutureReleases: number;

    columsTable = ['consumer', 'date', 'id', 'unity', 'status', 'price', 'icon'];
    transactions: TransactionTable[] = [];

    emptyStateData: { title: string; svgPath: string; description: string };

    constructor(
        private transactionsService: TransactionsService,
        private extractService: ExtractService,
        private router: Router,
        private accountsService: AccountsService,
        private matDialog: MatDialog,
        private sellerQuery: SellerQuery,
        private sellerService: SellerService,
        private authService: SellerPanelAuthService,
        private eventTracking: EventTrackingService,
    ) {}

    ngOnInit(): void {
        this.setEmptyStateData();
        this.onLoadTransactions();
        this.onGetWalletBalance();
        this.checkBankAccountErrors();
        this.checkB2PPermitions();
    }

    ngAfterViewInit() {
        if (
            this.sellerQuery.getValue().onboard?.current_step === 0 &&
            this.sellerQuery.getValue().onboard?.finished_at === null
        ) {
            this.openModalOnboarding();
        }
    }

    onLogout(): void {
        this.authService.logout();
    }

    onGetWalletBalance(): void {
        this.extractService
            .getWalletBalance()
            .pipe(subscribeUntil(this))
            .subscribe(
                (response: Wallet) => {
                    this.balanceAvaliable = response.available_balance;
                    this.blockedBalance = response.blocked_balance;
                    this.balanceFutureReleases = response.withheld_balance;

                    this.isLoadingWallet = false;
                    this.balanceError = false;
                },
                () => {
                    this.isLoadingWallet = false;
                    this.balanceError = true;
                },
            );
    }

    eventTrackingClicked(): void {
        this.eventTracking.eventTrackingUserCliked('CONFERIR_TODAS', 'inicio', window, document);
    }

    checkBankAccountErrors(): void {
        this.checkingBankAccount = true;
        this.accountsService
            .checkAccounts()
            .pipe(subscribeUntil(this))
            .subscribe(
                response => {
                    this.accountError = response.validation_issue?.message;
                    this.showAccountError = this.accountError ? true : false;

                    this.bankAccountIdError = response.bank_account_id;
                    this.retryCheckBankAccount = false;
                    if (this.accountError) {
                        EventTracking.track('User Clicked', {
                            hit_type: 'event',
                            event_category: 'clicked',
                            event_action: 'User clicked',
                            event_label: 'Bank Account Error Withdraw',
                            error_type: this.accountError,
                        });
                    }
                },
                e => {
                    this.showAccountError = false;
                    this.accountError = `Erro checking bank account ${e.message}`;
                    this.retryCheckBankAccount = true;
                },
            )
            .add(() => (this.checkingBankAccount = false));
    }

    onLoadTransactions() {
        this.isLoading = true;
        this.transactionsError = false;

        this.transactionsService
            .getTransactions()
            .pipe(subscribeUntil(this))
            .subscribe(
                response => {
                    const { items } = response;
                    const numberOfItems = 5;

                    // Getting only 5 transactions
                    this.transactions = this.transactions.concat(items.slice(0, numberOfItems));

                    this.isLoading = false;
                },
                err => {
                    this.setEmptyStateData(true);
                    this.hasError = getErrorMessage(err);

                    this.isLoading = false;
                    this.transactionsError = true;
                },
            );
    }

    openModalOnboarding(): void {
        const config = {
            panelClass: ['o-modal-reset', 'full-screen-modal'],
            disableClose: true,
            closeOnNavigation: true,
            width: '630px',
            height: '700px',
        };

        this.matDialog
            .open(OnboardingComponent, config)
            .afterClosed()
            .pipe(
                subscribeUntil(this),
                switchMap(() => this.sellerService.finishOnboard()),
            )
            .subscribe(response => {
                if (response?.data?.finished_at === null) {
                    throw new Error('Erro ao carregar as informações do Onboarding.');
                }
            });
    }

    async handleNavigateEditAccount() {
        await this.router.navigate(['/configuracoes/saques-bancarios'], {
            queryParams: { editAccount: this.bankAccountIdError },
        });

        EventTracking.track('User Clicked', {
            hit_type: 'event',
            event_category: 'clicked',
            event_action: 'User clicked',
            event_label: 'Bank Account Error - To edit',
            error_type: this.accountError,
        });
    }
    async handleNavigateManageAccounts() {
        await this.router.navigate(['/configuracoes/saques-bancarios']);

        EventTracking.track('User Clicked', {
            hit_type: 'event',
            event_category: 'clicked',
            event_action: 'User clicked',
            event_label: 'Bank Account Error - To Check',
            error_type: this.accountError,
        });
    }

    setEmptyStateData(error?: boolean): void {
        // No result
        let title = 'Você ainda não recebeu!';
        let description = 'Comece a receber pelo PicPay para começar a ver o seus relatórios';
        let svgPath = './assets/images/empty_state.svg';

        if (error) {
            title = 'Opa, isso não deu certo!';
            description = 'Algo aconteceu e não conseguimos carregar as informações.';
            svgPath = './assets/images/empty_extract.svg';
        }

        this.emptyStateData = {
            title,
            description,
            svgPath,
        };
    }

    closeShipment(res: boolean) {
        this.openShipment = res;
    }

    checkB2PPermitions() {
        this.b2p = this.sellerQuery.getValue().b2p?.enabled;
    }
}
