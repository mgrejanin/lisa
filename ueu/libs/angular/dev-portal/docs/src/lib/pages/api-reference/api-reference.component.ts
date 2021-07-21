import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import * as SwaggerUI from 'swagger-ui';

import { DevPortalDataAccessConfig } from '@picpay/dev-portal/data-access';
import { AuthQuery, ContactFormComponent, Product, ProductsQuery, UiQuery } from '@picpay/dev-portal/shared';
import { EventTracking } from '@picpay/event-tracking';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { subscribeUntil } from '@picpay/angular/shared/helpers';

@Component({
    selector: 'dev-portal-api-reference',
    templateUrl: './api-reference.component.html',
    styleUrls: ['./api-reference.component.scss'],
})
export class ApiReferenceComponent implements OnInit {
    currentSlug: string;
    activeProduct$: Observable<Product>;
    products$: Observable<Product[]>;
    isMobile$: Observable<boolean>;
    activeProductApiUrl$: Observable<string>;
    docLoadSuccess$: Observable<boolean>;

    toggleMobile = {
        menu: false,
        cardsProducts: false,
    };

    constructor(
        private dialog: MatDialog,
        private authQuery: AuthQuery,
        private query: ProductsQuery,
        private uiQuery: UiQuery,
        private route: ActivatedRoute,
        private config: CoreDataAccessService<DevPortalDataAccessConfig>,
    ) {
        this.isMobile$ = this.uiQuery.isMobile$;

        // Get props from Akita
        this.products$ = this.query.products$;
        this.activeProduct$ = this.query.activeProduct$;
        this.activeProductApiUrl$ = this.query.activeProductApiUrl$;
        this.docLoadSuccess$ = this.query.docLoadSuccess$;
    }

    ngOnInit(): void {
        // Get documentation path from the router
        this.route.params.subscribe(params => {
            this.currentSlug = params.slug;
            EventTracking.page('Page Viewed', {
                page_name: `STUDIO_PICPAY_${params.slug?.toLocaleUpperCase()}`,
                context: params.slug?.toLocaleUpperCase(),
            });
        });

        this.activeProductApiUrl$
            .pipe(subscribeUntil(this))
            .subscribe((apiUrl: string) => this.initateSwaggerComponent(apiUrl, this.config.getConfig().apiKey));
    }

    // Creates the swagger UI component. See doc for more info: https://github.com/swagger-api/swagger-ui
    initateSwaggerComponent(apiUrl: string, apiKey: string): void {
        if (apiUrl) {
            SwaggerUI({
                dom_id: '#swagger-editor',
                layout: 'BaseLayout',
                presets: [SwaggerUI.presets.apis, SwaggerUI.SwaggerUIStandalonePreset],
                url: `${apiUrl}`,
                tagsSorter: 'alpha',
                docExpansion: 'full',
                showExtensions: true,
                defaultModelExpandDepth: 3,
                operationsSorter: 'alpha',
                syntaxHighlight: {
                    activate: true,
                    theme: 'tomorrow-night',
                },
                requestInterceptor(request) {
                    request.headers = { ...request.headers, 'Api-Key': apiKey };
                    return request;
                },
            });
        }
    }

    // Open the material UI dialog with fullscreen on mobile (see the dev-portal app styles for more insight)
    openDialog(): void {
        const slug = this.currentSlug?.toLocaleUpperCase();
        EventTracking.track(`Button Clicked`, {
            button_name: `BOTAO_CONTATO_${slug}`,
            page_name: `STUDIO_PICPAY_${slug}`,
            context: `${slug}`,
        });

        this.dialog.open(ContactFormComponent, {
            maxWidth: '100vw',
            maxHeight: '100vh',
            panelClass: 'modal-control',
            data: {
                user: this.authQuery.getValue().logged ? this.authQuery.getValue().user : null,
                slug: this.currentSlug,
                doc: 'external',
            },
        });
    }

    openProducts(context?: string) {
        const ctx = context?.toLocaleUpperCase();
        this.toggleMobile.cardsProducts = !this.toggleMobile.cardsProducts;
        EventTracking.track(`Button Clicked`, {
            button_name: `BOTAO_CARD_${ctx}`,
            page_name: `STUDIO_PICPAY_${ctx}`,
            context: `${ctx}`,
        });
    }
}
