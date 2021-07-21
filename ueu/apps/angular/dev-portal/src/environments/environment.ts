export const environment = {
    production: false,
    apiUrl: 'https://api.ms.qa.limbo.work/dev-portal', // with kong,
    // apiUrl: 'https://dev-portal-qa.service.ppay.me/dev-portal', // without kong
    release: 'qa',
    apiKey: 'S9gq48ZMLyIrYAObU4naKZ68bykPwZfE',
    studioUrl: 'https://dev-portal.ms.qa.limbo.work/',
    keycloak: {
        clientId: 'frontend_dev_portal',
        realm: 'studio',
        url: 'https://sso.ms.qa.limbo.work/auth/',
        withCallback: true,
        notAllowedRouteRedirectTo: '/error/not-authorized',
    },
};
