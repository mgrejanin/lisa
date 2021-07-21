import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultErrorScreenComponent } from '@picpay/angular/shared/default-screens';
import { GrowthDashLayoutComponent } from '@picpay/growth-dash/shared';
import { PicpayKeycloakGuard } from '@picpay/keycloak';
import { LayoutsModule } from '@picpay/ui/layouts';

import { NotAuthorizedScreenConfig, NotFoundScreenConfig } from './app.error-screens.config';

const routes: Routes = [
    {
        path: '',
        component: GrowthDashLayoutComponent,
        children: [
            {
                path: 'campaigns',
                canLoad: [PicpayKeycloakGuard],
                data: { roles: ['GrowthDash_Basic_Access'] },
                loadChildren: () =>
                    import('@picpay/growth-dash/campaigns').then(module => module.GrowthDashCampaignsModule),
            },
            {
                path: '401',
                component: DefaultErrorScreenComponent,
                data: NotAuthorizedScreenConfig,
            },
            {
                path: '404',
                component: DefaultErrorScreenComponent,
                data: NotFoundScreenConfig,
            },
            { path: '', redirectTo: 'campaigns', pathMatch: 'full' },
            { path: '**', redirectTo: '404' },
        ],
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
