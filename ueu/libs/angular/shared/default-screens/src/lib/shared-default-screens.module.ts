import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { DefaultErrorScreenComponent } from './pages/default-error-screen/default-error-screen.component';
import { SharedDefaultScreensRoutingModule } from './shared-default-screens.routing.module';

@NgModule({
    imports: [CommonModule, SharedDefaultScreensRoutingModule, DesignSystemAngularModule],
    declarations: [DefaultErrorScreenComponent],
})
export class SharedDefaultScreensModule {}
