import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { VariablesHomeComponent } from './pages/variables/variables.component';

const routes: Routes = [{ path: '', component: VariablesHomeComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OpsDashVariablesRoutingModule {}
