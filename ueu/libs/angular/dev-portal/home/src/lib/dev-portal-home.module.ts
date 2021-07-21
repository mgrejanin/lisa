import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { DevPortalSharedModule } from '@picpay/dev-portal/shared';

import { DevPortalRoutingModule } from './dev-portal-home.routing.module';
import { DownloadComponent } from './pages/download/download.component';
import { LandingComponent } from './pages/landing/landing.component';

@NgModule({
    declarations: [LandingComponent, DownloadComponent],
    imports: [CommonModule, DevPortalRoutingModule, DevPortalSharedModule, DesignSystemAngularModule],
})
export class DevPortalHomeModule {}
