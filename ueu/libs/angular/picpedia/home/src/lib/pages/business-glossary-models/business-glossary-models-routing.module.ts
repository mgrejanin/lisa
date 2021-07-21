import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GlossaryModelsComponent } from './business-glossary-models.component';

const routes: Routes = [{ path: '', component: GlossaryModelsComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GlossaryModelsRoutingModule {}
