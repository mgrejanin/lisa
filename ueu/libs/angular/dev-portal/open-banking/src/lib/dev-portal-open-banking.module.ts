import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { DevPortalSharedModule } from '@picpay/dev-portal/shared';
import { SharedTrackEventsDirectivesModule } from '@picpay/angular/shared/track-events';

import { DevPortalOpenBankingRoutingModule } from './dev-portal-open-banking.routing.module';
import { OpenBankingComponent } from './pages/open-banking/open-banking.component';
import { TimelineComponent } from './components/timeline/timeline.component';

@NgModule({
    declarations: [OpenBankingComponent, TimelineComponent],
    imports: [
        CommonModule,
        DevPortalOpenBankingRoutingModule,
        DevPortalSharedModule,
        DesignSystemAngularModule,
        SharedTrackEventsDirectivesModule,
    ],
})
export class DevPortalOpenBankingModule {}
