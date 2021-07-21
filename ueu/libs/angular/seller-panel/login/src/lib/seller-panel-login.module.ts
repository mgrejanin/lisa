import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { SellerPanelSharedModule } from '@picpay/seller-panel/shared';
import { MenuService } from '@picpay/ui/layouts';

import { LoginComponent } from './login/login.component';

import { SellerPanelLoginRoutingModule } from './seller-panel-login.routing.module';

@NgModule({
    declarations: [LoginComponent],
    imports: [CommonModule, DesignSystemAngularModule, SellerPanelSharedModule, SellerPanelLoginRoutingModule],
    providers: [MenuService],
})
export class SellerPanelLoginModule {}
