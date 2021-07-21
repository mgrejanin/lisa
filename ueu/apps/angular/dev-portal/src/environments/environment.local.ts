export const environment = {
    production: false,
    apiUrl: 'http://localhost:8088/dev-portal',
    release: 'local',
    apiKey: 'S9gq48ZMLyIrYAObU4naKZ68bykPwZfE',
    studioUrl: 'http://127.0.0.1:4200',
    keycloak: {
        clientId: 'frontend_dev_portal',
        realm: 'studio',
        url: 'https://sso.ms.qa.limbo.work/auth/',
        withCallback: true,
        notAllowedRouteRedirectTo: '/error/not-authorized',
    },
};
