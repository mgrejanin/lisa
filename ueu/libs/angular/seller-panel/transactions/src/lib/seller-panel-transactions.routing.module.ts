import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { TransactionsComponent } from './pages/transactions/transactions.component';

const routes: Routes = [
    { path: '', component: TransactionsComponent, data: { trackData: { eventLabel: 'Transactions' } } },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SellerPanelTransactionsRoutingModule {}
