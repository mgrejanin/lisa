import { Inject, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import {
    PicpayKeycloakCallbackService,
    PicpayKeycloakConfig,
    PicpayKeycloakConfigService,
} from './picpay-keycloak.config';
import { from, Observable, of } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { PicpayKeycloakProfile } from './models/keycloak-profile.model';

@Injectable()
export class PicpayKeycloakService {
    private get router() {
        return this.injector.get(Router);
    }

    private get keycloakCallbackService() {
        return this.injector.get(PicpayKeycloakCallbackService);
    }

    constructor(
        @Inject(Injector) private injector: Injector,
        @Inject(PicpayKeycloakConfigService) private config: PicpayKeycloakConfig,
        private keycloak: KeycloakService,
    ) {}

    initKeycloak() {
        from(
            this.keycloak.init({
                config: {
                    url: this.config.url,
                    realm: this.config.realm,
                    clientId: this.config.clientId,
                },
                initOptions: {
                    onLoad: this.config.onLoad,
                    silentCheckSsoRedirectUri: `${window.location.origin}/assets/keycloak/silent-check-sso.html`,
                    redirectUri: `${window.location.href}`,
                },
                loadUserProfileAtStartUp:
                    this.config.loadUserProfileAtStartUp !== undefined ? this.config.loadUserProfileAtStartUp : true,
            }),
        )
            .pipe(
                switchMap(res => {
                    if (res && this.config.withCallback) {
                        return this.keycloakCallbackService.callback();
                    }

                    return of(res);
                }),
                finalize(() => {
                    this.router.initialNavigation();
                }),
            )
            .subscribe();
    }

    getConfig(): PicpayKeycloakConfig {
        return this.config;
    }

    getUserRoles(): string[] {
        return this.keycloak.getUserRoles();
    }

    getToken(): Observable<string> {
        return from(this.keycloak.getToken());
    }

    logout(redirectUri?: string): Promise<void> {
        return this.keycloak.logout(redirectUri);
    }

    isLoggedIn(): Observable<boolean> {
        return from(this.keycloak.isLoggedIn());
    }

    /**
     * Use this method only if you are using the onLoad = 'login-required' option.
     * If you used the option onLoad = 'check-sso', use the loadUserProfile method.
     */
    getUserProfile<T>(): PicpayKeycloakProfile<T> {
        return this.keycloak.getKeycloakInstance().profile as PicpayKeycloakProfile<T>;
    }

    loadUserProfile<T>(): Observable<PicpayKeycloakProfile<T>> {
        return from(this.keycloak.loadUserProfile()).pipe(
            switchMap(userProfile => {
                // Workaroud to add userId in userProfile. More info in: https://github.com/mauriciovigolo/keycloak-angular/issues/30
                userProfile.id = this.keycloak.getKeycloakInstance().subject;
                return of(userProfile as PicpayKeycloakProfile<T>);
            }),
        );
    }
}
