import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';

// components
import { SwaggerScrollComponent } from './swagger-scroll/swagger-scroll.component';

@NgModule({
    declarations: [SwaggerScrollComponent],
    imports: [CommonModule, DesignSystemAngularModule],
    exports: [SwaggerScrollComponent],
})
export class ComponentsModule {}
