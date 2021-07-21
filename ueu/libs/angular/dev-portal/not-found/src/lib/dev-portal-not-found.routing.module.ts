import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UiResolver } from '@picpay/dev-portal/shared';
import { NotFoundComponent } from './pages/not-found/not-found.component';
const routes: Routes = [
    {
        path: '',
        component: NotFoundComponent,
        resolve: [UiResolver],
        children: [
            {
                path: '',
                redirectTo: 'pagina-nao-encontrada',
                pathMatch: 'full',
            },
            {
                path: 'pagina-nao-encontrada',
                component: NotFoundComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DevPortalNotFoundRoutingModule {}
