export interface PicpayKeycloakProfile<T = unknown> extends Keycloak.KeycloakProfile {
    attributes?: T;
}
