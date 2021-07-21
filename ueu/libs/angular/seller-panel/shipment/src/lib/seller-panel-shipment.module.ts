import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SellerPanelAuthService } from '@picpay/seller-panel/auth';
import { SellerPanelSharedModule } from '@picpay/seller-panel/shared';
import { SellerPanelShipmentRoutingModule } from './seller-panel-shipment.routing.module';
import { ShipmentComponent } from './pages/shipment/shipment.component';
import { BatchShipmentComponent } from './components/batch-shipment/batch-shipment.component';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmPaymentComponent } from './components/confirm-payment/confirm-payment.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatDialogModule,
        SellerPanelShipmentRoutingModule,
        SellerPanelSharedModule,
        DesignSystemAngularModule,
    ],
    declarations: [ShipmentComponent, BatchShipmentComponent, ConfirmPaymentComponent],
    providers: [SellerPanelAuthService],
})
export class SellerPanelShipmentModule {}
