import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { UiComponentsModule } from '@picpay/ui/components';
import { ContainerComponent } from './components/container/container.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { KeycloakDemoHomeRoutingModule } from './keycloak-demo-home.routing.module';
import { LayoutsModule } from '@picpay/ui/layouts';
import { LayoutComponent } from './components/layout/layout.component';

@NgModule({
    declarations: [HomeComponent, HeaderComponent, ContainerComponent, LayoutComponent],
    imports: [
        CommonModule,
        KeycloakDemoHomeRoutingModule,
        UiComponentsModule,
        MatIconModule,
        DesignSystemAngularModule,
        MatDividerModule,
        MatButtonModule,
        LayoutsModule,
    ],
})
export class KeycloakDemoHomeModule {}
