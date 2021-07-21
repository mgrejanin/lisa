import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { MetricsDetailService } from '../../../data-access/business-glossary/metrics-detail/metrics-detail.service';
import { MetricsDetailQuery } from '../../../data-access/business-glossary/metrics-detail/metrics-detail.query';
import { BusinessGlossaryDashboardsDetailTags } from '../../../models/business-glossary/dashboards-detail/tags.model';
import { BusinessGlossaryDashboardsDetailSteward } from '../../../models/business-glossary/dashboards-detail/steward.model';
import { BusinessGlossaryDashboardsDetailOwner } from '../../../models/business-glossary/dashboards-detail/owner.model';
import { BusinessGlossaryDashboardsDetailUsers } from '../../../models/business-glossary/dashboards-detail/users.model';

import { WithNavbar, BreadcrumbService, PicpediaRouteTitle, PicpediaRoutePath } from '@picpay/picpedia/shared';
import { getOriginalRoutePathUrlByReplacingParamValues } from '@picpay/picpedia/shared';
import { getCurrentUrlPathReplacingParamValues } from '@picpay/picpedia/shared';
import { subscribeUntil } from '@picpay/angular/shared/helpers';

@Component({
    selector: 'picpedia-metrics-detail',
    templateUrl: './metrics-detail.component.html',
    styleUrls: ['./metrics-detail.component.scss'],
})
export class MetricsDetailComponent implements OnInit, WithNavbar {
    isLoadingMetrics$: Observable<boolean>;
    titleMetricsDetail$: Observable<string>;
    descriptionMetricsDetail$: Observable<string>;
    ruleMetricsDetail$: Observable<string>;
    tagsMetricsDetail$: Observable<BusinessGlossaryDashboardsDetailTags[]>;
    stewardMetricsDetail$: Observable<BusinessGlossaryDashboardsDetailSteward[]>;
    ownerMetricsDetail$: Observable<BusinessGlossaryDashboardsDetailOwner[]>;
    usersMetricsDetail$: Observable<BusinessGlossaryDashboardsDetailUsers[]>;
    badgeMetricsDetail$: Observable<string>;

    currentRouteUrlPath: string;
    currentUrlPathReplace: string;

    constructor(
        private metricsDetailService: MetricsDetailService,
        private metricsDetailQuery: MetricsDetailQuery,
        private breadcrumbService: BreadcrumbService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
    ) {
        this.isLoadingMetrics$ = this.metricsDetailQuery.isLoadingDisplay$;
        this.titleMetricsDetail$ = this.metricsDetailQuery.titleMetricsDetail$;
        this.descriptionMetricsDetail$ = this.metricsDetailQuery.descriptionMetricsDetail$;
        this.ruleMetricsDetail$ = this.metricsDetailQuery.ruleMetricsDetail$;
        this.tagsMetricsDetail$ = this.metricsDetailQuery.tagsMetricsDetail$;
        this.stewardMetricsDetail$ = this.metricsDetailQuery.stewardMetricsDetail$;
        this.ownerMetricsDetail$ = this.metricsDetailQuery.ownerMetricsDetail$;
        this.usersMetricsDetail$ = this.metricsDetailQuery.usersMetricsDetail$;
        this.badgeMetricsDetail$ = this.metricsDetailQuery.badgeMetricsDetail$;

        const urlRouterWithoutBar = this.router.url.substring(1, this.router.url.length);
        this.currentRouteUrlPath = this.getCurrentUrlPath(this.activatedRoute.snapshot.params, urlRouterWithoutBar);
        this.currentUrlPathReplace = this.getCurrentUrlPathReplace(this.activatedRoute.snapshot.params, urlRouterWithoutBar);
    }

    ngOnInit(): void {
        this.getMetricsDetailForId();
        this.updateBreadcrumbs();
    }

    getMetricsDetailForId(): void {
        this.activatedRoute.params
            .pipe(
                subscribeUntil(this),
                tap(params => this.metricsDetailService.getMetricsDetail(params.dashboardName)),
            )
            .subscribe();
    }

    updateBreadcrumbs(): void {
        this.breadcrumbService.update({
            breadcrumbs: [
                { label: PicpediaRouteTitle.BusinessGlossary, url: PicpediaRoutePath.BusinessGlossary },
                { label: PicpediaRouteTitle.GlossaryMetrics, url: PicpediaRoutePath.GlossaryMetrics },
                { label: PicpediaRouteTitle.GlossaryMetricsList, url: this.currentUrlPathReplace },
                { label: PicpediaRouteTitle.GlossaryMetricsDetail, url: this.currentRouteUrlPath },
            ],
        });
    }

    getCurrentUrlPath(params: Params, currentUrlPath: string): string {
        return params ? getOriginalRoutePathUrlByReplacingParamValues(currentUrlPath, params) : currentUrlPath;
    }

    getCurrentUrlPathReplace(params: Params, currentUrlPath: string): string {
        return params ? getCurrentUrlPathReplacingParamValues(currentUrlPath, params) : currentUrlPath;
    }
}
