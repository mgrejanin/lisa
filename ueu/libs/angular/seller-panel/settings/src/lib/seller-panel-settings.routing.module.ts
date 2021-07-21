import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EcommerceGuard } from '@picpay/seller-panel/shared';
import { PasswordCheckerGuard } from './guards/password-checker.guard';
import { UnsavedChangesGuard } from './guards/unsaved-changes.guard';

import { SettingsComponent } from './pages/settings/settings.component';

import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { MyDocumentsComponent } from './components/my-documents/my-documents.component';
import { MyPlanComponent } from './components/my-plan/my-plan.component';

const routes: Routes = [
    {
        path: '',
        component: SettingsComponent,
        canActivate: [PasswordCheckerGuard],
        children: [
            {
                path: 'meus-dados',
                component: MyDocumentsComponent,
                canDeactivate: [UnsavedChangesGuard],
            },
            {
                path: 'alterar-senha',
                component: ChangePasswordComponent,
            },
            {
                path: 'meu-plano',
                component: MyPlanComponent,
                canActivate: [EcommerceGuard],
            },
            {
                path: '',
                redirectTo: 'meus-dados',
                pathMatch: 'full',
            },
            {
                path: 'saques-bancarios',
                loadChildren: () =>
                    import('@picpay/seller-panel/bank-accounts').then(module => module.SellerPanelBankAccountsModule),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SellerPanelSettingsRoutingModule {}
