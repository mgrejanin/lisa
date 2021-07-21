import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ModelsDetailService } from '../../../data-access/business-glossary/models-detail/models-detail.service';
import { ModelsDetailQuery } from '../../../data-access/business-glossary/models-detail/models-detail.query';
import { BusinessGlossaryDashboardsDetailTags } from '../../../models/business-glossary/dashboards-detail/tags.model';
import { BusinessGlossaryDashboardsDetailSteward } from '../../../models/business-glossary/dashboards-detail/steward.model';
import { BusinessGlossaryDashboardsDetailOwner } from '../../../models/business-glossary/dashboards-detail/owner.model';
import { BusinessGlossaryDashboardsDetailUsers } from '../../../models/business-glossary/dashboards-detail/users.model';

import { WithNavbar, BreadcrumbService, PicpediaRouteTitle, PicpediaRoutePath } from '@picpay/picpedia/shared';
import { getOriginalRoutePathUrlByReplacingParamValues } from '@picpay/picpedia/shared';
import { getCurrentUrlPathReplacingParamValues } from '@picpay/picpedia/shared';
import { subscribeUntil } from '@picpay/angular/shared/helpers';

@Component({
    selector: 'picpedia-models-detail',
    templateUrl: './models-detail.component.html',
    styleUrls: ['./models-detail.component.scss'],
})
export class ModelsDetailComponent implements OnInit, WithNavbar {
    isLoadingModels$: Observable<boolean>;
    titleModelsDetail$: Observable<string>;
    descriptionModelsDetail$: Observable<string>;
    resultModelsDetail$: Observable<string>;
    projectModelsDetail$: Observable<string>;
    timesIaModelsDetail$: Observable<string>;
    timeImpactedModelsDetail$: Observable<string>;
    tagsModelsDetail$: Observable<BusinessGlossaryDashboardsDetailTags[]>;
    stewardModelsDetail$: Observable<BusinessGlossaryDashboardsDetailSteward[]>;
    ownerModelsDetail$: Observable<BusinessGlossaryDashboardsDetailOwner[]>;
    usersModelsDetail$: Observable<BusinessGlossaryDashboardsDetailUsers[]>;
    badgeModelsDetail$: Observable<string>;

    currentRouteUrlPath: string;
    currentUrlPathReplace: string;

    constructor(
        private modelsDetailService: ModelsDetailService,
        private modelsDetailQuery: ModelsDetailQuery,
        private breadcrumbService: BreadcrumbService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
    ) {
        this.isLoadingModels$ = this.modelsDetailQuery.isLoadingDisplay$;
        this.titleModelsDetail$ = this.modelsDetailQuery.titleModelsDetail$;
        this.descriptionModelsDetail$ = this.modelsDetailQuery.descriptionModelsDetail$;
        this.resultModelsDetail$ = this.modelsDetailQuery.resultModelsDetail$;
        this.projectModelsDetail$ = this.modelsDetailQuery.projectModelsDetail$;
        this.timesIaModelsDetail$ = this.modelsDetailQuery.timesIaModelsDetail$;
        this.timeImpactedModelsDetail$ = this.modelsDetailQuery.timeImpactedModelsDetail$;
        this.tagsModelsDetail$ = this.modelsDetailQuery.tagsModelsDetail$;
        this.stewardModelsDetail$ = this.modelsDetailQuery.stewardModelsDetail$;
        this.ownerModelsDetail$ = this.modelsDetailQuery.ownerModelsDetail$;
        this.usersModelsDetail$ = this.modelsDetailQuery.usersModelsDetail$;
        this.badgeModelsDetail$ = this.modelsDetailQuery.badgeModelsDetail$;

        const urlRouterWithoutBar = this.router.url.substring(1, this.router.url.length);
        this.currentRouteUrlPath = this.getCurrentUrlPath(this.activatedRoute.snapshot.params, urlRouterWithoutBar);
        this.currentUrlPathReplace = this.getCurrentUrlPathReplace(this.activatedRoute.snapshot.params, urlRouterWithoutBar);
    }

    ngOnInit(): void {
        this.getModelsDetailForId();
        this.updateBreadcrumbs();
    }

    getModelsDetailForId(): void {
        this.activatedRoute.params
            .pipe(
                subscribeUntil(this),
                tap(params => this.modelsDetailService.getModelsDetail(params.dashboardName)),
            )
            .subscribe();
    }

    updateBreadcrumbs(): void {
        this.breadcrumbService.update({
            breadcrumbs: [
                { label: PicpediaRouteTitle.BusinessGlossary, url: PicpediaRoutePath.BusinessGlossary },
                { label: PicpediaRouteTitle.GlossaryModels, url: PicpediaRoutePath.GlossaryModels },
                { label: PicpediaRouteTitle.GlossaryModelsList, url: this.currentUrlPathReplace },
                { label: PicpediaRouteTitle.GlossaryModelsDetail, url: this.currentRouteUrlPath },
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
