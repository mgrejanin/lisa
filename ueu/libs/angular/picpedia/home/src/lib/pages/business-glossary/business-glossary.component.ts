import { Component, OnInit } from '@angular/core';
import { BreadcrumbService, PicpediaRoutePath, PicpediaRouteTitle, WithNavbar } from '@picpay/picpedia/shared';

import { bussinessGlossaryCard, PicpediaCardsGlossary } from '../../models/business-glossary/cards.model';

@Component({
    selector: 'picpedia-business-glossary',
    templateUrl: './business-glossary.component.html',
    styleUrls: ['./business-glossary.component.scss'],
})
export class BusinessGlossaryComponent implements OnInit, WithNavbar {
    cardsGlossary: PicpediaCardsGlossary[];
    titleGlossary: PicpediaRouteTitle;

    constructor(private breadcrumbService: BreadcrumbService) {
        this.cardsGlossary = bussinessGlossaryCard;
        this.titleGlossary = PicpediaRouteTitle.BusinessGlossary;
    }

    ngOnInit() {
        this.updateBreadcrumbs();
    }

    updateBreadcrumbs(): void {
        this.breadcrumbService.update({
            breadcrumbs: [{ label: PicpediaRouteTitle.BusinessGlossary, url: PicpediaRoutePath.BusinessGlossary }],
        });
    }
}
