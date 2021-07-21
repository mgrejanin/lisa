import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SellerPanelAuthGuard, SellerPanelSessionGuard } from '@picpay/seller-panel/auth';

// layouts
import { LayoutsModule } from '@picpay/ui/layouts';
import { LayoutComponent } from '@picpay/seller-panel/shared';

const routes: Routes = [
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    {
        path: 'login',
        loadChildren: () => import('@picpay/seller-panel/login').then(module => module.SellerPanelLoginModule),
        canLoad: [SellerPanelSessionGuard],
    },
    {
        path: 'esqueci-a-senha',
        loadChildren: () =>
            import('@picpay/seller-panel/forgot-password').then(module => module.SellerPanelForgotPasswordModule),
        canLoad: [SellerPanelSessionGuard],
    },
    {
        path: 'inicio',
        component: LayoutComponent,
        loadChildren: () => import('@picpay/seller-panel/home').then(module => module.SellerPanelHomeModule),
        canLoad: [SellerPanelAuthGuard],
    },
    {
        path: 'transacoes',
        component: LayoutComponent,
        loadChildren: () =>
            import('@picpay/seller-panel/transactions').then(module => module.SellerPanelTransactionsModule),
        canLoad: [SellerPanelAuthGuard],
    },
    {
        path: 'extrato',
        component: LayoutComponent,
        loadChildren: () => import('@picpay/seller-panel/extract').then(module => module.SellerPanelExtractModule),
        canLoad: [SellerPanelAuthGuard],
    },
    {
        path: 'cobrar',
        component: LayoutComponent,
        loadChildren: () => import('@picpay/seller-panel/charge').then(module => module.SellerPanelChargeModule),
        canLoad: [SellerPanelAuthGuard],
    },
    {
        path: 'integracoes',
        component: LayoutComponent,
        loadChildren: () =>
            import('@picpay/seller-panel/integrations').then(module => module.SellerPanelIntegrationsModule),
        canLoad: [SellerPanelAuthGuard],
    },
    {
        path: 'credenciais',
        component: LayoutComponent,
        loadChildren: () =>
            import('@picpay/seller-panel/credentials').then(module => module.SellerPanelCredentialsModule),
        canLoad: [SellerPanelAuthGuard],
    },
    {
        path: 'configuracoes',
        loadChildren: () => import('@picpay/seller-panel/settings').then(module => module.SellerPanelSettingsModule),
        canLoad: [SellerPanelAuthGuard],
    },
    {
        path: 'remessa-de-credito',
        loadChildren: () => import('@picpay/seller-panel/shipment').then(module => module.SellerPanelShipmentModule),
        canLoad: [SellerPanelAuthGuard],
    },
    { path: '**', redirectTo: '/login' },
];

@NgModule({
    imports: [LayoutsModule, RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
