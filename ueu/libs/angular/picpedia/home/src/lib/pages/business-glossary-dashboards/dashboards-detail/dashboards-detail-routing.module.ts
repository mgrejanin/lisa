import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardsDetailComponent } from './dashboards-detail.component';

const routes: Routes = [{ path: '', component: DashboardsDetailComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardsDetailRoutingModule {}
