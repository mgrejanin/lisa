import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

import { UiComponentsModule } from '@picpay/ui/components';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { LayoutsModule } from '@picpay/ui/layouts';

import { HeaderComponent } from './components/header/header.component';
import { ModalComponent } from './components/modal/modal.component';
import { LayoutComponent } from './components/layout/layout.component';

@NgModule({
    declarations: [HeaderComponent, ModalComponent, LayoutComponent],
    imports: [
        CommonModule,
        UiComponentsModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        DesignSystemAngularModule,
        RouterModule,
        LayoutsModule,
    ],
    entryComponents: [ModalComponent],
    exports: [HeaderComponent, ModalComponent, LayoutComponent],
})
export class OpsDashSharedModule {}
