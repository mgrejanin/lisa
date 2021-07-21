import { Observable, of, Subject } from 'rxjs';
import { finalize, map, switchMap, takeUntil } from 'rxjs/operators';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationsService, SnackbarTypes } from '@picpay/angular/shared/core/notifications';
import { subscribeUntil, WINDOW } from '@picpay/angular/shared/helpers';
import { EventTracking } from '@picpay/event-tracking';
import {
    B2PExtractProjects,
    DownloadReporter,
    Extract,
    ExtractPagination,
    ExtractService,
    ReportFormat,
    ReportRequest,
    RequestStatusCodeErrorResponse,
    SellerQuery,
    TransactionFilters,
} from '@picpay/seller-panel/services';
import {
    B2PDownloadReportsComponent,
    DownloadReportsComponent,
    FeedbackTemplate,
    OnboardingExtractComponent,
} from '@picpay/seller-panel/shared';

@Component({
    selector: 'seller-panel-extract-container',
    templateUrl: './extract-container.component.html',
    styleUrls: ['./extract-container.component.scss'],
    animations: [
        // the fade-in/fade-out animation.
        trigger('simpleFadeAnimation', [
            state('in', style({ opacity: 1, transform: 'scale(1)' })),

            transition(':enter', [style({ opacity: 0, transform: 'scale(0.9)' }), animate(200)]),

            transition(':leave', animate(200, style({ opacity: 0, transform: 'scale(0.9)' }))),
        ]),
    ],
})
export class ExtractContainerComponent implements OnInit, OnDestroy {
    tableData: Extract;
    tablePagination: ExtractPagination;

    isB2P: boolean;
    isLoading: boolean;
    isLoadingMore: boolean;

    disableBntExtractButton: boolean;

    b2pExtractProjects: B2PExtractProjects[];

    feedbackReasonModal: boolean;
    feedbackByExtractResult: FeedbackTemplate;
    feedbackDownloadReportResult: FeedbackTemplate;

    nextReleaseData: { date?: string; balance?: number };
    balanceFutureReleases: number;
    balanceFutureReleasesError: boolean;
    noBalanceFutureReleases: string;

    scrollToTopVisible: boolean;

    currentFiltersExtract: TransactionFilters;

    currentFiltersDownloads: DownloadReporter;

    isMobile$: Observable<boolean>;

    private readonly unsubscribe$: Subject<void>;

    constructor(
        private matDialog: MatDialog,
        private extractService: ExtractService,
        private sellerQueryService: SellerQuery,
        private breakpointObserver: BreakpointObserver,
        private notificationService: NotificationsService,
        private sellerQuery: SellerQuery,
        @Inject(WINDOW) private windowToken: Window,
    ) {
        this.disableBntExtractButton = true;
        this.b2pExtractProjects = null;
        this.tableData = { extract: [] };
        this.tablePagination = { last_date: null, current_page: 1, next_page: 2, per_page: 10 };
        this.nextReleaseData = { date: null, balance: 0 };
        this.currentFiltersExtract = {};
        this.currentFiltersDownloads = {
            format_type: ReportFormat.PDF,
            request_type: ReportRequest.EMAIL,
            filters: this.currentFiltersExtract,
        };
        this.isMobile$ = this.breakpointObserver.observe('(max-width: 768px)').pipe(map(result => result.matches));
        this.unsubscribe$ = new Subject();
    }

    ngOnInit(): void {
        this.checkB2PFlag();
        this.setEmptyStateData();
        this.getExtractItems();
    }

    onOpenOnboarding(): void {
        this.matDialog
            .open(OnboardingExtractComponent, {
                panelClass: ['o-modal-reset', 'full-screen-modal'],
                width: '628px',
                height: '624px',
                disableClose: true,
            })
            .afterClosed()
            .subscribe(() => this.extractService.finishOnboarding());
    }

    getExtractItems(currentPage = 1, lastDate?: string): void {
        this.isLoading = true;

        this.unsubscribe$.next();
        this.extractService
            .getExtract(currentPage, 10, lastDate)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                (response: Extract) => {
                    if (response?.show_receivables_onboarding) {
                        this.onOpenOnboarding();
                    }
                    this.tableData.extract = this.tableData.extract.concat(response.extract);
                    this.tablePagination = response.pagination;
                    this.nextReleaseData = {
                        date: response.future_releases?.date,
                        balance: response.future_releases?.value,
                    };
                    this.noBalanceFutureReleases = !response.future_releases?.value  ? 'Você ainda não possui lançamentos': '';
                    this.isLoading = false;
                },
                () => {
                    this.setEmptyStateData(true);
                    this.isLoading = false;
                },
            );
    }

    getMoreExtractItems(): void {
        this.getExtractItems(
            this.tablePagination.current_page > this.tablePagination.next_page ? 1 : this.tablePagination.next_page,
            this.tablePagination.last_date,
        );
    }

    getB2PExtractProjects(): void {
        this.extractService
            .getExtractProjects()
            .pipe(finalize(() => (this.disableBntExtractButton = false)))
            .subscribe(projects => (this.b2pExtractProjects = projects));
    }

    setDownloadReportMessages(errorStatus: number = undefined): void {
        let errorMessage: string;

        switch (errorStatus) {
            case RequestStatusCodeErrorResponse.GATEWAY_TIMEOUT_ERROR:
                errorMessage = 'Opa, houve um erro. Tente baixar o relatório novamente em alguns minutos.';
                break;
            default:
                errorMessage = 'Opa, houve um erro de comunicação. Tente baixar o relatório novamente.';
        }

        this.feedbackDownloadReportResult = {
            description: errorStatus ? errorMessage : 'Sua solicitação está sendo processada.',
        };
    }

    setEmptyStateData(error?: boolean): void {
        this.feedbackByExtractResult = {
            title: error ? 'Opa, isso não deu certo' : 'Você ainda não possui movimentações',
            description: error
                ? 'Algo aconteceu e não conseguimos carregar as informações.'
                : 'Acompanhe aqui seus pagamentos e saques.',
            svgPath: error ? './assets/images/empty_extract.svg' : './assets/images/empty_state.svg',
        };
    }

    openB2BDownloadReports(): void {
        const modalConfiguration: MatDialogConfig = {
            panelClass: ['o-modal-reset', 'full-screen-modal'],
            width: '560px',
            disableClose: true,
            autoFocus: false,
            data: {
                projects: this.b2pExtractProjects,
                downloadExtract: false,
            },
        };

        this.matDialog
            .open(B2PDownloadReportsComponent, modalConfiguration)
            .afterClosed()
            .pipe(
                subscribeUntil(this),
                switchMap(data => {
                    if (data.project) {
                        return this.extractService
                            .downloadExtract(data.project.project_id, data.project.started_at, data.project.ended_at)
                            .pipe(map(csvFile => ({ ...data, csvFile })));
                    }
                    return of(data);
                }),
            )
            .subscribe(
                response => {
                    if (response.downloadExtract) {
                        this.setDownloadReportMessages();
                        this.downloadCSVReport(response.csvFile);
                        this.notificationService.openSnackbar(this.feedbackDownloadReportResult.description);
                    }
                },
                (error: HttpErrorResponse) => this.extractDownloadErrorHandler(error),
            );
    }

    downloadCSVReport(csv: Blob): void {
        this.windowToken.location.assign(window.URL.createObjectURL(csv));
    }

    disableDownloadExtractButton(): boolean {
        return this.isB2P && this.disableBntExtractButton;
    }

    eventTrackingDialogExtract(data: DownloadReporter, optionDownload: string): void {
        EventTracking.track('Dialog Option Selected', {
            user_id: this.sellerQuery.getValue().organization?.id,
            user_agent: window.navigator.userAgent,
            dialog_name: 'EXPORTAR_RELATORIO',
            interaction_type: 'APLICADO',
            option_selected: optionDownload,
            page_name: '/extrato/listagem',
            page_title: document.title,
            page_url: `${window.origin}/extrato/listagem`,
            referrer_url: `${window.origin}/extrato`,
            search_parameters: data,
        });
    }

    openDownloadReports(): void {
        const config = {
            panelClass: ['o-modal-reset', 'full-screen-modal'],
            width: '560px',
            data: {
                format_type: this.currentFiltersDownloads.format_type,
                filters: this.currentFiltersExtract,
            },
        };

        this.matDialog
            .open(DownloadReportsComponent, config)
            .afterClosed()
            .pipe(
                takeUntil(this.unsubscribe$),
                switchMap((data: DownloadReporter) => {
                    if (data) {
                        const formatType = `ARQUIVO_${data.format_type}`;
                        this.eventTrackingDialogExtract(data, formatType);
                        this.resetFilters();
                        this.currentFiltersDownloads = data;

                        return this.extractService.exportExtract(this.currentFiltersDownloads);
                    }
                }),
            )
            .subscribe();
    }

    checkB2PFlag(): void {
        this.isB2P = this.sellerQueryService.getValue()?.b2p?.enabled;

        if (this.isB2P) {
            this.getB2PExtractProjects();
        }
    }

    blobErrorHandler(error: HttpErrorResponse): void {
        const fileReader = new FileReader();
        fileReader.addEventListener('loadend', e => {
            const blobError = JSON.parse(e.target.result as string);
            this.notificationService.openSnackbar(blobError.message, SnackbarTypes.ERROR);
        });
        fileReader.readAsText(error.error);
    }

    extractDownloadErrorHandler(error: HttpErrorResponse): void {
        if (
            error.status === RequestStatusCodeErrorResponse.INTERNAL_SERVER_ERROR ||
            error.status === RequestStatusCodeErrorResponse.GATEWAY_TIMEOUT_ERROR
        ) {
            this.apiErrorHandler(error.status);
        } else {
            this.blobErrorHandler(error);
        }
    }

    apiErrorHandler(statusCodeError: number): void {
        this.setDownloadReportMessages(statusCodeError);
        this.notificationService.openSnackbar(this.feedbackDownloadReportResult.description, SnackbarTypes.ERROR);
    }

    private resetFilters(): void {
        this.currentFiltersDownloads = {};
        this.currentFiltersExtract = {};
    }

    @HostListener('window:scroll', ['$event'])
    onScroll(): void {
        this.scrollToTopVisible = this.windowToken.pageYOffset >= 200 && !this.scrollToTopVisible;
    }

    scrollToTop(): void {
        this.windowToken.scroll({ top: 0, behavior: 'smooth' });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
