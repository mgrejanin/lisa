import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';

import { SharedModule } from '@picpay/picpedia/shared';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { BadgeCertificationModule } from '../../../components/badge-certification/badge-certification.module';

import { ModelsDetailComponent } from './models-detail.component';
import { ModelsDetailRoutingModule } from './models-detail-routing.module';

@NgModule({
    declarations: [ModelsDetailComponent],
    imports: [
        CommonModule,
        ModelsDetailRoutingModule,
        SharedModule,
        DesignSystemAngularModule,
        BadgeCertificationModule,
        MatTabsModule,
        MatMenuModule,
    ],
})
export class ModelsDetailModule {}
