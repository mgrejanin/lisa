import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { SellerPanelSharedModule } from '@picpay/seller-panel/shared';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes), SellerPanelSharedModule],
    exports: [RouterModule],
})
export class SellerPanelHomeRoutingModule {}
