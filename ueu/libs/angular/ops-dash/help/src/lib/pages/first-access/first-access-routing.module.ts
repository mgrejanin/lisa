import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { FirstAccessComponent } from './first-access.component';

const routes: Routes = [{ path: '', component: FirstAccessComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OpsDashFirstAccessRoutingModule {}
