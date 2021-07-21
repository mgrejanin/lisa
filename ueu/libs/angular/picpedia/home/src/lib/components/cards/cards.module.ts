import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@picpay/picpedia/shared';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';

import { RouterModule } from '@angular/router';
import { CardsComponent } from './cards.component';

@NgModule({
    declarations: [CardsComponent],
    imports: [CommonModule, SharedModule, DesignSystemAngularModule, RouterModule],
    exports: [CardsComponent],
})
export class CardsModule {}
