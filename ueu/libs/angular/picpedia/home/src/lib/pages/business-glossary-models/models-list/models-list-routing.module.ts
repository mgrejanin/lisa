import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ModelsListComponent } from './models-list.component';

const routes: Routes = [{ path: '', component: ModelsListComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ModelsListRoutingModule {}
