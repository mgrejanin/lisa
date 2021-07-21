import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MetricsDetailComponent } from './metrics-detail.component';

const routes: Routes = [{ path: '', component: MetricsDetailComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MetricsDetailRoutingModule {}
