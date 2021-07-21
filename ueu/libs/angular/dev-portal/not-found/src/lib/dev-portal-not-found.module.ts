import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DevPortalSharedModule } from '@picpay/dev-portal/shared';
import { DevPortalNotFoundRoutingModule } from './dev-portal-not-found.routing.module';

import { NotFoundComponent } from './pages/not-found/not-found.component';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';

@NgModule({
    declarations: [NotFoundComponent],
    imports: [CommonModule, DevPortalNotFoundRoutingModule, DevPortalSharedModule, DesignSystemAngularModule],
})
export class DevPortalNotFoundModule {}
