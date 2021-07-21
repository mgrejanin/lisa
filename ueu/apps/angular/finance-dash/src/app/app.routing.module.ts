import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PicpayKeycloakGuard } from '@picpay/keycloak';
// layouts
import { LayoutDefaultComponent, LayoutsModule } from '@picpay/ui/layouts';

const routes: Routes = [
    {
        path: 'recharges',
        component: LayoutDefaultComponent,
        canLoad: [PicpayKeycloakGuard],
        loadChildren: () => import('@picpay/finance-dash/recharges').then(module => module.FinanceDashRechargesModule),
    },
    { path: '', redirectTo: 'recharges', pathMatch: 'full' },
    { path: '**', redirectTo: '' },
];

@NgModule({
    imports: [
        LayoutsModule,
        RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', initialNavigation: 'disabled' }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
