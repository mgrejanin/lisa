import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { UiComponentsModule } from '@picpay/ui/components';
import { LayoutsModule } from '@picpay/ui/layouts';

import { BadgeComponent } from './components/badge/badge.component';
import { NavbarHeaderComponent } from './components/navbar-header/navbar-header.component';
import { LayoutComponent } from './components/layout/layout.component';

@NgModule({
    declarations: [BadgeComponent, NavbarHeaderComponent, LayoutComponent],
    imports: [
        CommonModule,
        DesignSystemAngularModule,
        MatButtonModule,
        MatIconModule,
        UiComponentsModule,
        RouterModule,
        LayoutsModule,
    ],
    exports: [BadgeComponent, NavbarHeaderComponent, LayoutComponent],
})
export class SharedModule {}
