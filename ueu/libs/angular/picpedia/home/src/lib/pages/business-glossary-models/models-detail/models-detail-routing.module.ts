import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ModelsDetailComponent } from './models-detail.component';

const routes: Routes = [{ path: '', component: ModelsDetailComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ModelsDetailRoutingModule {}
