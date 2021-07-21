import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { DevPortalSharedModule } from '@picpay/dev-portal/shared';
import { UiComponentsModule } from '@picpay/ui/components';
import { LayoutsModule } from '@picpay/ui/layouts';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DevPortalDashboardRoutingModule } from './dev-portal-dashboard.routing.module';
import { NewProjectComponent } from './pages/new-project/new-project.component';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import { AvatarComponent } from './components/avatar/avatar.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DashboardHeaderComponent } from './components/header/header.component';
import { InfoStepsMobileComponent } from './components/info-steps-mobile/info-steps-mobile.component';
@NgModule({
    declarations: [
        DashboardHeaderComponent,
        AvatarComponent,
        DashboardComponent,
        InfoStepsMobileComponent,
        NewProjectComponent,
        ProjectDetailsComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        LayoutsModule,
        MatSelectModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        UiComponentsModule,
        DevPortalSharedModule,
        DesignSystemAngularModule,
        DevPortalDashboardRoutingModule,
    ],
    exports: [DashboardHeaderComponent],
})
export class DevPortalDashboardModule {}
