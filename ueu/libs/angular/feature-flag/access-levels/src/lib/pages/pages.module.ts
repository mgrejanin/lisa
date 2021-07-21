// @angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// modules
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { UiComponentsModule } from '@picpay/ui/components';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '@picpay/feature-flag/shared';

// pages
import { SquadsComponent } from './squads/squads.component';
import { UserManagementComponent } from './user-management/user-management.component';

// routing
import { PagesRoutingModule } from './pages-routing.module';

// directives
import { FeatureFlagAuthDirectivesModule } from '@picpay/feature-flag/auth';

@NgModule({
    declarations: [SquadsComponent, UserManagementComponent],
    imports: [
        CommonModule,
        FeatureFlagAuthDirectivesModule,
        PagesRoutingModule,
        MatSidenavModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        ComponentsModule,
        DesignSystemAngularModule,
        MatTableModule,
        MatSelectModule,
        MatInputModule,
        MatMenuModule,
        UiComponentsModule,
        MatDialogModule,
        SharedModule,
    ],
})
export class PagesModule {}
