import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivateChild,
    CanLoad,
    Router,
    RouterStateSnapshot,
    UrlSegment,
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { PicpayKeycloakService } from './picpay-keycloak.service';
import { from, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class PicpayKeycloakGuard extends KeycloakAuthGuard implements CanLoad, CanActivateChild {
    constructor(
        protected readonly router: Router,
        protected readonly keycloak: KeycloakService,
        private keycloakService: PicpayKeycloakService,
    ) {
        super(router, keycloak);
    }

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
        return this.canAccess(
            route as ActivatedRouteSnapshot,
            `${window.location.origin}/${segments.map(segment => segment.path).join('/')}`,
        );
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.canAccess(route, `${window.location.origin}${state.url}`);
    }

    async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return this.canAccess(route, `${window.location.origin}${state.url}`).toPromise();
    }

    canAccess(route: ActivatedRouteSnapshot, redirectUri: string): Observable<boolean> {
        return from(this.keycloakAngular.isLoggedIn()).pipe(
            switchMap(isLoggedIn => {
                if (isLoggedIn) {
                    return of(true);
                }
                return this.keycloakAngular.login({
                    redirectUri,
                });
            }),
            map(isLoggedIn => {
                if (!isLoggedIn) {
                    return false;
                }

                const requiredRoles = route.data?.roles;
                if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
                    return true;
                }

                const isAccessAllowed = requiredRoles.some(role => this.keycloakAngular.getUserRoles().includes(role));

                if (!isAccessAllowed) {
                    from(this.router.navigate([this.keycloakService.getConfig().notAllowedRouteRedirectTo]));
                }

                return isAccessAllowed;
            }),
        );
    }
}
