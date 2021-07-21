import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultErrorScreenComponent } from './pages/default-error-screen/default-error-screen.component';

const routes: Routes = [{ path: '', component: DefaultErrorScreenComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SharedDefaultScreensRoutingModule {}
