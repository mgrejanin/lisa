import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { subscribeUntil } from '@picpay/angular/shared/helpers';
import { BreadcrumbService, PicpediaRoutePath, PicpediaRouteTitle, WithNavbar } from '@picpay/picpedia/shared';

import { BusinessGlossaryQuery } from '../../../data-access/business-glossary/business-glossary.query';
import { BusinessGlossaryService } from '../../../data-access/business-glossary/business-glossary.service';
import { bussinessGlossaryCard } from '../../../models/business-glossary/cards.model';
import { BusinessGlossaryModelsList } from '../../../models/business-glossary/models-list.model';

@Component({
    selector: 'picpedia-models-list',
    templateUrl: './models-list.component.html',
    styleUrls: ['./models-list.component.scss'],
})
export class ModelsListComponent implements OnInit, WithNavbar {
    titleModelsList$: Observable<string>;
    isLoadingModels$: Observable<boolean>;
    modelsList$: Observable<BusinessGlossaryModelsList[]>;
    iconModels: string;

    constructor(
        private businessGlossaryService: BusinessGlossaryService,
        private businessGlossaryQuery: BusinessGlossaryQuery,
        private breadcrumbService: BreadcrumbService,
        private route: ActivatedRoute,
    ) {
        this.titleModelsList$ = this.businessGlossaryQuery.titleModelsList$;
        this.isLoadingModels$ = this.businessGlossaryQuery.isLoadingDisplay$;
        this.modelsList$ = this.businessGlossaryQuery.modelsList$;
    }

    ngOnInit(): void {
        this.getModelsListForId();
        this.getModelsList();
        this.startUpdateModelsList();
        this.updateBreadcrumbs();
        this.iconModels = this.getIconFromModelsList();
    }

    // atualiza a listagem de modelos após o update do favorito
    startUpdateModelsList(): void {
        this.businessGlossaryService.onDashboardsList
            .pipe(
                subscribeUntil(this),
                tap(() => {
                    this.getModelsList();
                }),
            )
            .subscribe();
    }

    getModelsListForId(): void {
        this.route.params
            .pipe(
                subscribeUntil(this),
                tap(params => this.businessGlossaryService.getModelsListItem(params.groupName)),
            ).subscribe();
    }

    getModelsList(): void {
        this.businessGlossaryService.getModelsList();
    }

    getIconFromModelsList(): string {
        const iconItem = bussinessGlossaryCard.find(item => item.title === PicpediaRouteTitle.GlossaryModels);
        return iconItem.icon;
    }

    updateModelsListFavorite(item: boolean, id: number): void {
        this.businessGlossaryService.updateDashboardsListFavorite(item, id);
    }

    updateBreadcrumbs(): void {
        this.breadcrumbService.update({
            breadcrumbs: [
                { label: PicpediaRouteTitle.BusinessGlossary, url: PicpediaRoutePath.BusinessGlossary },
                { label: PicpediaRouteTitle.GlossaryModels, url: PicpediaRoutePath.GlossaryModels },
                { label: PicpediaRouteTitle.GlossaryModelsList, url: PicpediaRoutePath.GlossaryModelsList },
            ],
        });
    }
}
