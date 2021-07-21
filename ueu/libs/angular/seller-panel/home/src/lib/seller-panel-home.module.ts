import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { ExtractService, SellerService, SidenavService } from '@picpay/seller-panel/services';
import { SellerPanelSharedModule } from '@picpay/seller-panel/shared';
import { CustomCurrencyMaskConfig, SellerPanelExtractModule } from '@picpay/seller-panel/extract';
import { SellerPanelTransactionsModule } from '@picpay/seller-panel/transactions';

import { HomeComponent } from './pages/home/home.component';
import { SellerPanelHomeRoutingModule } from './seller-panel-home.routing.module';
import { AccountErrorComponent } from './components/account-error/account-error.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { RequestWithdrawalComponent } from './components/modals/request-withdrawal/request-withdrawal.component';
import { NewWithdrawComponent } from './components/new-withdraw/new-withdraw.component';
import { ResumeBalanceAvailableComponent } from './components/resume-balance-available/resume-balance-available.component';

import { CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';


@NgModule({
    entryComponents: [AccountErrorComponent],
    imports: [
        CommonModule,
        SellerPanelSharedModule,
        SellerPanelHomeRoutingModule,
        SellerPanelTransactionsModule,
        DesignSystemAngularModule,
        SellerPanelExtractModule,
        CurrencyMaskModule,
    ],
    declarations: [
        HomeComponent,
        AccountErrorComponent,
        AccountsComponent,
        RequestWithdrawalComponent,
        NewWithdrawComponent,
        ResumeBalanceAvailableComponent
    ],
    providers: [
        ExtractService, 
        CurrencyPipe,
        SellerService,
        SidenavService,
        { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    ],
    exports: [
        RequestWithdrawalComponent,
        ResumeBalanceAvailableComponent,
        NewWithdrawComponent,
        AccountsComponent,
    ],
})
export class SellerPanelHomeModule {}
