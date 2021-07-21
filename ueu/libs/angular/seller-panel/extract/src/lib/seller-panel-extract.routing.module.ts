import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { ExtractContainerComponent } from './containers/extract-container/extract-container.component';
import { ExtractComponent } from './pages/extract/extract.component';
import { FutureReleasesComponent } from './pages/future-releases/future-releases.component';

const routes: Routes = [
    {
        path: '',
        component: ExtractComponent,
        children: [
            {
                path: 'lancamentos-futuros',
                component: FutureReleasesComponent,
                data: { trackData: { eventLabel: 'Future Releases' } },
            },
            {
                path: 'listagem',
                component: ExtractContainerComponent,
                data: { trackData: { eventLabel: 'Extract List' } },
            },
            { path: '', redirectTo: 'listagem', pathMatch: 'full' },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SellerPanelExtractRoutingModule {}
