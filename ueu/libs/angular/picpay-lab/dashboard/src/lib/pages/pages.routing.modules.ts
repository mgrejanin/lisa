import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { PicpayLabHomePageComponent } from './home/home.component';

const routes: Routes = [{ path: '', component: PicpayLabHomePageComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {}
