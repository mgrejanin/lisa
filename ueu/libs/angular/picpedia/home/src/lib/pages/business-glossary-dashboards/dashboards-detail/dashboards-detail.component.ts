import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { DashboardsDetailService } from '../../../data-access/business-glossary/dashboards-detail/dashboards-detail.service';
import { DashboardsDetailQuery } from '../../../data-access/business-glossary/dashboards-detail/dashboards-detail.query';
import { BusinessGlossaryDashboardsDetailTags } from '../../../models/business-glossary/dashboards-detail/tags.model';
import { BusinessGlossaryDashboardsDetailSteward } from '../../../models/business-glossary/dashboards-detail/steward.model';
import { BusinessGlossaryDashboardsDetailOwner } from '../../../models/business-glossary/dashboards-detail/owner.model';
import { BusinessGlossaryDashboardsDetailUsers } from '../../../models/business-glossary/dashboards-detail/users.model';

import { WithNavbar, BreadcrumbService, PicpediaRouteTitle, PicpediaRoutePath } from '@picpay/picpedia/shared';
import { getOriginalRoutePathUrlByReplacingParamValues } from '@picpay/picpedia/shared';
import { getCurrentUrlPathReplacingParamValues } from '@picpay/picpedia/shared';
import { subscribeUntil } from '@picpay/angular/shared/helpers';

@Component({
    selector: 'picpedia-dashboards-detai',
    templateUrl: './dashboards-detail.component.html',
    styleUrls: ['./dashboards-detail.component.scss'],
})
export class DashboardsDetailComponent implements OnInit, WithNavbar {
    isLoadingDashboards$: Observable<boolean>;
    titleDashboardsDetail$: Observable<string>;
    descriptionDashboardsDetail$: Observable<string>;
    dateDashboardsDetail$: Observable<string>;
    frequencyDashboardsDetail$: Observable<string>;
    scopeDashboardsDetail$: Observable<string>;
    tagsDashboardsDetail$: Observable<BusinessGlossaryDashboardsDetailTags[]>;
    originDashboardsDetail$: Observable<string>;
    stewardDashboardsDetail$: Observable<BusinessGlossaryDashboardsDetailSteward[]>;
    ownerDashboardsDetail$: Observable<BusinessGlossaryDashboardsDetailOwner[]>;
    usersDashboardsDetail$: Observable<BusinessGlossaryDashboardsDetailUsers[]>;
    badgeDashboardsDetail$: Observable<string>;

    lookerDashboardsDetail: string;
    currentRouteUrlPath: string;
    currentUrlPathReplace: string;

    @ViewChild('iframeLooker', { static: true }) iframeLooker: ElementRef<HTMLElement>;

    constructor(
        private dashboardsDetailService: DashboardsDetailService,
        private dashboardsDetailQuery: DashboardsDetailQuery,
        private breadcrumbService: BreadcrumbService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
    ) {
        this.isLoadingDashboards$ = this.dashboardsDetailQuery.isLoadingDisplay$;
        this.titleDashboardsDetail$ = this.dashboardsDetailQuery.titleDashboardsDetail$;
        this.descriptionDashboardsDetail$ = this.dashboardsDetailQuery.descriptionDashboardsDetail$;
        this.dateDashboardsDetail$ = this.dashboardsDetailQuery.dateDashboardsDetail$;
        this.frequencyDashboardsDetail$ = this.dashboardsDetailQuery.frequencyDashboardsDetail$;
        this.scopeDashboardsDetail$ = this.dashboardsDetailQuery.scopeDashboardsDetail$;
        this.tagsDashboardsDetail$ = this.dashboardsDetailQuery.tagsDashboardsDetail$;
        this.originDashboardsDetail$ = this.dashboardsDetailQuery.originDashboardsDetail$;
        this.stewardDashboardsDetail$ = this.dashboardsDetailQuery.stewardDashboardsDetail$;
        this.ownerDashboardsDetail$ = this.dashboardsDetailQuery.ownerDashboardsDetail$;
        this.usersDashboardsDetail$ = this.dashboardsDetailQuery.usersDashboardsDetail$;
        this.badgeDashboardsDetail$ = this.dashboardsDetailQuery.badgeDashboardsDetail$;

        const urlRouterWithoutBar = this.router.url.substring(1, this.router.url.length);
        this.currentRouteUrlPath = this.getCurrentUrlPath(this.activatedRoute.snapshot.params, urlRouterWithoutBar);
        this.currentUrlPathReplace = this.getCurrentUrlPathReplace(this.activatedRoute.snapshot.params, urlRouterWithoutBar);
    }

    ngOnInit(): void {
        this.getDashboardsDetailForId();
        this.updateBreadcrumbs();
    }

    getDashboardsDetailForId(): void {
        this.activatedRoute.params
            .pipe(
                subscribeUntil(this),
                tap(params => this.dashboardsDetailService.getDashboardsDetail(params.dashboardName)),
            )
            .subscribe();
    }

    updateBreadcrumbs(): void {
        this.breadcrumbService.update({
            breadcrumbs: [
                { label: PicpediaRouteTitle.BusinessGlossary, url: PicpediaRoutePath.BusinessGlossary },
                { label: PicpediaRouteTitle.GlossaryDashboards, url: PicpediaRoutePath.GlossaryDashboards },
                { label: PicpediaRouteTitle.GlossaryDashboardsList, url: this.currentUrlPathReplace },
                { label: PicpediaRouteTitle.GlossaryDashboardsDetail, url: this.currentRouteUrlPath },
            ],
        });
    }

    getCurrentUrlPath(params: Params, currentUrlPath: string): string {
        return params ? getOriginalRoutePathUrlByReplacingParamValues(currentUrlPath, params) : currentUrlPath;
    }

    getCurrentUrlPathReplace(params: Params, currentUrlPath: string): string {
        return params ? getCurrentUrlPathReplacingParamValues(currentUrlPath, params) : currentUrlPath;
    }

    tabClick(event: number): void {
        this.dashboardsDetailQuery.lookerDashboardsDetail$
            .pipe(
                subscribeUntil(this),
                tap(response =>
                    response.map(item =>
                        this.lookerDashboardsDetail = item.dashboard_name
                    )
                )
            )
            .subscribe();

        if (event === 1) {
            this.iframeLooker.nativeElement.setAttribute('src',`${this.lookerDashboardsDetail}`);
        }
    }
}
