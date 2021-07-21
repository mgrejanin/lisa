import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { BreadcrumbService, PicpediaRoutePath, PicpediaRouteTitle, WithNavbar } from '@picpay/picpedia/shared';

import { BusinessGlossaryQuery } from '../../data-access/business-glossary/business-glossary.query';
import { BusinessGlossaryService } from '../../data-access/business-glossary/business-glossary.service';
import { bussinessGlossaryCard } from '../../models/business-glossary/cards.model';
import { BusinessGlossaryDashboards } from '../../models/business-glossary/dashboards.model';

@Component({
    selector: 'picpedia-business-glossary-dashboards',
    templateUrl: './business-glossary-dashboards.component.html',
    styleUrls: ['./business-glossary-dashboards.component.scss'],
})
export class GlossaryDashboardsComponent implements OnInit, WithNavbar {
    iconDashboards: string;
    titleDashboards: PicpediaRouteTitle;

    dashboards$: Observable<BusinessGlossaryDashboards[]>;
    isLoadingDashboards$: Observable<boolean>;

    constructor(
        private businessGlossaryService: BusinessGlossaryService,
        private businessGlossaryQuery: BusinessGlossaryQuery,
        private breadcrumbService: BreadcrumbService,
    ) {
        this.dashboards$ = this.businessGlossaryQuery.dashboards$;
        this.isLoadingDashboards$ = this.businessGlossaryQuery.isLoadingDisplay$;
        this.iconDashboards = this.getIconFromDashboardList();
        this.titleDashboards = PicpediaRouteTitle.GlossaryDashboards;
    }

    ngOnInit(): void {
        this.getDashboardsCards();
        this.updateBreadcrumbs();
    }

    getDashboardsCards(): void {
        this.businessGlossaryService.getDashboardsCards();
    }

    getIconFromDashboardList(): string {
        const iconItem = bussinessGlossaryCard.find(item => item.title === PicpediaRouteTitle.GlossaryDashboards);
        return iconItem.icon;
    }

    updateBreadcrumbs(): void {
        this.breadcrumbService.update({
            breadcrumbs: [
                { label: PicpediaRouteTitle.BusinessGlossary, url: PicpediaRoutePath.BusinessGlossary },
                { label: PicpediaRouteTitle.GlossaryDashboards, url: PicpediaRoutePath.GlossaryDashboards },
            ],
        });
    }
}
