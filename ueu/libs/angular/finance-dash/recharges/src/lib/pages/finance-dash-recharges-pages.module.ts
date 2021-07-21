import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { FinanceDashRechargesComponentsModule } from '../components/finance-dash-recharges-components.module';
import { FinanceDashRechargesPagesRoutingModule } from './pages-routing.module';
import { RechargesComponent } from './recharges/recharges.component';
import { RechargeSolicitationsComponent } from '../containers/recharge-solicitations/recharge-solicitations.component';

@NgModule({
    declarations: [RechargesComponent, RechargeSolicitationsComponent],
    imports: [
        CommonModule,
        FinanceDashRechargesPagesRoutingModule,
        DesignSystemAngularModule,
        MatTabsModule,
        MatIconModule,
        MatTableModule,
        MatPaginatorModule,
        FinanceDashRechargesComponentsModule,
    ],
})
export class FinanceDashRechargesPagesModule {}
