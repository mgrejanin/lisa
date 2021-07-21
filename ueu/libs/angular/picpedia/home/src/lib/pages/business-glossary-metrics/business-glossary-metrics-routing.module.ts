import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GlossaryMetricsComponent } from './business-glossary-metrics.component';

const routes: Routes = [{ path: '', component: GlossaryMetricsComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GlossaryMetricsRoutingModule {}
