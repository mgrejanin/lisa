import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@picpay/picpedia/shared';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { CardsModule } from '../../components/cards/cards.module';

import { BusinessGlossaryRoutingModule } from './business-glossary-routing.module';
import { BusinessGlossaryComponent } from './business-glossary.component';

@NgModule({
    declarations: [BusinessGlossaryComponent],
    imports: [CommonModule, BusinessGlossaryRoutingModule, SharedModule, DesignSystemAngularModule, CardsModule],
})
export class BusinessGlossaryModule {}
