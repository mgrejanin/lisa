import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// angular material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

// modules
import { UiComponentsModule } from '@picpay/ui/components';
import { ComponentsModule } from './components/components.module';
import { PagesModule } from './pages/pages.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ComponentsModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        PagesModule,
        UiComponentsModule,
    ],
})
export class FeaturesModule {}
