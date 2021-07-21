import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { SharedModule } from '@picpay/picpedia/shared';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
    declarations: [HomeComponent],
    imports: [CommonModule, HomeRoutingModule, SharedModule, DesignSystemAngularModule],
})
export class HomeModule {}
