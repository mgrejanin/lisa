import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@picpay/picpedia/shared';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { CardsModule } from '../../components/cards/cards.module';

import { GlossaryModelsRoutingModule } from './business-glossary-models-routing.module';
import { GlossaryModelsComponent } from './business-glossary-models.component';

@NgModule({
    declarations: [GlossaryModelsComponent],
    imports: [CommonModule, GlossaryModelsRoutingModule, SharedModule, DesignSystemAngularModule, CardsModule],
})
export class GlossaryModelsModule {}
