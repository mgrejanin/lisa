import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { B2PGuard } from '@picpay/seller-panel/shared';
import { BatchShipmentComponent } from './components/batch-shipment/batch-shipment.component';
import { ShipmentComponent } from './pages/shipment/shipment.component';

// components

const routes: Routes = [
    {
        path: '',
        component: ShipmentComponent,
        canActivate: [B2PGuard],
        children: [
            {
                path: '',
                component: BatchShipmentComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SellerPanelShipmentRoutingModule {}
