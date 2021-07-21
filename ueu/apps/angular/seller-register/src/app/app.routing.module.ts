import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'form', pathMatch: 'full' },
    {
        path: 'form',
        loadChildren: () => import('@picpay/seller-register/form').then(module => module.SellerRegisterFormModule),
        canActivate: [],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
