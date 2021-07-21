import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@picpay/picpedia/shared';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { CardsModule } from '../../components/cards/cards.module';

import { GlossaryMetricsRoutingModule } from './business-glossary-metrics-routing.module';
import { GlossaryMetricsComponent } from './business-glossary-metrics.component';

@NgModule({
    declarations: [GlossaryMetricsComponent],
    imports: [CommonModule, GlossaryMetricsRoutingModule, SharedModule, DesignSystemAngularModule, CardsModule],
})
export class GlossaryMetricsModule {}
