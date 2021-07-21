import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PicpayKeycloakGuard } from '@picpay/keycloak';
// layouts
import { LayoutsModule } from '@picpay/ui/layouts';
import { ErrorContainerComponent } from '@picpay/dev-portal/shared';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('@picpay/dev-portal/home').then(module => module.DevPortalHomeModule),
    },
    {
        path: 'docs',
        loadChildren: () => import('@picpay/dev-portal/docs').then(module => module.DevPortalDocsModule),
    },
    {
        path: 'dashboard',
        canLoad: [PicpayKeycloakGuard],
        data: { roles: ['studio_basic_access'] },
        loadChildren: () => import('@picpay/dev-portal/dashboard').then(module => module.DevPortalDashboardModule),
    },
    {
        path: 'open-banking',
        loadChildren: () => import('@picpay/dev-portal/open-banking').then(module => module.DevPortalOpenBankingModule),
    },
    {
        path: 'error',
        component: ErrorContainerComponent,
        loadChildren: () =>
            import('@picpay/angular/shared/default-screens').then(module => module.SharedDefaultScreensModule),
    },
    {
        path: '**',
        loadChildren: () => import('@picpay/dev-portal/not-found').then(module => module.DevPortalNotFoundModule),
    },
];

@NgModule({
    imports: [
        LayoutsModule,
        RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', initialNavigation: 'disabled' }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
