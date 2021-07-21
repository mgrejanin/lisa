import { fromEvent, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, takeUntil } from 'rxjs/operators';

import { BreakpointObserver } from '@angular/cdk/layout';
import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NavigationStart, Router } from '@angular/router';
import { EventTracking } from '@picpay/event-tracking';
import { SellerPanelAuthService } from '@picpay/seller-panel/auth';
import { getErrorMessage } from '@picpay/seller-panel/helpers';
import {
    DownloadReporterTransactions,
    EventTrackingSearch,
    EventTrackingService,
    ReferrerUrlQuery,
    ReferrerUrlService,
    ReportFormat,
    ReportRequest,
    SellerQuery,
    StoreSeller,
    TransactionFilters,
    TransactionsOperators,
    TransactionsService,
    TransactionTable,
} from '@picpay/seller-panel/services';
import { DownloadReportsComponent } from '@picpay/seller-panel/shared';

import { TransactionsFilterComponent } from '../../components/transactions-filter/transactions-filter.component';

@Component({
    selector: 'seller-panel-transactions',
    templateUrl: './transactions.component.html',
    styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit, OnDestroy {
    columsTable = ['consumer', 'date', 'id', 'unity', 'status', 'price', 'icon'];
    namePlaceholderSearch: string;
    transactions: TransactionTable[] = [];
    service: Observable<{ items: TransactionTable[] }>;
    hasError: string;
    isLoading: boolean;
    isMobile$: Observable<boolean>;
    indexTab: number;
    previousPage: string;

    // no results state
    activatedSearch: boolean;
    emptyStateData: { title: string; svgPath: string; description: string };

    // transactions filters
    currentPage = 1;
    currentPeriodTransactions: number;
    currentFiltersTransactions: TransactionFilters = {};
    currentOperators: TransactionsOperators[] = [];
    initDate: string;
    endDate: string;

    // download filters
    currentFiltersDownloads: DownloadReporterTransactions;

    @ViewChild('inputTransaction', { static: true }) inputTransaction: ElementRef<HTMLInputElement>;

    private search$: Observable<string>;
    private readonly unsubscribe$: Subject<void>;
    private readonly unsubscribeTransactions$: Subject<void>;
    readonly hasStore$: Observable<StoreSeller>;

    constructor(
        private transactionsService: TransactionsService,
        private matDialog: MatDialog,
        private breakpointObserver: BreakpointObserver,
        private sellerQuery: SellerQuery,
        private authService: SellerPanelAuthService,
        private eventTracking: EventTrackingService,
        private router: Router,
        private referrerUrlService: ReferrerUrlService,
        private referrerUrlQuery: ReferrerUrlQuery,
        private datePipe: DatePipe,
    ) {
        this.currentFiltersDownloads = {
            format_type: ReportFormat.PDF,
            request_type: ReportRequest.EMAIL,
        };
        this.isMobile$ = this.breakpointObserver.observe('(max-width: 768px)').pipe(map(result => result.matches));
        this.indexTab = 0;
        this.unsubscribe$ = new Subject();
        this.unsubscribeTransactions$ = new Subject();
        this.hasStore$ = this.sellerQuery.hasStore$;

        this.hasStore$.subscribe(hasStore => {
            hasStore.enabled
                ? (this.namePlaceholderSearch = 'Digite para buscar a loja')
                : (this.namePlaceholderSearch = 'Buscar por comprador ou ID');
        });
    }

    ngOnInit(): void {
        this.setEmptyStateData(this.activatedSearch);
        this.loadTransactions();
        this.onSearch();
        this.eventTrackingToFilters();
    }

    onLogout(): void {
        this.authService.logout();
    }

    receiverTab(event: number): void {
        this.unsubscribeTransactions$.next();
        this.indexTab = event;
        this.resetFilters();
        this.resetTransactions();
        this.loadTransactions();
    }

    onSearch(): void {
        this.search$ = fromEvent(this.inputTransaction.nativeElement, 'input').pipe(
            debounceTime(1000),
            distinctUntilChanged(),
            map((event: KeyboardEvent) => (event.target as HTMLTextAreaElement).value),
            takeUntil(this.unsubscribe$),
        );

        this.search$.pipe(takeUntil(this.unsubscribe$)).subscribe((key: string) => {
            this.setEmptyStateData(!this.activatedSearch);
            this.currentFiltersTransactions.search = key;
            this.eventTrackingSearchStarted();
            this.resetTransactions();
            this.loadTransactions();
        });
    }

    setEmptyStateData(activateSearch: boolean): void {
        // No result
        let title = 'Você ainda não recebeu!';
        let description = 'Comece a receber pelo PicPay para começar a ver o seus relatórios';
        let svgPath = './assets/images/empty_state.svg';

        if (activateSearch) {
            title = 'Nenhum resultado para sua busca';
            description = 'Confira se sua digitação está correta e tente novamente';
            svgPath = './assets/images/empty_search.svg';
        }

        this.emptyStateData = {
            title,
            description,
            svgPath,
        };
    }

    eventTrackingSearchStarted(): void {
        const pageEventInfo = this.eventTrackingCommon();
        EventTracking.track('Search Started', {
            pageEventInfo,
        });
    }

    eventTrackingSearchReturned(transactions: TransactionTable[]): void {
        const pageEventInfo = this.eventTrackingCommon();
        EventTracking.track('Search Returned', {
            pageEventInfo,
            result_list: transactions,
        });
    }

    eventTrackingToFilters(): void {
        this.router.events.pipe(takeUntil(this.unsubscribe$)).subscribe(routeData => {
            if (routeData instanceof NavigationStart && routeData.url !== '/transacoes') {
                this.referrerUrlService.getPreviousPage(routeData.url);
            }
        });
    }

    eventTrackingCommon(): EventTrackingSearch {
        const url = this.router.url;
        return {
            page_name: url,
            page_title: document.title,
            page_url: `${window.origin}${url}`,
            text_box_name: this.namePlaceholderSearch,
            user_email: this.sellerQuery.getValue().organization?.email,
            user_id: this.sellerQuery.getValue().organization?.id,
            user_agent: window.navigator.userAgent,
            search_query_id: 'search',
        };
    }

    loadServiceByIndex(): void {
        if (this.indexTab == 0) {
            this.service = this.transactionsService.getTransactions(
                'transaction_date',
                this.currentPage,
                12,
                this.currentFiltersTransactions,
            );
        }
        if (this.indexTab == 1) {
            this.service = this.transactionsService.getExternLinkTransactions(this.currentPage, 12);
        }
    }

    loadTransactions(): void {
        this.isLoading = true;
        this.loadServiceByIndex();

        this.service.pipe(takeUntil(this.unsubscribeTransactions$)).subscribe(
            response => {
                this.isLoading = false;
                this.transactions = this.transactions.concat(response.items);
                if (this.currentFiltersTransactions.search) {
                    this.eventTrackingSearchReturned(this.transactions);
                }
            },
            err => {
                this.isLoading = false;
                this.hasError = getErrorMessage(err);
            },
        );
    }

    refreshTransactions(): void {
        this.eventTrackingClicked('ATUALIZAR');
        this.resetTransactions();
        this.loadTransactions();
    }

    onLoadMoreTransactions(): void {
        this.currentPage = this.currentPage + 1;
        this.loadTransactions();
    }

    openTransactionsFilter(): void {
        this.eventTrackingClicked('FILTRO');
        const config: MatDialogConfig = {
            panelClass: ['o-modal-reset', 'full-screen-modal'],
            width: '560px',
            data: {
                period: this.currentPeriodTransactions,
                status: this.currentFiltersTransactions.status,
                operator_ids: this.currentOperators,
                date_init: this.initDate,
                date_end: this.endDate,
            },
        };
        this.matDialog
            .open(TransactionsFilterComponent, config)
            .afterClosed()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(data => {
                if (data?.resetFilter) {
                    this.resetFilters();
                    this.resetTransactions();
                    this.loadTransactions();
                }
                if (data?.filters) {
                    this.currentFiltersTransactions = data.filters;
                    this.currentPeriodTransactions = data.currentPeriod;
                    this.currentOperators = data.currentOperators;
                    this.endDate = data.filters.date_end;
                    this.initDate = data.filters.date_init;
                    this.resetTransactions();
                    this.loadTransactions();
                }
            });
    }

    eventTrackingClicked(buttonName: string): void {
        this.eventTracking.eventTrackingUserCliked(buttonName, 'transacoes', window, document);
    }

    eventTrackingDialogExtract(data: DownloadReporterTransactions): void {
        EventTracking.track('Dialog Option Selected', {
            user_id: this.sellerQuery.getValue().organization?.id,
            user_agent: window.navigator.userAgent,
            dialog_name: 'EXPORTAR_RELATORIO',
            interaction_type: 'APLICADO',
            page_name: '/transacoes',
            page_title: document.title,
            page_url: `${window.origin}/trasacoes`,
            referrer_url: `${window.origin}${this.referrerUrlQuery.getValue().url}`,
            search_parameters: data,
        });
    }

    openDownloadReports(): void {
        this.eventTrackingClicked('EXPORTAR_RELATORIO');

        const config = {
            panelClass: ['o-modal-reset', 'full-screen-modal'],
            width: '560px',
            data: {
                format_type: this.currentFiltersDownloads.format_type,
                filters: this.currentFiltersTransactions,
            },
        };
        this.matDialog
            .open(DownloadReportsComponent, config)
            .afterClosed()
            .pipe(
                takeUntil(this.unsubscribe$),
                switchMap((data: DownloadReporterTransactions) => {
                    if (data) {
                        this.eventTrackingDialogExtract(data);
                        this.resetFilters();
                        this.currentFiltersDownloads = data;
                        this.currentFiltersDownloads.date_end = this.datePipe.transform(
                            this.currentFiltersDownloads.date_end,
                            'yyyy-MM-dd',
                        );
                        this.currentFiltersDownloads.date_init = this.datePipe.transform(
                            this.currentFiltersDownloads.date_init,
                            'yyyy-MM-dd',
                        );
                        return this.transactionsService.exportTransactions(this.currentFiltersDownloads);
                    }
                }),
            )
            .subscribe();
    }

    private resetTransactions(): void {
        this.currentPage = 1;
        this.transactions = [];
    }

    private resetFilters(): void {
        this.currentPeriodTransactions = null;
        this.currentFiltersTransactions = {};
        this.endDate = null;
        this.initDate = null;

        if (this.currentOperators.length > 0) {
            this.currentOperators.forEach(operator => (operator.checked = false));
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
