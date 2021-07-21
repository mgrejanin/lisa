import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// modules
import { FinanceDashRechargesPagesModule } from './pages/finance-dash-recharges-pages.module';

@NgModule({
    imports: [CommonModule, FinanceDashRechargesPagesModule],
})
export class FinanceDashRechargesModule {}
