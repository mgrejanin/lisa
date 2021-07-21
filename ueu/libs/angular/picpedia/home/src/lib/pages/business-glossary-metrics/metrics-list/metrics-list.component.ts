import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { BusinessGlossaryService } from '../../../data-access/business-glossary/business-glossary.service';
import { BusinessGlossaryQuery } from '../../../data-access/business-glossary/business-glossary.query';
import { BusinessGlossaryMetricsList } from '../../../models/business-glossary/metrics-list.model';
import { bussinessGlossaryCard } from '../../../models/business-glossary/cards.model';

import { WithNavbar, BreadcrumbService, PicpediaRouteTitle, PicpediaRoutePath } from '@picpay/picpedia/shared';
import { subscribeUntil } from '@picpay/angular/shared/helpers';

@Component({
    selector: 'picpedia-metrics-list',
    templateUrl: './metrics-list.component.html',
    styleUrls: ['./metrics-list.component.scss'],
})
export class MetricsListComponent implements OnInit, WithNavbar {
    titleMetricsList$: Observable<string>;
    isLoadingMetrics$: Observable<boolean>;
    metricsList$: Observable<BusinessGlossaryMetricsList[]>;
    iconMetrics: string;

    constructor(
        private businessGlossaryService: BusinessGlossaryService,
        private businessGlossaryQuery: BusinessGlossaryQuery,
        private breadcrumbService: BreadcrumbService,
        private route: ActivatedRoute,
    ) {
        this.titleMetricsList$ = this.businessGlossaryQuery.titleMetricsList$;
        this.isLoadingMetrics$ = this.businessGlossaryQuery.isLoadingDisplay$;
        this.metricsList$ = this.businessGlossaryQuery.metricsList$;
    }

    ngOnInit(): void {
        this.getMetricsListForId();
        this.getMetricsList();
        this.startUpdateMetricsList();
        this.updateBreadcrumbs();
        this.iconMetrics = this.getIconFromMetricsList();
    }

    // atualiza a listagem de métricas após o update do favorito
    startUpdateMetricsList(): void {
        this.businessGlossaryService.onDashboardsList
            .pipe(
                subscribeUntil(this),
                tap(() => {
                    this.getMetricsList();
                }),
            )
            .subscribe();
    }

    getMetricsListForId(): void {
        this.route.params
            .pipe(
                subscribeUntil(this),
                tap(params => this.businessGlossaryService.getMetricsListItem(params.groupName)),
            ).subscribe();
    }

    getMetricsList(): void {
        this.businessGlossaryService.getMetricsList();
    }

    getIconFromMetricsList(): string {
        const iconItem = bussinessGlossaryCard.find(item => item.title === PicpediaRouteTitle.GlossaryMetrics);
        return iconItem.icon;
    }

    updateMetricsListFavorite(item: boolean, id: number): void {
        this.businessGlossaryService.updateDashboardsListFavorite(item, id);
    }

    updateBreadcrumbs(): void {
        this.breadcrumbService.update({
            breadcrumbs: [
                { label: PicpediaRouteTitle.BusinessGlossary, url: PicpediaRoutePath.BusinessGlossary },
                { label: PicpediaRouteTitle.GlossaryMetrics, url: PicpediaRoutePath.GlossaryMetrics },
                { label: PicpediaRouteTitle.GlossaryMetricsList, url: PicpediaRoutePath.GlossaryMetricsList },
            ],
        });
    }
}
