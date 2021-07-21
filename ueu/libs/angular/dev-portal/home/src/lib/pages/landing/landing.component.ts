import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Panel, Product, ProductsQuery, slugify, UiQuery } from '@picpay/dev-portal/shared';
import { EventTracking } from '@picpay/event-tracking';

enum ColorPanel {
    'Painel Lojista' = '#349DCE',
    'Painel E-commerce' = '',
    'Assinaturas' = '#26cc98',
}
@Component({
    selector: 'dev-portal-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit, OnDestroy {
    readonly products$: Observable<Product[]>;
    readonly panels$: Observable<Panel[]>;
    readonly isMobile$: Observable<boolean>;
    readonly isLoading$: Observable<boolean>;

    private unsubscribe$: Subject<void>;

    colorPanel = ColorPanel;

    constructor(private query: ProductsQuery, private uiQuery: UiQuery) {
        this.products$ = this.query.products$;
        this.panels$ = this.query.panels$;
        this.isMobile$ = this.uiQuery.isMobile$;
        this.isLoading$ = this.query.selectLoading();
        this.unsubscribe$ = new Subject();
    }

    ngOnInit() {
        EventTracking.page('Page Viewed', {
            page_name: 'STUDIO_PICPAY',
            context: 'STUDIO',
        });
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    eventTracking(button_name?: string, context?: string) {
        const ctx = context?.toLocaleUpperCase();
        const btn_name = button_name?.toLocaleUpperCase();
        EventTracking.track('Button Clicked', {
            button_name: `BOTAO_${btn_name}_${ctx}`,
            page_name: 'STUDIO_PICPAY',
            context: ctx,
        });
    }

    convertToSlug(value: string): string {
        return slugify(value);
    }
}
