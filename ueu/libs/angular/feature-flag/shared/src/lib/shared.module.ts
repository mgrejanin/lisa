import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// modules
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { UiComponentsModule } from '@picpay/ui/components';
import { LayoutsModule } from '@picpay/ui/layouts';

// components
import { HeaderComponent } from './components/header/header.component';
import { FeatureFlagLayoutComponent } from './components/feature-flag-layout/feature-flag-layout.component';

@NgModule({
    declarations: [HeaderComponent, FeatureFlagLayoutComponent],
    imports: [CommonModule, UiComponentsModule, LayoutsModule, MatIconModule, MatButtonModule, RouterModule],
    exports: [HeaderComponent, FeatureFlagLayoutComponent],
})
export class SharedModule {}
