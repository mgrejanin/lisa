export const environment = {
    production: false,
    // apiUrl: 'https://api.ms.qa.limbo.work/dev-portal', // with kong,
    apiUrl: 'https://dev-portal-qa.service.ppay.me/dev-portal', // without kong
    release: 'qa',
    apiKey: 'S9gq48ZMLyIrYAObU4naKZ68bykPwZfE',
    studioUrl: 'https://dev-portal.ms.qa.limbo.work/',
    keycloakClientId: 'frontend_dev_portal',
    keycloakRealm: 'studio',
    keycloakUrl: 'https://sso.ms.qa.limbo.work/auth/',
    keycloakWithCallback: true,
    keycloakNotAllowedRouteRedirectTo: '/error/not-authorized',
};
