import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductResolver, UiResolver } from '@picpay/dev-portal/shared';

import { OpenBankingComponent } from './pages/open-banking/open-banking.component';

const routes: Routes = [
    {
        path: '',
        component: OpenBankingComponent,
        resolve: [UiResolver, ProductResolver],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DevPortalOpenBankingRoutingModule {}
