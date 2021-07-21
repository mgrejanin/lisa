import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FirstAccessComponent } from './first-access.component';
import { OpsDashFirstAccessRoutingModule } from './first-access-routing.module';
import { OpsDashSharedModule } from '@picpay/ops-dash/shared';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';

@NgModule({
    declarations: [FirstAccessComponent],
    imports: [CommonModule, OpsDashFirstAccessRoutingModule, OpsDashSharedModule, DesignSystemAngularModule],
})
export class OpsDashFirstAccessModule {}
