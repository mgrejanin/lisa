import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { B2PGuard } from '@picpay/seller-panel/shared';
import { GenerateCredentialsComponent } from './components/generate-credentials/generate-credentials.component';
import { CredentialsComponent } from './pages/credentials/credentials.component';

const routes: Routes = [
    {
        path: '',
        component: CredentialsComponent,
        canActivate: [B2PGuard],
    },
    {
        path: 'gerar-credencial',
        component: GenerateCredentialsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SellerPanelCredentialsRoutingModule {}
