import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// guards
import { EcommerceGuard } from '@picpay/seller-panel/shared';

// components
import { IntegrationsComponent } from './pages/integrations/integrations.component';

const routes: Routes = [
    {
        path: '',
        component: IntegrationsComponent,
        data: { trackData: { eventLabel: 'Integrations' } },
        canLoad: [EcommerceGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SellerPanelIntegrationsRoutingModule {}
