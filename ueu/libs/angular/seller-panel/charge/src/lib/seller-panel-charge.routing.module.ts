import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { ChargeComponent } from './pages/charge/charge.component';

// guards
import { BizGuard } from '@picpay/seller-panel/shared';

const routes: Routes = [
    {
        path: '',
        component: ChargeComponent,
        data: { trackData: { eventLabel: 'Charge' } },
        canActivate: [BizGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SellerPanelChargeRoutingModule {}
