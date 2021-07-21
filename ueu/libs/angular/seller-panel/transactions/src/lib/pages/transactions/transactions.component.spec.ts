import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, NavigationStart } from '@angular/router';

import {
    getTransactionsResponseMock,
    TransactionsService,
    TransactionsServiceMock,
    TransactionTable,
    ReferrerUrlService,
    EventTrackingService,
    SidenavService,
} from '@picpay/seller-panel/services';
import {
    DownloadReportsComponent,
    FeedBackComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
    SidenavDetailsComponent,
} from '@picpay/seller-panel/shared';
import { MatDialogMock } from '@picpay/angular/shared/helpers';

import { TransactionsComponent } from './transactions.component';

import { MockComponents, MockModule } from 'ng-mocks';
import { of, throwError } from 'rxjs';

import { DetailsTransactionsComponent } from '../../components/details-transactions/details-transactions.component';
import { TableTransactionsComponent } from '../../components/table-transactions/table-transactions.component';
import { TransactionsFilterComponent } from '../../components/transactions-filter/transactions-filter.component';
import { MockNotificationsService, NotificationsService } from '@picpay/angular/shared/core/notifications';
import { SellerPanelAuthService, SellerPanelAuthServiceMock } from '@picpay/seller-panel/auth';
import { MatTabsModule } from '@angular/material/tabs';
import { PicpayIfRolesModule } from '@picpay/angular/shared/directives';
import { DatePipe } from '@angular/common';

fdescribe('TransactionsComponent', () => {
    let component: TransactionsComponent;
    let fixture: ComponentFixture<TransactionsComponent>;
    let transactionsService: TransactionsService;
    let matDialog: MatDialog;
    let authService: SellerPanelAuthService;
    let eventTracking: EventTrackingService;
    let referrerUrlService: ReferrerUrlService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                BrowserAnimationsModule,
                HttpClientTestingModule,
                RouterTestingModule,
                MockModule(MatIconModule),
                MockModule(MatTableModule),
                MockModule(MatDialogModule),
                MockModule(MatToolbarModule),
                MockModule(MatSidenavModule),
                MockModule(MatGridListModule),
                MockModule(MatCheckboxModule),
                MockModule(MatFormFieldModule),
                MockModule(MatTabsModule),
                MockModule(PicpayIfRolesModule),
            ],
            declarations: [
                TransactionsComponent,
                TableTransactionsComponent,
                DetailsTransactionsComponent,
                FeedBackComponent,
                SidenavDetailsComponent,
                MockComponents(HeaderComponent, LoadingSpinnerComponent, TransactionsFilterComponent),
            ],
            providers: [
                SidenavService,
                { provide: TransactionsService, useClass: TransactionsServiceMock },
                { provide: MatDialog, useClass: MatDialogMock },
                { provide: NotificationsService, useValue: new MockNotificationsService({ confirmed: true }) },
                { provide: SellerPanelAuthService, useClass: SellerPanelAuthServiceMock },
                {
                    provide: Router,
                    useValue: {
                        events: of(new NavigationStart(0, '/testUrl')),
                    },
                },
                ReferrerUrlService,
                DatePipe,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TransactionsComponent);
        component = fixture.componentInstance;

        matDialog = TestBed.inject(MatDialog);
        transactionsService = TestBed.inject(TransactionsService);
        authService = TestBed.inject(SellerPanelAuthService);
        eventTracking = TestBed.inject(EventTrackingService);
        referrerUrlService = TestBed.inject(ReferrerUrlService);

        component.activatedSearch = false;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should loadTransactions at ngOnInit', () => {
        const loadTransactionsSpy = spyOn(component, 'loadTransactions');
        const setEmptyStateDataSpy = spyOn(component, 'setEmptyStateData');
        const onSearchSpy = spyOn(component, 'onSearch');

        component.ngOnInit();

        expect(loadTransactionsSpy).toHaveBeenCalledTimes(1);
        expect(setEmptyStateDataSpy).toHaveBeenCalledWith(false);
        expect(onSearchSpy).toHaveBeenCalledTimes(1);
    });

    it('should change tab', () => {
        const loadTransactionsSpy = spyOn(component, 'loadTransactions');

        component.receiverTab(1);
        expect(component.indexTab).toEqual(1);
        expect(loadTransactionsSpy).toHaveBeenCalled();
    });

    it('should have loadTransactions and call link external function (Success case)', () => {
        const getTransactionsLinkExternalSpy = spyOn(
            transactionsService,
            'getExternLinkTransactions',
        ).and.callThrough();
        const transactions = component.transactions;

        const expectedTransactions: TransactionTable[] = transactions.concat(getTransactionsResponseMock.items);
        component.indexTab = 1;
        component.loadTransactions();

        expect(getTransactionsLinkExternalSpy).toHaveBeenCalledTimes(1);
        expect(component.isLoading).toBe(false);
        expect(component.transactions).toEqual(expectedTransactions);
    });
    it('should have loadTransactions function (Error case)', () => {
        const getTransactionsSpy = spyOn(transactionsService, 'getTransactions').and.returnValue(
            throwError('Mock error message'),
        );

        const expectedTransactions: TransactionTable[] = component.transactions;

        component.loadTransactions();

        expect(getTransactionsSpy).toHaveBeenCalledTimes(1);
        expect(component.isLoading).toBe(false);
        expect(component.transactions).toEqual(expectedTransactions);
        expect(component.hasError).toBe('Mock error message');
    });

    it('should have onSearch function', fakeAsync(() => {
        const onSearchSpy = spyOn(component, 'onSearch');

        component.onSearch();
        component.inputTransaction.nativeElement.value = 'Maria';
        component.inputTransaction.nativeElement.dispatchEvent(new Event('input'));

        tick(1000);
        fixture.detectChanges();

        expect(onSearchSpy).toHaveBeenCalled();
    }));

    it('should have call eventTrackingClicked function', () => {
        const eventTrackingSpy = spyOn(eventTracking, 'eventTrackingUserCliked');

        component.eventTrackingClicked('EXPORTAR_RELATORIO');

        expect(eventTrackingSpy).toHaveBeenCalledTimes(1);
    });

    it('should have call setEmptyStateData function with parameter true', () => {
        component.setEmptyStateData(true);

        expect(component.emptyStateData).toMatchObject({
            title: 'Nenhum resultado para sua busca',
            description: 'Confira se sua digitação está correta e tente novamente',
            svgPath: './assets/images/empty_search.svg',
        });
    });

    it('should have call setEmptyStateData function with parameter false', () => {
        component.setEmptyStateData(false);

        expect(component.emptyStateData).toMatchObject({
            title: 'Você ainda não recebeu!',
            description: 'Comece a receber pelo PicPay para começar a ver o seus relatórios',
            svgPath: './assets/images/empty_state.svg',
        });
    });

    it('should have call refreshTransactions function', () => {
        const loadTransactionsSpy = spyOn(component, 'loadTransactions');
        const evntTrackingSpy = spyOn(component, 'eventTrackingClicked');

        component.refreshTransactions();

        expect(loadTransactionsSpy).toHaveBeenCalledTimes(1);
        expect(evntTrackingSpy).toHaveBeenCalledTimes(1);
        expect(component.currentPage).toBe(1);
        expect(component.transactions.length).toBe(0);
    });

    it('should have call onLoadMoreTransactions function', () => {
        const loadTransactionsSpy = spyOn(component, 'loadTransactions');

        component.onLoadMoreTransactions();

        expect(loadTransactionsSpy).toHaveBeenCalledTimes(1);
        expect(component.transactions.length).toBe(3);
        expect(component.currentPage).toBe(2);
    });

    it('should have eventTrackingToFilters funciton', () => {
        const referrerUrlServiceSpy = spyOn(referrerUrlService, 'getPreviousPage');

        component.eventTrackingToFilters();

        expect(referrerUrlServiceSpy).toHaveBeenCalledWith('/testUrl');
    });

    it('should have call openTransactionsFilter function with { resetFilter: true } ', () => {
        const matDialogSpy = spyOn(matDialog, 'open').and.returnValue({ afterClosed: () => of({ resetFilter: true }) });
        const loadTransactionsSpy = spyOn(component, 'loadTransactions');
        const evntTrackingSpy = spyOn(component, 'eventTrackingClicked');

        const config = {
            period: component.currentPeriodTransactions,
            status: component.currentFiltersTransactions.status,
            operator_ids: component.currentOperators,
        };

        component.openTransactionsFilter();

        expect(matDialogSpy).toHaveBeenCalledWith(TransactionsFilterComponent, {
            panelClass: ['o-modal-reset', 'full-screen-modal'],
            width: '560px',
            data: config,
        });
        expect(loadTransactionsSpy).toHaveBeenCalledTimes(1);
        expect(evntTrackingSpy).toHaveBeenCalledTimes(1);
    });

    it('should have call openTransactionsFilter function with { filters } ', () => {
        const matDialogSpy = spyOn(matDialog, 'open').and.returnValue({
            afterClosed: () =>
                of({
                    currentOperators: [
                        {
                            checked: true,
                            id: 6,
                            name: 'wellington',
                        },
                    ],
                    currentPeriod: null,
                    filters: {
                        operator_ids: [],
                        status_id: 'P',
                    },
                }),
        });
        const loadTransactionsSpy = spyOn(component, 'loadTransactions');
        const evntTrackingSpy = spyOn(component, 'eventTrackingClicked');

        const config = {
            period: component.currentPeriodTransactions,
            status: component.currentFiltersTransactions.status,
            operator_ids: component.currentOperators,
        };

        component.openTransactionsFilter();

        expect(matDialogSpy).toHaveBeenCalledWith(TransactionsFilterComponent, {
            panelClass: ['o-modal-reset', 'full-screen-modal'],
            width: '560px',
            data: config,
        });
        expect(component.currentOperators.length).toBeGreaterThan(0);
        expect(loadTransactionsSpy).toHaveBeenCalledTimes(1);
        expect(evntTrackingSpy).toHaveBeenCalledTimes(1);
    });

    it('should have call openDownloadReports function', () => {
        const matDialogSpy = spyOn(matDialog, 'open').and.returnValue({ afterClosed: () => of({}) });
        const evntTrackingSpy = spyOn(component, 'eventTrackingClicked');

        component.openDownloadReports();

        expect(matDialogSpy).toHaveBeenCalledWith(DownloadReportsComponent, {
            panelClass: ['o-modal-reset', 'full-screen-modal'],
            width: '560px',
            data: {
                format_type: 'PDF',
                filters: component.currentFiltersTransactions,
            },
        });
        expect(evntTrackingSpy).toHaveBeenCalledTimes(1);
    });

    it('should have onLogout function', () => {
        const logoutSpy = spyOn(authService, 'logout');

        component.onLogout();

        expect(logoutSpy).toHaveBeenCalled();
    });
});
