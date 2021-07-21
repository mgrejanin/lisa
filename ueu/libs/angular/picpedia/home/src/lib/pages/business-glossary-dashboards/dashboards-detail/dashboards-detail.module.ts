import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';

import { SharedModule } from '@picpay/picpedia/shared';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { BadgeCertificationModule } from '../../../components/badge-certification/badge-certification.module';

import { DashboardsDetailRoutingModule } from './dashboards-detail-routing.module';
import { DashboardsDetailComponent } from './dashboards-detail.component';

@NgModule({
    declarations: [DashboardsDetailComponent],
    imports: [
        CommonModule,
        DashboardsDetailRoutingModule,
        SharedModule,
        DesignSystemAngularModule,
        BadgeCertificationModule,
        MatTabsModule,
        MatMenuModule,
    ],
})
export class DashboardsDetailModule {}
