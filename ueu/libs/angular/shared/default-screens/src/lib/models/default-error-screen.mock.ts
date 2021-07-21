import { DefaultErrorScreenConfig } from './default-error-screen.model';

export const DefaultErrorScreenMock: DefaultErrorScreenConfig = {
    title: 'Default Error Screen',
    subtitle: 'Shared Default Screens Module',
    type: 'done',
    figure: true,
    buttons: [
        {
            variant: 'unelevated',
            href: 'https://github.com/PicPay/picpay-frontend/tree/develop/libs/angular/shared/default-screens',
            text: 'Ver o README',
        },
        {
            variant: 'link',
            routerLink: [''],
            text: 'Ok, entendi!',
        },
    ],
};
