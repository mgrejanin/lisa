import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';

import { SharedModule } from '@picpay/picpedia/shared';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { BadgeCertificationModule } from '../../../components/badge-certification/badge-certification.module';

import { MetricsDetailComponent } from './metrics-detail.component';
import { MetricsDetailRoutingModule } from './metrics-detail-routing.module';

@NgModule({
    declarations: [MetricsDetailComponent],
    imports: [
        CommonModule,
        MetricsDetailRoutingModule,
        SharedModule,
        DesignSystemAngularModule,
        BadgeCertificationModule,
        MatTabsModule,
        MatMenuModule,
    ],
})
export class MetricsDetailModule {}
