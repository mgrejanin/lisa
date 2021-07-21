import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';

import { RouterModule } from '@angular/router';
import { BadgeCertificationComponent } from './badge-certification.component';

@NgModule({
    declarations: [BadgeCertificationComponent],
    imports: [CommonModule, DesignSystemAngularModule, RouterModule],
    exports: [BadgeCertificationComponent],
})
export class BadgeCertificationModule {}
