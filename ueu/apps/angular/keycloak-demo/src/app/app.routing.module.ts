import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PicpayKeycloakGuard } from '@picpay/keycloak';
import { LayoutsModule } from '@picpay/ui/layouts';
import { AppComponent } from './app.component';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { LayoutComponent } from '@picpay/keycloak-demo/home';
import { DefaultErrorScreenComponent, DefaultErrorScreenConfig } from '@picpay/angular/shared/default-screens';

export const notAuthorizedScreenConfig: DefaultErrorScreenConfig = {
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
            text: 'Voltar á página inicial',
        },
    ],
};

const routes: Routes = [
    {
        path: 'home',
        component: LayoutComponent,
        loadChildren: () => import('@picpay/keycloak-demo/home').then(module => module.KeycloakDemoHomeModule),
    },
    {
        path: 'secret',
        component: AppComponent,
        canActivate: [PicpayKeycloakGuard],
        data: { roles: ['admin', 'teste', 'outro_teste'] },
    },
    {
        path: 'error',
        component: LayoutComponent,
        children: [{ path: 'not-authorized', component: DefaultErrorScreenComponent, data: notAuthorizedScreenConfig }],
    },
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
    imports: [
        LayoutsModule,
        RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', initialNavigation: 'disabled' }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
