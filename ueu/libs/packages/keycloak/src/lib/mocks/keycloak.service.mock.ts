import { KeycloakOptions } from 'keycloak-angular';
import { Observable, of } from 'rxjs';
import { keycloakConfigMock } from './picpay-keycloak.config.mock';
import { PicpayKeycloakProfile } from '../models/keycloak-profile.model';

export const getTokenResponse = 'testToken';
export const initParams: KeycloakOptions = {
    config: {
        url: keycloakConfigMock.url,
        realm: keycloakConfigMock.realm,
        clientId: keycloakConfigMock.clientId,
    },
    initOptions: {
        onLoad: keycloakConfigMock.onLoad,
        silentCheckSsoRedirectUri: `${window.location.origin}/assets/keycloak/silent-check-sso.html`,
        redirectUri: `${window.location.href}`,
    },
    loadUserProfileAtStartUp: keycloakConfigMock.loadUserProfileAtStartUp,
};
export const userProfileMock: PicpayKeycloakProfile = {
    email: 'test@picpay.com',
    firstName: 'test',
    lastName: 'user',
};

export class KeycloakServiceMock {
    private readonly userLogged: boolean;
    private readonly userRoles: string[];

    constructor(userLogged: boolean, userRoles: string[]) {
        this.userLogged = userLogged;
        this.userRoles = userRoles;
    }

    async init(options?: KeycloakOptions): Promise<boolean> {
        options;
        return of(true).toPromise();
    }

    async isLoggedIn(): Promise<boolean> {
        return of(this.userLogged).toPromise();
    }

    getUserRoles(): string[] {
        return this.userRoles;
    }

    getToken(): Observable<string> {
        return of(getTokenResponse);
    }

    async login(): Promise<void> {
        return of(null).toPromise();
    }

    loadUserProfile(): Observable<Keycloak.KeycloakProfile> {
        return of({} as Keycloak.KeycloakProfile);
    }

    async logout(): Promise<void> {
        return of(null).toPromise();
    }

    getKeycloakInstance(): Keycloak.KeycloakInstance {
        return { profile: userProfileMock } as Keycloak.KeycloakInstance;
    }
}
