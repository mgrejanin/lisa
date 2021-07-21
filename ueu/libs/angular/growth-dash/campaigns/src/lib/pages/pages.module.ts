import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';

import { GrowthDashSharedModule } from '@picpay/growth-dash/shared';

import { PagesRoutingModule } from './pages-routing.module';
import { CampaignsListComponent } from './campaigns-list/campaigns-list.component';

@NgModule({
    declarations: [CampaignsListComponent],
    imports: [CommonModule, MatSidenavModule, PagesRoutingModule, GrowthDashSharedModule],
})
export class PagesModule {}
