import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * @param notAllowedRouteRedirectTo Rota pra onde o guard irá redirecionar caso o usuário logado não tenha acesso à rota solicitada
 */
export interface PicpayKeycloakConfig {
    realm: string;
    clientId: string;
    url: string;
    onLoad: Keycloak.KeycloakOnLoad;
    notAllowedRouteRedirectTo: string;
    withCallback?: boolean;
    loadUserProfileAtStartUp?: boolean;
}

export const PicpayKeycloakConfigService = new InjectionToken<PicpayKeycloakConfig>('PicpayKeycloakConfig');

export interface PicpayKeycloakCallback {
    callback(): Observable<unknown>;
}

export const PicpayKeycloakCallbackService = new InjectionToken<PicpayKeycloakCallback>('PicpayKeycloakCallback');
