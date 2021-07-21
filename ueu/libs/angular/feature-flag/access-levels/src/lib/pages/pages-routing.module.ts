import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// guards
import { createFeatureFlagPermissions, RolesGuard } from '@picpay/feature-flag/auth';

// components
import { SquadsComponent } from './squads/squads.component';
import { UserManagementComponent } from './user-management/user-management.component';

const routes: Routes = [
    {
        path: '',
        component: SquadsComponent,
        canActivate: [RolesGuard],
        data: {
            roles: createFeatureFlagPermissions({
                availableToAdmin: true,
                availableToEditor: false,
                isAvailableToSquadAdmin: true,
                isAvailableToSquadEditor: false,
            }),
        },
    },
    {
        path: 'squad/:squadId',
        component: UserManagementComponent,
        canActivate: [RolesGuard],
        data: {
            roles: createFeatureFlagPermissions({
                availableToAdmin: true,
                availableToEditor: false,
                isAvailableToSquadAdmin: true,
                isAvailableToSquadEditor: false,
            }),
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {}
