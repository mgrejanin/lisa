import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BankWithdrawalsComponent } from './pages/bank-withdrawals/bank-withdrawals.component';

const routes: Routes = [
    {
        path: '',
        component: BankWithdrawalsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SellerPanelSettingsRoutingModule {}
