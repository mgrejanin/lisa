import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// components
import { LayoutDefaultComponent } from './layout-default/layout-default.component';

// modules
import { MatSidenavModule } from '@angular/material/sidenav';
import { UiComponentsModule } from '@picpay/ui/components';

@NgModule({
    declarations: [LayoutDefaultComponent],
    imports: [CommonModule, UiComponentsModule, MatSidenavModule, RouterModule],
    exports: [LayoutDefaultComponent],
})
export class LayoutsModule {}
