import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { EcommerceService } from '@picpay/seller-panel/services';
import { SellerPanelSharedModule } from '@picpay/seller-panel/shared';

import { GenerateNewTokenComponent } from './components/generate-new-token/generate-new-token.component';
import { InputsApisComponent } from './components/inputs-apis/inputs-apis.component';
import { IntegrationsComponent } from './pages/integrations/integrations.component';
import { SellerPanelIntegrationsRoutingModule } from './seller-panel-integrations.routing.module';

@NgModule({
    imports: [CommonModule, SellerPanelIntegrationsRoutingModule, SellerPanelSharedModule, DesignSystemAngularModule],
    declarations: [IntegrationsComponent, InputsApisComponent, GenerateNewTokenComponent],
    providers: [EcommerceService],
})
export class SellerPanelIntegrationsModule {}
