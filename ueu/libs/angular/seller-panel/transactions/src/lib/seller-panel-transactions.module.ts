import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { SellerPanelSharedModule } from '@picpay/seller-panel/shared';

import { SellerPanelTransactionsRoutingModule } from './seller-panel-transactions.routing.module';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { SellerPanelAuthService } from '@picpay/seller-panel/auth';
import { OperatorsService, TransactionsService, SellerQuery, SidenavService } from '@picpay/seller-panel/services';
import { CancelTransactionComponent } from './components/cancel-transaction/cancel-transaction.component';
import { DetailsTransactionsComponent } from './components/details-transactions/details-transactions.component';
import { TableTransactionsComponent } from './components/table-transactions/table-transactions.component';
import { TransactionsFilterComponent } from './components/transactions-filter/transactions-filter.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { PicpayIfRolesService, PicpayIfRolesModule } from '@picpay/angular/shared/directives';

@NgModule({
    imports: [
        CommonModule,
        SellerPanelTransactionsRoutingModule,
        SellerPanelSharedModule,
        DesignSystemAngularModule,
        PicpayIfRolesModule,
    ],

    declarations: [
        TransactionsComponent,
        TransactionsFilterComponent,
        TableTransactionsComponent,
        CancelTransactionComponent,
        DetailsTransactionsComponent,
        TransactionsComponent,
        TransactionsFilterComponent,
    ],
    exports: [TableTransactionsComponent],
    providers: [
        DatePipe,
        TransactionsService,
        SellerPanelAuthService,
        OperatorsService,
        SidenavService,
        { provide: PicpayIfRolesService, useClass: SellerQuery },
    ],
})
export class SellerPanelTransactionsModule {}
