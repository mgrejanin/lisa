export const environment = {
    production: false,
    apiUrl: 'http://devportal.sandbox.limbo.work:8088',
    apiKey: 'S9gq48ZMLyIrYAObU4naKZ68bykPwZfE',
    release: 'sandbox',
    studioUrl: 'https://dev-portal.ms.qa.limbo.work',
    keycloak: {
        clientId: 'frontend_dev_portal',
        realm: 'studio',
        url: 'https://sso.ms.qa.limbo.work/auth/',
        withCallback: true,
        notAllowedRouteRedirectTo: '/error/not-authorized',
    },
};
