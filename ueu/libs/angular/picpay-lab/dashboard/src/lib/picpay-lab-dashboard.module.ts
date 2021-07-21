import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages/pages.routing.modules';
import { MatIconModule } from '@angular/material/icon';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { LabComponentsAngularModule } from '@picpay/lab-components-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';

//Components
import { PicpayLabDeviceComponent } from './components/device/device.component';
import { PicpayLabHomePageComponent } from './pages/home/home.component';
import { PicpayLabSideMenuComponent } from './components/sidemenu/side-menu.component';
import { PicpayLabHeaderComponent } from './components/header/header.component';
import { PicPayLabModalUseExampleComponent } from './components/modal-use-example/modal-use-example.component';
import { PicPayLabSectionComponent } from './components/section/section.component';
import { PicpayLabSidePanelComponent } from './components/sidepanel/sidepanel.component';
import { PicPayLabSectionService } from './services/section/section.service';

const materialModules = [MatIconModule, MatButtonModule, MatDialogModule, DragDropModule];
@NgModule({
    imports: [
        CommonModule,
        DesignSystemAngularModule,
        LabComponentsAngularModule,
        PagesRoutingModule,
        ...materialModules,
    ],
    declarations: [
        PicpayLabDeviceComponent,
        PicpayLabHomePageComponent,
        PicpayLabSideMenuComponent,
        PicpayLabSidePanelComponent,
        PicpayLabHeaderComponent,
        PicPayLabModalUseExampleComponent,
        PicPayLabSectionComponent,
    ],
    exports: [
        PicpayLabDeviceComponent,
        PicpayLabHeaderComponent,
        PicPayLabModalUseExampleComponent,
        PicpayLabSideMenuComponent,
        PicPayLabSectionComponent,
    ],
    providers: [PicPayLabSectionService],
})
export class PicpayLabDashboardModule {}
