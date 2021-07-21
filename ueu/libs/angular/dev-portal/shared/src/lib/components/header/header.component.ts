import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { EventTracking } from '@picpay/event-tracking';

import { Product, User } from '../../models';
import { ProductsQuery } from '../../data-access/products/products.query';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { DevPortalDataAccessConfig } from '../../data-access/dev-portal-data-access.config';
import { PicpayKeycloakProfile, PicpayKeycloakService } from '@picpay/keycloak';
import { AuthQuery } from '../../data-access/auth/auth.query';

@Component({
    selector: 'dev-portal-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    readonly user$: Observable<PicpayKeycloakProfile<User>>;
    readonly products$: Observable<Product[]>;
    readonly logged$: Observable<boolean>;
    readonly isLoading$: Observable<boolean>;
    private currentSlug: string;
    private isProduction = new BehaviorSubject<boolean>(false);
    isProduction$ = this.isProduction.asObservable();

    constructor(
        private authQuery: AuthQuery,
        private query: ProductsQuery,
        private router: Router,
        private route: ActivatedRoute,
        private config: CoreDataAccessService<DevPortalDataAccessConfig>,
        private keycloak: PicpayKeycloakService,
    ) {
        this.products$ = this.query.products$;
        this.isLoading$ = this.query.selectLoading();
        this.user$ = this.authQuery.user$;
        this.logged$ = this.authQuery.logged$;
        this.isProduction.next(this.config.getConfig().isProd);
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.currentSlug = params.slug;
        });
    }

    eventTracking(button_name?: string, context?: string) {
        const ctx = context.toLocaleUpperCase();
        const btn_name = button_name.toLocaleUpperCase();
        const page_name = this.currentSlug ? `_${this.currentSlug.toLocaleUpperCase()}` : ``;
        EventTracking.track('Button Clicked', {
            button_name: `BOTAO_${btn_name}_${ctx}`,
            page_name: `STUDIO_PICPAY${page_name}`,
            context: ctx,
        });
    }

    async onLogout() {
        if (this.authQuery.getValue().logged) {
            await this.keycloak.logout(`${this.config.getConfig().studioUrl}${this.router.routerState.snapshot.url}`);
        }
    }
}
