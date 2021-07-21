import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { BusinessGlossaryService } from '../../../data-access/business-glossary/business-glossary.service';
import { BusinessGlossaryQuery } from '../../../data-access/business-glossary/business-glossary.query';
import { BusinessGlossaryDashboardsList } from '../../../models/business-glossary/dashboards-list.model';
import { bussinessGlossaryCard } from '../../../models/business-glossary/cards.model';

import { WithNavbar, BreadcrumbService, PicpediaRouteTitle, PicpediaRoutePath } from '@picpay/picpedia/shared';
import { subscribeUntil } from '@picpay/angular/shared/helpers';

@Component({
    selector: 'picpedia-dashboards-list',
    templateUrl: './dashboards-list.component.html',
    styleUrls: ['./dashboards-list.component.scss'],
})
export class DashboardsListComponent implements OnInit, WithNavbar {
    titleDashboardsList$: Observable<string>;
    isLoadingDashboards$: Observable<boolean>;
    dashboardsList$: Observable<BusinessGlossaryDashboardsList[]>;
    iconDashboards: string;

    constructor(
        private businessGlossaryService: BusinessGlossaryService,
        private businessGlossaryQuery: BusinessGlossaryQuery,
        private breadcrumbService: BreadcrumbService,
        private route: ActivatedRoute,
    ) {
        this.titleDashboardsList$ = this.businessGlossaryQuery.titleDashboardsList$;
        this.isLoadingDashboards$ = this.businessGlossaryQuery.isLoadingDisplay$;
        this.dashboardsList$ = this.businessGlossaryQuery.dashboardsList$;
    }

    ngOnInit(): void {
        this.getDashboardsListForId();
        this.getDashboardsList();
        this.startUpdateDashboardsList();
        this.updateBreadcrumbs();
        this.iconDashboards = this.getIconFromDashboardList();
    }

    // atualiza a listagem de dashboards após o update do favorito
    startUpdateDashboardsList(): void {
        this.businessGlossaryService.onDashboardsList
            .pipe(
                subscribeUntil(this),
                tap(() => {
                    this.getDashboardsList();
                }),
            )
            .subscribe();
    }

    getDashboardsListForId(): void {
        this.route.params
            .pipe(
                subscribeUntil(this),
                tap(params => this.businessGlossaryService.getDashboardsListItem(params.groupName)),
            ).subscribe();
    }

    getDashboardsList(): void {
        this.businessGlossaryService.getDashboardsList();
    }

    getIconFromDashboardList(): string {
        const iconItem = bussinessGlossaryCard.find(item => item.title === PicpediaRouteTitle.GlossaryDashboards);
        return iconItem.icon;
    }

    updateDashboardsListFavorite(item: boolean, id: number): void {
        this.businessGlossaryService.updateDashboardsListFavorite(item, id);
    }

    updateBreadcrumbs(): void {
        this.breadcrumbService.update({
            breadcrumbs: [
                { label: PicpediaRouteTitle.BusinessGlossary, url: PicpediaRoutePath.BusinessGlossary },
                { label: PicpediaRouteTitle.GlossaryDashboards, url: PicpediaRoutePath.GlossaryDashboards },
                { label: PicpediaRouteTitle.GlossaryDashboardsList, url: PicpediaRoutePath.GlossaryDashboardsList },
            ],
        });
    }
}
