import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PicpayKeycloakGuard } from '@picpay/keycloak';
import { DefaultErrorScreenComponent } from '@picpay/angular/shared/default-screens';

// configs
import { NotAuthorizedScreenConfig } from './app.error-screens.config';

// layouts
import { LayoutsModule } from '@picpay/ui/layouts';
import { LayoutComponent } from '@picpay/ops-dash/shared';

const routes: Routes = [
    {
        path: 'dashboard',
        component: LayoutComponent,
        canLoad: [PicpayKeycloakGuard],
        data: { roles: ['OpsDash_Envs'] },
        loadChildren: () => import('@picpay/ops-dash/variables').then(module => module.OpsDashVariablesModule),
    },
    {
        path: 'help',
        component: LayoutComponent,
        canLoad: [PicpayKeycloakGuard],
        loadChildren: () => import('@picpay/ops-dash/help').then(module => module.OpsDashHelpModule),
    },
    {
        path: 'first-access',
        component: LayoutComponent,
        canLoad: [PicpayKeycloakGuard],
        loadChildren: () => import('@picpay/ops-dash/help').then(module => module.OpsDashFirstAccessModule),
    },
    {
        path: 'error',
        component: LayoutComponent,
        children: [{ path: 'not-authorized', component: DefaultErrorScreenComponent, data: NotAuthorizedScreenConfig }],
    },
    { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
    imports: [
        LayoutsModule,
        RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', initialNavigation: 'disabled' }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
