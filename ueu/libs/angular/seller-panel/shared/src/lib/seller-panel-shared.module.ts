import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FileInputAccessorModule } from 'file-input-accessor';
import { ImageCropperModule } from 'ngx-img-cropper';
import { NgxMaskModule } from 'ngx-mask';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { SharedPipesModule } from '@picpay/angular/shared/pipes';
import { UiComponentsModule } from '@picpay/ui/components';
import { CheckPasswordService } from '@picpay/seller-panel/services';
import { LayoutsModule } from '@picpay/ui/layouts';

import { MaterialComponentsModule } from './material-components.module';

import { AutoTabDirective } from './directives/auto-tab.directive';
import { AutoTrimDirective } from './directives/auto-trim.directive';
import { CharacterConcealerDirective } from './directives/character-concealer.directive';
import { CpfCnpjFormatterDirective } from './directives/cpf-cnpj-formatter.directive';
import { NumericDirective } from './directives/numeric.directive';
import { UppercaseDirective } from './directives/uppercase.directive';

import { BlockedBalanceComponent } from './components/modals/blocked-balance/blocked-balance.component';
import { B2PDownloadReportsComponent } from './components/modals/b2p-download-reports/b2p-download-reports.component';
import { BlockedTransferredBalanceComponent } from './components/modals/blocked-transferred-balance/blocked-transferred-balance.component';
import { ChangeProfileComponent } from './components/change-profile/change-profile.component';
import { ConfirmComponent } from './components/modals/confirm/confirm.component';
import { DownloadReportsComponent } from './components/modals/download-reports/download-reports.component';
import { ModalDynamicComponent } from './components/modals/dynamic/dynamic.component';
import { FeedBackComponent } from './components/feedback/feedback.component';
import { HeaderComponent } from './components/header/header.component';
import { LoadingButtonComponent } from './components/loading-button/loading-button.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ModalAutoWithdrawalComponent } from './components/modals/modal-auto-withdrawal/modal-auto-withdrawal.component';
import { OnboardingComponent } from './components/modals/onboarding/onboarding.component';
import { RequestPasswordComponent } from './components/modals/request-password/request-password.component';
import { ShareLinksComponent } from './components/modals/share-links/share-links.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ValidationMessagesComponent } from './components/validation-messages/validation-messages.component';
import { LayoutComponent } from './components/layout/layout.component';
import { OnboardingExtractComponent } from './components/modals/onboarding-extract/onboarding-extract.component';
import { SidenavDetailsComponent } from './components/sidenav-details/sidenav-details.component';

const resources = [
    // directives
    CpfCnpjFormatterDirective,
    CharacterConcealerDirective,
    NumericDirective,
    AutoTabDirective,
    AutoTrimDirective,
    UppercaseDirective,
    // components
    B2PDownloadReportsComponent,
    ConfirmComponent,
    LoadingButtonComponent,
    ValidationMessagesComponent,
    LoadingSpinnerComponent,
    BlockedBalanceComponent,
    BlockedTransferredBalanceComponent,
    FeedBackComponent,
    HeaderComponent,
    RequestPasswordComponent,
    SidenavComponent,
    ChangeProfileComponent,
    ModalDynamicComponent,
    DownloadReportsComponent,
    ModalAutoWithdrawalComponent,
    ShareLinksComponent,
    OnboardingComponent,
    OnboardingExtractComponent,
    LayoutComponent,
    SidenavDetailsComponent,
];

@NgModule({
    declarations: [...resources],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        MaterialComponentsModule,
        FileInputAccessorModule,
        NgxMaskModule.forRoot(),
        ImageCropperModule,
        ClipboardModule,
        UiComponentsModule,
        DesignSystemAngularModule,
        SharedPipesModule,
        LayoutsModule,
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        MaterialComponentsModule,
        FileInputAccessorModule,
        ImageCropperModule,
        NgxMaskModule,
        ClipboardModule,
        SharedPipesModule,
        ...resources,
    ],
    providers: [DecimalPipe, DatePipe, CheckPasswordService],
    entryComponents: [
        // modals
        BlockedBalanceComponent,
        BlockedTransferredBalanceComponent,
        RequestPasswordComponent,
        ConfirmComponent,
        ChangeProfileComponent,
        ModalDynamicComponent,
        DownloadReportsComponent,
        ShareLinksComponent,
        OnboardingComponent,
        OnboardingExtractComponent,
    ],
})
export class SellerPanelSharedModule {}
