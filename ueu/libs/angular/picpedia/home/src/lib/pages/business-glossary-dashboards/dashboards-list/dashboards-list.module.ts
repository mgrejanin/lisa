import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@picpay/picpedia/shared';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { BadgeCertificationModule } from '../../../components/badge-certification/badge-certification.module';

import { DashboardsListRoutingModule } from './dashboards-list-routing.module';
import { DashboardsListComponent } from './dashboards-list.component';

@NgModule({
    declarations: [DashboardsListComponent],
    imports: [
        CommonModule,
        DashboardsListRoutingModule,
        SharedModule,
        DesignSystemAngularModule,
        BadgeCertificationModule,
    ],
})
export class DashboardsListModule {}
