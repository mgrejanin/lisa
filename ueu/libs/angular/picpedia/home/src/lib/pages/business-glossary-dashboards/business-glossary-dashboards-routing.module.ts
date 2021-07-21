import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GlossaryDashboardsComponent } from './business-glossary-dashboards.component';

const routes: Routes = [{ path: '', component: GlossaryDashboardsComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GlossaryDashboardsRoutingModule {}
