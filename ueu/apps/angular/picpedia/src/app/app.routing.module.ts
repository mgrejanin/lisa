import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsModule } from '@picpay/ui/layouts';
import { PicpediaRoutePath, LayoutComponent } from '@picpay/picpedia/shared';

import { PicpayKeycloakGuard } from '@picpay/keycloak';
import { DefaultErrorScreenComponent } from '@picpay/angular/shared/default-screens';
import { NotAuthorizedScreenConfig, NotFoundScreenConfig } from './app.error-screens.config';

const routes: Routes = [
    {
        path: PicpediaRoutePath.Home,
        component: LayoutComponent,
        canLoad: [PicpayKeycloakGuard],
        loadChildren: () => import('@picpay/picpedia/home').then(module => module.HomeModule),
    },
    {
        path: PicpediaRoutePath.BusinessGlossary,
        component: LayoutComponent,
        canLoad: [PicpayKeycloakGuard],
        data: { roles: ['Picpedia_BusinessGlossary'] },
        loadChildren: () => import('@picpay/picpedia/home').then(module => module.BusinessGlossaryModule),
    },
    {
        path: PicpediaRoutePath.GlossaryDashboards,
        component: LayoutComponent,
        canLoad: [PicpayKeycloakGuard],
        loadChildren: () => import('@picpay/picpedia/home').then(module => module.GlossaryDashboardsModule),
    },
    {
        path: PicpediaRoutePath.GlossaryDashboardsList,
        component: LayoutComponent,
        canLoad: [PicpayKeycloakGuard],
        loadChildren: () => import('@picpay/picpedia/home').then(module => module.DashboardsListModule),
    },
    {
        path: PicpediaRoutePath.GlossaryDashboardsDetail,
        component: LayoutComponent,
        canLoad: [PicpayKeycloakGuard],
        loadChildren: () => import('@picpay/picpedia/home').then(module => module.DashboardsDetailModule),
    },
    {
        path: PicpediaRoutePath.GlossaryMetrics,
        component: LayoutComponent,
        canLoad: [PicpayKeycloakGuard],
        loadChildren: () => import('@picpay/picpedia/home').then(module => module.GlossaryMetricsModule),
    },
    {
        path: PicpediaRoutePath.GlossaryMetricsList,
        component: LayoutComponent,
        canLoad: [PicpayKeycloakGuard],
        loadChildren: () => import('@picpay/picpedia/home').then(module => module.MetricsListModule),
    },
    {
        path: PicpediaRoutePath.GlossaryMetricsDetail,
        component: LayoutComponent,
        canLoad: [PicpayKeycloakGuard],
        loadChildren: () => import('@picpay/picpedia/home').then(module => module.MetricsDetailModule),
    },
    {
        path: PicpediaRoutePath.GlossaryModels,
        component: LayoutComponent,
        canLoad: [PicpayKeycloakGuard],
        loadChildren: () => import('@picpay/picpedia/home').then(module => module.GlossaryModelsModule),
    },
    {
        path: PicpediaRoutePath.GlossaryModelsList,
        component: LayoutComponent,
        canLoad: [PicpayKeycloakGuard],
        loadChildren: () => import('@picpay/picpedia/home').then(module => module.ModelsListModule),
    },
    {
        path: PicpediaRoutePath.GlossaryModelsDetail,
        component: LayoutComponent,
        canLoad: [PicpayKeycloakGuard],
        loadChildren: () => import('@picpay/picpedia/home').then(module => module.ModelsDetailModule),
    },
    {
        path: PicpediaRoutePath.Tags,
        component: LayoutComponent,
        canLoad: [PicpayKeycloakGuard],
        loadChildren: () => import('@picpay/picpedia/home').then(module => module.TagsModule),
    },
    {
        path: 'error',
        component: LayoutComponent,
        canLoad: [PicpayKeycloakGuard],
        children: [{ path: 'not-authorized', component: DefaultErrorScreenComponent, data: NotAuthorizedScreenConfig }],
    },
    {
        path: '404',
        component: LayoutComponent,
        children: [{ path: 'not-found', component: DefaultErrorScreenComponent, data: NotFoundScreenConfig }],
    },
    {
        path: '**',
        redirectTo: PicpediaRoutePath.Home,
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
