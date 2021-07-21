import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// routing
import { PagesRoutingModule } from './pages-routing.module';

// components
import { FeatureWorkbenchComponent } from './feature-workbench/feature-workbench.component';
import { FeaturesListComponent } from './features-list/features-list.component';

// modules
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { SharedPipesModule } from '@picpay/angular/shared/pipes';
import { ComponentsModule } from '../components/components.module';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from '@picpay/feature-flag/shared';

// directives
import { FeatureFlagAuthDirectivesModule } from '@picpay/feature-flag/auth';
@NgModule({
    declarations: [FeaturesListComponent, FeatureWorkbenchComponent],
    imports: [
        CommonModule,
        ComponentsModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatSidenavModule,
        MatTableModule,
        PagesRoutingModule,
        ReactiveFormsModule,
        SharedPipesModule,
        SharedModule,
        FeatureFlagAuthDirectivesModule,
        NgxMaskModule.forRoot({ validation: false }),
    ],
})
export class PagesModule {}
