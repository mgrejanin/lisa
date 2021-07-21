import { Component, OnDestroy } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { DownloadReporter, ExtractService, ReportFormat, ReportRequest } from '@picpay/seller-panel/services';
import { DownloadReportsComponent } from '@picpay/seller-panel/shared';

import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { SellerPanelAuthService } from '@picpay/seller-panel/auth';
@Component({
    selector: 'seller-panel-extract',
    templateUrl: './extract.component.html',
    styleUrls: ['./extract.component.scss'],
})
export class ExtractComponent implements OnDestroy {
    taxValue: number;

    // Hide or show scroll to top button
    scrollToTopVisible: boolean;

    // extract filters
    currentFiltersExtract: Record<string, unknown>;

    // download filters
    currentFiltersDownloads: DownloadReporter;

    // breakpoint observer
    isMobile$: Observable<boolean>;

    nextReleaseData = { balance: 1300, date: '30/05/2020' };

    private readonly unsubscribe$: Subject<void>;

    constructor(
        private matDialog: MatDialog,
        private extractService: ExtractService,
        private breakpointObserver: BreakpointObserver,
        private authService: SellerPanelAuthService,
    ) {
        this.currentFiltersExtract = {};
        this.currentFiltersDownloads = {
            format_type: ReportFormat.PDF,
            request_type: ReportRequest.DOWNLOAD,
            filters: this.currentFiltersExtract,
        };

        this.isMobile$ = this.breakpointObserver.observe('(max-width: 768px)').pipe(map(result => result.matches));
        this.unsubscribe$ = new Subject();

        this.taxValue = 0;
    }

    onLogout() {
        this.authService.logout();
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
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
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((data: DownloadReporter) => {
                if (data) {
                    this.currentFiltersDownloads = data;
                    this.extractService
                        .exportExtract(this.currentFiltersDownloads)
                        .pipe(takeUntil(this.unsubscribe$))
                        .subscribe();
                }
            });
    }
}
