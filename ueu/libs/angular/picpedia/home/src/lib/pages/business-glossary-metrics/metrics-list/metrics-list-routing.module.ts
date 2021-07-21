import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MetricsListComponent } from './metrics-list.component';

const routes: Routes = [{ path: '', component: MetricsListComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MetricsListRoutingModule {}
