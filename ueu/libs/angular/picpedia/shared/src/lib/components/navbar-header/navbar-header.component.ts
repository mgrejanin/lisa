import { Observable } from 'rxjs';

import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Breadcrumb } from '../../data-access/breadcrumb/breadcrumb.model';
import { BreadcrumbQuery } from '../../data-access/breadcrumb/breadcrumb.query';
import { getOriginalRoutePathUrlByReplacingParamValues } from '../../helpers';
import { PicpayKeycloakService } from '@picpay/keycloak';

@Component({
    selector: 'picpedia-navbar-header',
    templateUrl: './navbar-header.component.html',
    styleUrls: ['./navbar-header.component.scss'],
})
export class NavbarHeaderComponent {
    @Input() title = '';
    @Input() showReturnButton = true;
    @Input() showBreadcrumbs = true;

    breadcrumbs$: Observable<Breadcrumb[]>;
    currentRouteUrlPath: string;
    user$: Observable<Keycloak.KeycloakProfile>;

    constructor(
        private location: Location,
        private router: Router,
        private activatedRouter: ActivatedRoute,
        private breadcrumbQuery: BreadcrumbQuery,
        private keycloakService: PicpayKeycloakService,
    ) {
        this.breadcrumbs$ = this.breadcrumbQuery.breadcrumbs$;

        const urlRouterWithoutBar = this.router.url.substring(1, this.router.url.length);
        this.currentRouteUrlPath = this.getFormattedCurrentRouteUrlPath(this.activatedRouter.snapshot.params, urlRouterWithoutBar);
        this.user$ = this.keycloakService.loadUserProfile();
    }

    async handleLogout() {
        await this.keycloakService.logout();
    }

    onReturnButtonClick(): void {
        this.location.back();
    }

    getFormattedCurrentRouteUrlPath(params: Params, currentUrlPath: string): string {
        return params ? getOriginalRoutePathUrlByReplacingParamValues(currentUrlPath, params) : currentUrlPath;
    }
}
