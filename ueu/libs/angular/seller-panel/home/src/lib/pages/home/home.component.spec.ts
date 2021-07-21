import { CurrencyPipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { EventTracking } from '@picpay/event-tracking';
import { AccountsService, AccountsServiceMock } from '@picpay/seller-panel/bank-accounts';
import { ResumeFutureReleasesComponent } from '@picpay/seller-panel/extract';
import {
    ExtractService,
    ExtractServiceMock,
    SellerQuery,
    SellerQueryMock,
    SellerService,
    SellerServiceMock,
    TransactionsService,
    TransactionsServiceMock,
    EventTrackingService,
} from '@picpay/seller-panel/services';
import {
    FeedBackComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
    OnboardingComponent,
} from '@picpay/seller-panel/shared';
import { TableTransactionsComponent } from '@picpay/seller-panel/transactions';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { MatDialogMock } from '@picpay/angular/shared/helpers';
import { UserDropdownComponent } from '@picpay/ui/components';
import { HomeComponent } from './home.component';
import { ResumeBalanceAvailableComponent } from '../../components/resume-balance-available/resume-balance-available.component';
import { MockComponent, MockModule } from 'ng-mocks';
import { throwError, of } from 'rxjs';
import { MockNotificationsService, NotificationsService } from '@picpay/angular/shared/core/notifications';
import { SellerPanelAuthService, SellerPanelAuthServiceMock } from '@picpay/seller-panel/auth';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let router: Router;
    let extractService: ExtractService;
    let transactionsService: TransactionsService;
    let sellerService: SellerService;
    let sellerQuery: SellerQuery;
    let matDialog: MatDialog;
    let accountService: AccountsService;
    let authService: SellerPanelAuthService;
    let eventTracking: EventTrackingService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MockModule(MatIconModule),
                MockModule(MatTableModule),
                MockModule(MatChipsModule),
                MockModule(MatButtonModule),
                MockModule(DesignSystemAngularModule),
                RouterTestingModule,
                HttpClientTestingModule,
            ],
            declarations: [
                MatSpinner,
                HomeComponent,
                MockComponent(HeaderComponent),
                MockComponent(ResumeBalanceAvailableComponent),
                MockComponent(ResumeFutureReleasesComponent),
                MockComponent(TableTransactionsComponent),
                MockComponent(UserDropdownComponent),
                MockComponent(FeedBackComponent),
                MockComponent(LoadingSpinnerComponent),
            ],
            providers: [
                CurrencyPipe,
                { provide: TransactionsService, useClass: TransactionsServiceMock },
                { provide: AccountsService, useClass: AccountsServiceMock },
                { provide: MatDialog, useClass: MatDialogMock },
                { provide: ExtractService, useClass: ExtractServiceMock },
                { provide: AccountsService, useClass: AccountsServiceMock },
                { provide: NotificationsService, useValue: new MockNotificationsService({ confirmed: true }) },
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com' }),
                    },
                },
                AccountsService,
                { provide: SellerService, useClass: SellerServiceMock },
                { provide: SellerQuery, useClass: SellerQueryMock },
                { provide: SellerPanelAuthService, useClass: SellerPanelAuthServiceMock },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;

        router = TestBed.inject(Router);
        extractService = TestBed.inject(ExtractService);
        transactionsService = TestBed.inject(TransactionsService);
        sellerService = TestBed.inject(SellerService);
        sellerQuery = TestBed.inject(SellerQuery);
        matDialog = TestBed.inject(MatDialog);
        accountService = TestBed.inject(AccountsService);
        authService = TestBed.inject(SellerPanelAuthService);
        eventTracking = TestBed.inject(EventTrackingService);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call eventTracking', () => {
        const evntTrackingSpy = spyOn(eventTracking, 'eventTrackingUserCliked');

        component.eventTrackingClicked();
        expect(evntTrackingSpy).toHaveBeenCalled();
    });

    it('should have "onLoadTransactions" on init', () => {
        const setEmptyStateDataSpy = spyOn(component, 'setEmptyStateData');
        const onLoadTransactionsSpy = spyOn(component, 'onLoadTransactions');
        const onGetWalletBalanceSpy = spyOn(component, 'onGetWalletBalance');
        const checkB2PPermitions = spyOn(component, 'checkB2PPermitions');
        /**
         * temporarily suspended due to backend pending
         */

        component.ngOnInit();

        expect(setEmptyStateDataSpy).toHaveBeenCalledTimes(1);
        expect(onLoadTransactionsSpy).toHaveBeenCalledTimes(1);
        expect(onGetWalletBalanceSpy).toHaveBeenCalledTimes(1);
        expect(checkB2PPermitions).toHaveBeenCalledTimes(1);
    });

    it('should show onboarding modal after view init', () => {
        const openModalOnboardingSpy = spyOn(component, 'openModalOnboarding');
        const sellerQuerySpy = spyOn(sellerQuery, 'getValue').and.returnValue({
            onboard: {
                current_step: 0,
                finished_at: null,
            },
        });

        expect(sellerQuery.getValue().onboard.current_step).toEqual(0);
        expect(sellerQuery.getValue().onboard.finished_at).toEqual(null);

        component.ngAfterViewInit();

        expect(sellerQuerySpy).toHaveBeenCalled();
        expect(openModalOnboardingSpy).toHaveBeenCalled();
    });

    it('should NOT show onboarding modal after view init', () => {
        const openModalOnboardingSpy = spyOn(component, 'openModalOnboarding');
        const sellerQuerySpy = spyOn(sellerQuery, 'getValue').and.returnValue({
            onboard: {
                current_step: 0,
                finished_at: {
                    date: '2021-01-19 18:33:16.564196',
                    timezone_type: 3,
                    timezone: 'America/Sao_Paulo',
                },
            },
        });

        expect(sellerQuery.getValue().onboard.current_step).toEqual(0);
        expect(sellerQuery.getValue().onboard.finished_at).toEqual({
            date: '2021-01-19 18:33:16.564196',
            timezone_type: 3,
            timezone: 'America/Sao_Paulo',
        });

        component.ngAfterViewInit();

        expect(sellerQuerySpy).toHaveBeenCalled();
        expect(openModalOnboardingSpy).not.toHaveBeenCalled();
    });

    it('should have checkBankAccountErrors function (with account error)', () => {
        const evtTrancking = spyOn(EventTracking, 'track');
        const accountServiceSpy = spyOn(accountService, 'checkAccounts').and.returnValue(
            of({
                bank_account_id: 1234,
                validation_issue: {
                    message: 'Message test',
                    reason: 'Teste reason',
                    action: {
                        message: 'Action message',
                        deep_link: 'deep-link.com',
                    },
                },
            }),
        );
        component.checkBankAccountErrors();

        expect(accountServiceSpy).toHaveBeenCalled();
        expect(evtTrancking).toHaveBeenCalledWith('User Clicked', {
            hit_type: 'event',
            event_category: 'clicked',
            event_action: 'User clicked',
            event_label: 'Bank Account Error Withdraw',
            error_type: 'Message test',
        });
    });

    it('should have checkBankAccountErrors function (without account error)', () => {
        const evtTrancking = spyOn(EventTracking, 'track');
        const accountServiceSpy = spyOn(accountService, 'checkAccounts').and.returnValue(
            of({
                bank_account_id: 1234,
            }),
        );
        component.checkBankAccountErrors();

        expect(accountServiceSpy).toHaveBeenCalled();
        expect(evtTrancking).not.toHaveBeenCalled();
    });

    it('should have checkBankAccountErrors function (with checking bank account error)', () => {
        const accountServiceSpy = spyOn(accountService, 'checkAccounts').and.returnValue(throwError({}));

        component.checkBankAccountErrors();

        expect(accountServiceSpy).toHaveBeenCalled();
        expect(component.showAccountError).toBe(false);
        expect(component.retryCheckBankAccount).toBe(true);
    });

    it('should have onGetWalletBalance function (Case Success)', () => {
        const extractServiceSpy = spyOn(extractService, 'getWalletBalance').and.callThrough();

        component.onGetWalletBalance();

        expect(extractServiceSpy).toHaveBeenCalledTimes(1);
        expect(component.isLoadingWallet).toBe(false);
        expect(component.balanceError).toBe(false);
    });

    it('should have onGetWalletBalance function (Case Error)', () => {
        const extractServiceSpy = spyOn(extractService, 'getWalletBalance').and.returnValue(throwError({}));

        component.onGetWalletBalance();

        expect(extractServiceSpy).toHaveBeenCalledTimes(1);
        expect(component.isLoadingWallet).toBe(false);
        expect(component.balanceError).toBe(true);
    });

    it('should have onLoadTransactions function (Case Error)', () => {
        const transactionsServiceSpy = spyOn(transactionsService, 'getTransactions').and.returnValue(throwError({}));
        const setEmptyStateDataSpy = spyOn(component, 'setEmptyStateData');

        component.onLoadTransactions();

        expect(transactionsServiceSpy).toHaveBeenCalledTimes(1);
        expect(setEmptyStateDataSpy).toHaveBeenCalledWith(true);
        expect(component.isLoading).toBe(false);
        expect(component.transactionsError).toBe(true);
    });

    it('should have handleNavigateEditAccount function', async () => {
        const routerSpy = spyOn(router, 'navigate');
        const evtTrancking = spyOn(EventTracking, 'track');

        await component.handleNavigateEditAccount();

        expect(routerSpy).toHaveBeenCalledWith(['/configuracoes/saques-bancarios'], {
            queryParams: { editAccount: component.bankAccountIdError },
        });
        expect(evtTrancking).toHaveBeenCalledWith('User Clicked', {
            hit_type: 'event',
            event_category: 'clicked',
            event_action: 'User clicked',
            event_label: 'Bank Account Error - To edit',
            error_type: component.accountError,
        });
    });

    it('should have handleNavigateManageAccounts function', async () => {
        const routerSpy = spyOn(router, 'navigate');
        const evtTrancking = spyOn(EventTracking, 'track');

        await component.handleNavigateManageAccounts();

        expect(routerSpy).toHaveBeenCalledWith(['/configuracoes/saques-bancarios']);
        expect(evtTrancking).toHaveBeenCalledWith('User Clicked', {
            hit_type: 'event',
            event_category: 'clicked',
            event_action: 'User clicked',
            event_label: 'Bank Account Error - To Check',
            error_type: component.accountError,
        });
    });

    it('should have setEmptyStateData function (true)', () => {
        component.setEmptyStateData(true);

        expect(component.emptyStateData).toMatchObject({
            title: 'Opa, isso não deu certo!',
            description: 'Algo aconteceu e não conseguimos carregar as informações.',
            svgPath: './assets/images/empty_extract.svg',
        });
    });

    it('should have setEmptyStateData function (false)', () => {
        component.setEmptyStateData(false);

        expect(component.emptyStateData).toMatchObject({
            title: 'Você ainda não recebeu!',
            description: 'Comece a receber pelo PicPay para começar a ver o seus relatórios',
            svgPath: './assets/images/empty_state.svg',
        });
    });

    it('should have openModalOnboarding function', () => {
        const finishOnboardSpy = spyOn(sellerService, 'finishOnboard').and.returnValue(
            of({
                data: {
                    current_step: 0,
                    finished_at: null,
                },
            }),
        );

        component.openModalOnboarding();

        expect(finishOnboardSpy).toHaveBeenCalled();
    });

    it('should open dialog of start onboarding', () => {
        const finishOnboardSpy = spyOn(sellerService, 'finishOnboard').and.returnValue(
            of({
                data: {
                    current_step: 0,
                    finished_at: null,
                },
            }),
        );
        const matDialogSpy = spyOn(matDialog, 'open').and.returnValue({
            afterClosed: () => of(finishOnboardSpy),
        });

        const config = {
            panelClass: ['o-modal-reset', 'full-screen-modal'],
            disableClose: true,
            closeOnNavigation: true,
            width: '630px',
            height: '700px',
        };

        component.openModalOnboarding();

        expect(matDialogSpy).toHaveBeenCalledWith(OnboardingComponent, config);
        expect(finishOnboardSpy).toHaveBeenCalled();
    });

    it('should have closeShipment function', () => {
        const res = true;

        component.closeShipment(res);

        expect(component.openShipment).toBe(true);
    });

    it('should have onLogout function', () => {
        const logoutSpy = spyOn(authService, 'logout');

        component.onLogout();

        expect(logoutSpy).toHaveBeenCalled();
    });
});
