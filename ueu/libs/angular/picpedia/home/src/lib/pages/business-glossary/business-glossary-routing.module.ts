import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BusinessGlossaryComponent } from './business-glossary.component';

const routes: Routes = [{ path: '', component: BusinessGlossaryComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BusinessGlossaryRoutingModule {}
