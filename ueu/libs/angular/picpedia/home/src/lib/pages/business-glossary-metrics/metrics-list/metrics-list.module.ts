import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@picpay/picpedia/shared';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { BadgeCertificationModule } from '../../../components/badge-certification/badge-certification.module';

import { MetricsListRoutingModule } from './metrics-list-routing.module';
import { MetricsListComponent } from './metrics-list.component';

@NgModule({
    declarations: [MetricsListComponent],
    imports: [
        CommonModule,
        MetricsListRoutingModule,
        SharedModule,
        DesignSystemAngularModule,
        BadgeCertificationModule,
    ],
})
export class MetricsListModule {}
