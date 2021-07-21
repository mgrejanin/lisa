import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { QRCodeModule } from 'angularx-qrcode';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';

import { SellerPanelSharedModule } from '@picpay/seller-panel/shared';

import { ChargeService } from '@picpay/seller-panel/services';

import { ChargeValueModalComponent } from './components/charge-value-modal/charge-value-modal.component';
import { ChargeComponent } from './pages/charge/charge.component';

import { SellerPanelChargeRoutingModule } from './seller-panel-charge.routing.module';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: 'center',
    allowNegative: false,
    decimal: ',',
    precision: 2,
    prefix: 'R$ ',
    suffix: '',
    thousands: '.',
};

@NgModule({
    imports: [CommonModule, CurrencyMaskModule, QRCodeModule, SellerPanelChargeRoutingModule, SellerPanelSharedModule],
    declarations: [ChargeComponent, ChargeValueModalComponent],
    providers: [ChargeService, { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }],
})
export class SellerPanelChargeModule {}
