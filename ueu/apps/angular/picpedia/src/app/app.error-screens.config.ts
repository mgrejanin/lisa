import { DefaultErrorScreenConfig } from '@picpay/angular/shared/default-screens';

export const NotAuthorizedScreenConfig: DefaultErrorScreenConfig = {
    title: 'Opa, você está sem acesso',
    subtitle: 'Solicite o acesso via Zendesk. Para acessar este link é necessário uma autorização específica.',
    type: 'info',
    figure: true,
    buttons: [
        {
            variant: 'unelevated',
            href: 'https://picpay.zendesk.com',
            text: 'Solicitar acesso',
        },
        {
            variant: 'link',
            routerLink: [''],
            text: 'Tentar mais tarde',
        },
    ],
};

export const NotFoundScreenConfig: DefaultErrorScreenConfig = {
    title: 'Opa, essa página não existe',
    subtitle: 'Volte para a Home e tente uma nova busca.',
    type: 'error',
    figure: true,
    buttons: [
        {
            variant: 'link',
            routerLink: [''],
            text: 'Ir para Home',
        },
    ],
};
