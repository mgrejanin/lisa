export const environment = {
    production: true,
    apiUrl: 'https://api.picpay.com/dev-portal',
    // apiUrl: 'https://dev-portal.service.ppay.me',
    release: 'production',
    apiKey: 'W0AxZwif7E3kKd8Lc8zYePFVmjuoYjed',
    studioUrl: 'https://studio.picpay.com',
    keycloak: {
        clientId: '23ac5ad1-7756-49a4-9e51-3962e87883f5',
        realm: 'studio',
        url: 'https://sso2.picpay.com/auth/',
        withCallback: true,
        notAllowedRouteRedirectTo: '/error/not-authorized',
    },
};
