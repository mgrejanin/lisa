import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductResolver, ProjectResolver } from '@picpay/dev-portal/shared';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewProjectComponent } from './pages/new-project/new-project.component';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        resolve: [ProjectResolver],
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'projeto',
            },
            {
                path: 'projeto/:project',
                component: ProjectDetailsComponent,
                resolve: [ProductResolver],
            },
            {
                path: 'projeto/:project/editar',
                component: NewProjectComponent,
            },
            {
                path: 'novo-projeto',
                component: NewProjectComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DevPortalDashboardRoutingModule {}
