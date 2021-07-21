import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
    DownloadReporter,
    ExtractService,
    FutureReleasesList,
    ReportFormat,
    ReportRequest,
} from '@picpay/seller-panel/services';
import { WINDOW } from '@picpay/angular/shared/helpers';
import { OnboardingExtractComponent } from '@picpay/seller-panel/shared';

@Component({
    selector: 'seller-panel-future-releases',
    templateUrl: './future-releases.component.html',
    styleUrls: ['./future-releases.component.scss'],
    animations: [
        // the fade-in/fade-out animation.
        trigger('simpleFadeAnimation', [
            state('in', style({ opacity: 1, transform: 'scale(1)' })),

            transition(':enter', [style({ opacity: 0, transform: 'scale(0.9)' }), animate(200)]),

            transition(':leave', animate(200, style({ opacity: 0, transform: 'scale(0.9)' }))),
        ]),
    ],
})
export class FutureReleasesComponent implements OnInit {
    tableData: FutureReleasesList;

    isLoading: boolean;

    emptyStateData: { title: string; svgPath: string; description: string };

    // Hide or show scroll to top button
    scrollToTopVisible: boolean;

    // extract filters
    currentFiltersExtract;

    // download filters
    currentFiltersDownloads: DownloadReporter;

    private readonly unsubscribe$: Subject<void>;

    constructor(
        private extractService: ExtractService,
        private matDialog: MatDialog,
        @Inject(WINDOW) private windowToken: Window,
    ) {
        this.isLoading = true;
        this.currentFiltersExtract = {};
        this.currentFiltersDownloads = {
            format_type: ReportFormat.PDF,
            request_type: ReportRequest.DOWNLOAD,
            filters: this.currentFiltersExtract,
        };

        this.unsubscribe$ = new Subject();
    }

    ngOnInit(): void {
        this.setEmptyStateData();

        this.extractService
            .getFutureReleases()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                response => {
                    this.tableData = response;
                    this.isLoading = false;
                },
                () => {
                    this.isLoading = false;
                    this.setEmptyStateData(true);
                },
            );
    }

    @HostListener('window:scroll', ['$event'])
    onScroll() {
        const scrollPosition = this.windowToken.pageYOffset;

        this.scrollToTopVisible = scrollPosition >= 200 && !this.scrollToTopVisible ? true : false;
    }

    scrollToTop() {
        this.windowToken.scroll({ top: 0, behavior: 'smooth' });
    }

    setEmptyStateData(error?: boolean): void {
        this.emptyStateData = {
            title: error ? 'Opa, isso não deu certo!' : 'Você ainda não possui movimentações',
            description: error
                ? 'Algo aconteceu e não conseguimos carregar as informações.'
                : 'Acompanhe aqui seus pagamentos e saques.',
            svgPath: error ? './assets/images/empty_extract.svg' : './assets/images/empty_state.svg',
        };
    }

    knowMore(): void {
        this.matDialog.open(OnboardingExtractComponent, {
            panelClass: ['o-modal-reset', 'full-screen-modal'],
            width: '628px',
            height: '624px',
            disableClose: true,
        });
    }
}
