import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@picpay/picpedia/shared';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { BadgeCertificationModule } from '../../../components/badge-certification/badge-certification.module';

import { ModelsListRoutingModule } from './models-list-routing.module';
import { ModelsListComponent } from './models-list.component';

@NgModule({
    declarations: [ModelsListComponent],
    imports: [
        CommonModule,
        ModelsListRoutingModule,
        SharedModule,
        DesignSystemAngularModule,
        BadgeCertificationModule,
    ],
})
export class ModelsListModule {}
