import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SellerPanelSharedModule } from '@picpay/seller-panel/shared';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';

import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { GenerateNewPasswordComponent } from './components/generate-new-password/generate-new-password.component';
import { FormForgotPasswordComponent } from './components/form-forgot-password/form-forgot-password.component';

const route: Routes = [
    {
        path: '',
        component: ForgotPasswordComponent,
        data: { trackData: { eventLabel: 'Forgot Passwords' } },
        children: [
            {
                path: '',
                component: FormForgotPasswordComponent,
            },
            {
                path: 'nova-senha',
                component: GenerateNewPasswordComponent,
            },
        ],
    },
];

@NgModule({
    declarations: [ForgotPasswordComponent, FormForgotPasswordComponent, GenerateNewPasswordComponent],
    imports: [CommonModule, RouterModule.forChild(route), SellerPanelSharedModule, DesignSystemAngularModule.forRoot()],
    exports: [RouterModule],
})
export class SellerPanelForgotPasswordModule {}
