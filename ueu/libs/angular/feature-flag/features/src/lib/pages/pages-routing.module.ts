import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { createFeatureFlagPermissions, RolesGuard } from '@picpay/feature-flag/auth';

// components
import { FeatureWorkbenchComponent } from './feature-workbench/feature-workbench.component';
import { FeaturesListComponent } from './features-list/features-list.component';

const routes: Routes = [
    { path: '', component: FeaturesListComponent },
    {
        path: 'criar',
        component: FeatureWorkbenchComponent,
        canActivate: [RolesGuard],
        data: {
            editing: false,
            roles: createFeatureFlagPermissions({
                availableToAdmin: false,
                availableToEditor: true,
                isAvailableToSquadAdmin: true,
                isAvailableToSquadEditor: true,
            }),
        },
    },
    {
        path: 'editar/:id',
        component: FeatureWorkbenchComponent,
        canActivate: [RolesGuard],
        data: {
            editing: true,
            roles: createFeatureFlagPermissions({
                availableToAdmin: false,
                availableToEditor: true,
                isAvailableToSquadAdmin: true,
                isAvailableToSquadEditor: true,
            }),
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {}
