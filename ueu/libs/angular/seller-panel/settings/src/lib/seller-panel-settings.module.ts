import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { EcommerceService, SellerService } from '@picpay/seller-panel/services';
import { EcommerceGuard, SellerPanelSharedModule } from '@picpay/seller-panel/shared';

import { SellerPanelSettingsRoutingModule } from './seller-panel-settings.routing.module';

import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ChangeImageProfileComponent } from './components/change-image-profile/change-image-profile.component';
import { ModalCropComponent } from './components/modal-crop/modal-crop.component';
import { ChangePlanComponent } from './components/change-plan/change-plan.component';
import { MyDocumentsComponent } from './components/my-documents/my-documents.component';
import { MyPlanComponent } from './components/my-plan/my-plan.component';
import { SettingsComponent } from './pages/settings/settings.component';

import { PasswordCheckerGuard } from './guards/password-checker.guard';
import { UnsavedChangesGuard } from './guards/unsaved-changes.guard';

@NgModule({
    imports: [CommonModule, DesignSystemAngularModule, SellerPanelSharedModule, SellerPanelSettingsRoutingModule],
    declarations: [
        SettingsComponent,
        MyDocumentsComponent,
        ChangePasswordComponent,
        ChangeImageProfileComponent,
        MyPlanComponent,
        ChangePlanComponent,
        ModalCropComponent,
    ],
    providers: [SellerService, PasswordCheckerGuard, UnsavedChangesGuard, EcommerceGuard, EcommerceService],
})
export class SellerPanelSettingsModule {}
