import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// guards
import { PicpayKeycloakGuard } from '@picpay/keycloak';
import { ProfileGuard } from '@picpay/feature-flag/auth';

// layouts
import { LayoutsModule } from '@picpay/ui/layouts';
import { FeatureFlagLayoutComponent } from '@picpay/feature-flag/shared';

// components
import { DefaultErrorScreenComponent } from '@picpay/angular/shared/default-screens';

// configs
import { NotAuthorizedScreenConfig, NotFoundScreenConfig } from './app.error-screens.config';

const routes: Routes = [
    {
        path: '',
        component: FeatureFlagLayoutComponent,
        children: [
            {
                path: 'features',
                canLoad: [PicpayKeycloakGuard, ProfileGuard],
                loadChildren: () => import('@picpay/feature-flag/features').then(module => module.FeaturesModule),
            },
            {
                path: 'acessos',
                canLoad: [PicpayKeycloakGuard, ProfileGuard],
                loadChildren: () =>
                    import('@picpay/feature-flag/access-levels').then(module => module.AccessLevelsModule),
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
            { path: '', redirectTo: 'features', pathMatch: 'full' },
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
