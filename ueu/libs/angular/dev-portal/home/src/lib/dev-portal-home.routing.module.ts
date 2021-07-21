import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductResolver, UiResolver } from '@picpay/dev-portal/shared';
import { DownloadComponent } from './pages/download/download.component';
import { LandingComponent } from './pages/landing/landing.component';

const routes: Routes = [
    {
        path: '',
        component: LandingComponent,
        resolve: [UiResolver, ProductResolver],
    },
    {
        path: 'download',
        component: DownloadComponent,
        resolve: [UiResolver, ProductResolver],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DevPortalRoutingModule {}
