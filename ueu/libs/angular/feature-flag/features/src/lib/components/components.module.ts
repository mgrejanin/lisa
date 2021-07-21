import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// components
import { FeatureDetailsComponent } from './feature-details/feature-details.component';
import { FeatureLogComponent } from './feature-log/feature-log.component';
import { FeatureSegmentationComponent } from './feature-segmentation/feature-segmentation.component';

// modules
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { UiComponentsModule } from '@picpay/ui/components';
import { SharedModule } from '@picpay/feature-flag/shared';
import { SharedPipesModule } from '@picpay/angular/shared/pipes';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';

// directives
import { FeatureFlagAuthDirectivesModule } from '@picpay/feature-flag/auth';

@NgModule({
    declarations: [FeatureDetailsComponent, FeatureLogComponent, FeatureSegmentationComponent],

    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatTabsModule,
        UiComponentsModule,
        SharedModule,
        SharedPipesModule,
        DesignSystemAngularModule,
        FeatureFlagAuthDirectivesModule,
    ],
    exports: [FeatureDetailsComponent, FeatureLogComponent, FeatureSegmentationComponent],
})
export class ComponentsModule {}
