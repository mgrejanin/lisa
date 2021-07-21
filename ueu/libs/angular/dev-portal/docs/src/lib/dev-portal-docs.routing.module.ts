import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductResolver, UiResolver } from '@picpay/dev-portal/shared';
import { ApiReferenceComponent } from './pages/api-reference/api-reference.component';

const routes: Routes = [
    { path: '', component: ApiReferenceComponent, resolve: [UiResolver, ProductResolver] },
    { path: ':slug', component: ApiReferenceComponent, resolve: [UiResolver, ProductResolver] },
    { path: ':slug/:version', component: ApiReferenceComponent, resolve: [UiResolver, ProductResolver] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DevPortalDocsRoutingModule {}
