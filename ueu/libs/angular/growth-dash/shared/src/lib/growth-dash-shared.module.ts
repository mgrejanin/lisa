import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

import { UiComponentsModule } from '@picpay/ui/components';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { LayoutsModule } from '@picpay/ui/layouts';
import { GrowthDashLayoutComponent } from './components/growth-dash-layout/growth-dash-layout.component';
import { GrowthDashHeaderComponent } from './components/growth-dash-header/growth-dash-header.component';

@NgModule({
    declarations: [GrowthDashLayoutComponent, GrowthDashHeaderComponent],
    imports: [
        CommonModule,
        RouterModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        UiComponentsModule,
        DesignSystemAngularModule,
        LayoutsModule,
    ],
    exports: [GrowthDashLayoutComponent, GrowthDashHeaderComponent],
})
export class GrowthDashSharedModule {}
