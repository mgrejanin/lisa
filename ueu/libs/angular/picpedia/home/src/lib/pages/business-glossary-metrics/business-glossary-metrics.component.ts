import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { BreadcrumbService, PicpediaRoutePath, PicpediaRouteTitle, WithNavbar } from '@picpay/picpedia/shared';

import { BusinessGlossaryQuery } from '../../data-access/business-glossary/business-glossary.query';
import { BusinessGlossaryService } from '../../data-access/business-glossary/business-glossary.service';
import { bussinessGlossaryCard } from '../../models/business-glossary/cards.model';
import { BusinessGlossaryDashboards } from '../../models/business-glossary/dashboards.model';

@Component({
    selector: 'picpedia-business-glossary-metrics',
    templateUrl: './business-glossary-metrics.component.html',
    styleUrls: ['./business-glossary-metrics.component.scss'],
})
export class GlossaryMetricsComponent implements OnInit, WithNavbar {
    iconMetrics: string;
    titleMetrics: PicpediaRouteTitle;

    metrics$: Observable<BusinessGlossaryDashboards[]>;
    isLoadingMetrics$: Observable<boolean>;

    constructor(
        private businessGlossaryService: BusinessGlossaryService,
        private businessGlossaryQuery: BusinessGlossaryQuery,
        private breadcrumbService: BreadcrumbService,
    ) {
        this.metrics$ = this.businessGlossaryQuery.metrics$;
        this.isLoadingMetrics$ = this.businessGlossaryQuery.isLoadingDisplay$;
        this.iconMetrics = this.getIconFromMetricsList();
        this.titleMetrics = PicpediaRouteTitle.GlossaryMetrics;
    }

    ngOnInit(): void {
        this.getMetricsCards();
        this.updateBreadcrumbs();
    }

    getMetricsCards(): void {
        this.businessGlossaryService.getMetricsCards();
    }

    getIconFromMetricsList(): string {
        const iconItem = bussinessGlossaryCard.find(item => item.title === PicpediaRouteTitle.GlossaryMetrics);
        return iconItem.icon;
    }

    updateBreadcrumbs(): void {
        this.breadcrumbService.update({
            breadcrumbs: [
                { label: PicpediaRouteTitle.BusinessGlossary, url: PicpediaRoutePath.BusinessGlossary },
                { label: PicpediaRouteTitle.GlossaryMetrics, url: PicpediaRoutePath.GlossaryMetrics },
            ],
        });
    }
}
