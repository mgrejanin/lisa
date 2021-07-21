import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { BreadcrumbService, PicpediaRoutePath, PicpediaRouteTitle, WithNavbar } from '@picpay/picpedia/shared';

import { BusinessGlossaryQuery } from '../../data-access/business-glossary/business-glossary.query';
import { BusinessGlossaryService } from '../../data-access/business-glossary/business-glossary.service';
import { bussinessGlossaryCard } from '../../models/business-glossary/cards.model';
import { BusinessGlossaryModels } from '../../models/business-glossary/models.model';

@Component({
    selector: 'picpedia-business-glossary-models',
    templateUrl: './business-glossary-models.component.html',
    styleUrls: ['./business-glossary-models.component.scss'],
})
export class GlossaryModelsComponent implements OnInit, WithNavbar {
    iconModels: string;
    titleModels: PicpediaRouteTitle;

    models$: Observable<BusinessGlossaryModels[]>;
    isLoadingModels$: Observable<boolean>;

    constructor(
        private businessGlossaryService: BusinessGlossaryService,
        private businessGlossaryQuery: BusinessGlossaryQuery,
        private breadcrumbService: BreadcrumbService,
    ) {
        this.models$ = this.businessGlossaryQuery.models$;
        this.isLoadingModels$ = this.businessGlossaryQuery.isLoadingDisplay$;
        this.iconModels = this.getIconFromModelsList();
        this.titleModels = PicpediaRouteTitle.GlossaryModels;
    }

    ngOnInit(): void {
        this.getModelsCards();
        this.updateBreadcrumbs();
    }

    getModelsCards(): void {
        this.businessGlossaryService.getModelsCards();
    }

    getIconFromModelsList(): string {
        const iconItem = bussinessGlossaryCard.find(item => item.title === PicpediaRouteTitle.GlossaryModels);
        return iconItem.icon;
    }

    updateBreadcrumbs(): void {
        this.breadcrumbService.update({
            breadcrumbs: [
                { label: PicpediaRouteTitle.BusinessGlossary, url: PicpediaRoutePath.BusinessGlossary },
                { label: PicpediaRouteTitle.GlossaryModels, url: PicpediaRoutePath.GlossaryModels },
            ],
        });
    }
}
