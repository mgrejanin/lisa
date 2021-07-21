import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { SidenavService, WithdrawalsService } from '@picpay/seller-panel/services';
import { SellerPanelSharedModule } from '@picpay/seller-panel/shared';

import { SellerPanelSettingsRoutingModule } from './seller-panel-bank-accounts.routing.module';

import { AccountActionContextComponent } from './components/account-action-context/account-action-context.component';
import { AccountConfirmResponseComponent } from './components/account-confirm-response/account-confirm-response.component';
import { AccountConfirmComponent } from './components/account-confirm/account-confirm.component';
import { AccountDynamicFormComponent } from './components/account-dynamic-form/account-dynamic-form.component';
import { AccountStepperComponent } from './containers/account-stepper/account-stepper.component';
import { AccountsListComponent } from './components/accounts-list/accounts-list.component';
import { AutoWithdrawalComponent } from './components/auto-withdrawal/auto-withdrawal.component';
import { BankWithdrawalsComponent } from './pages/bank-withdrawals/bank-withdrawals.component';
import { BanksListComponent } from './components/banks-list/banks-list.component';
import { ModalWarningComponent } from './components/modal-warning/modal-warning.component';
import { CdkPortalComponent } from './components/cdk-portal/cdk-portal.component';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
    imports: [
        CommonModule,
        SellerPanelSharedModule,
        SellerPanelSettingsRoutingModule,
        DesignSystemAngularModule,
        PortalModule,
    ],
    declarations: [
        BankWithdrawalsComponent,
        AccountsListComponent,
        AutoWithdrawalComponent,
        AccountStepperComponent,
        BanksListComponent,
        AccountDynamicFormComponent,
        AccountConfirmComponent,
        AccountConfirmResponseComponent,
        AccountActionContextComponent,
        ModalWarningComponent,
        CdkPortalComponent,
    ],
    providers: [WithdrawalsService, SidenavService],
})
export class SellerPanelBankAccountsModule {}
