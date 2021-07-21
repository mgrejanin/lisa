import { PicpayKeycloakConfig } from '../picpay-keycloak.config';

export const keycloakConfigMock: PicpayKeycloakConfig = {
    clientId: 'testClient',
    realm: 'testRealm',
    url: 'testUrl',
    onLoad: 'login-required',
    notAllowedRouteRedirectTo: '/test',
    loadUserProfileAtStartUp: true,
};

export const keycloakConfigWithCallbackMock: PicpayKeycloakConfig = { ...keycloakConfigMock, withCallback: true };
