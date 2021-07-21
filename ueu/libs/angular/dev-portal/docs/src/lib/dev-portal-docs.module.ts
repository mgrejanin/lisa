import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { DevPortalSharedModule } from '@picpay/dev-portal/shared';

import { ComponentsModule } from './components/components.module';
import { DevPortalDocsRoutingModule } from './dev-portal-docs.routing.module';

import { ApiReferenceComponent } from './pages/api-reference/api-reference.component';
import { AssinaturasComponent } from './pages/products/assinaturas/assinaturas.component';
import { B2pComponent } from './pages/products/b2p/b2p.component';
import { ECommerceComponent } from './pages/products/e-commerce/e-commerce.component';
import { OpenPlatformComponent } from './pages/products/open-platform/open-platform.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ComponentsModule,
        DevPortalDocsRoutingModule,
        DesignSystemAngularModule,
        DevPortalSharedModule,
    ],
    declarations: [
        ApiReferenceComponent,
        AssinaturasComponent,
        B2pComponent,
        ECommerceComponent,
        OpenPlatformComponent,
    ],
    exports: [],
})
export class DevPortalDocsModule {}
