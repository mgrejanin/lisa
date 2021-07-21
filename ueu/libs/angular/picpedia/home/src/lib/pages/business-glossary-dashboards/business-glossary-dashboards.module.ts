import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@picpay/picpedia/shared';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { CardsModule } from '../../components/cards/cards.module';

import { GlossaryDashboardsRoutingModule } from './business-glossary-dashboards-routing.module';
import { GlossaryDashboardsComponent } from './business-glossary-dashboards.component';

@NgModule({
    declarations: [GlossaryDashboardsComponent],
    imports: [CommonModule, GlossaryDashboardsRoutingModule, SharedModule, DesignSystemAngularModule, CardsModule],
})
export class GlossaryDashboardsModule {}
