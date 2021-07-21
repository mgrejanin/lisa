import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HelpComponent } from './help.component';
import { OpsDashHelpRoutingModule } from './help-routing.module';
import { OpsDashSharedModule } from '@picpay/ops-dash/shared';

@NgModule({
    declarations: [HelpComponent],
    imports: [CommonModule, OpsDashHelpRoutingModule, OpsDashSharedModule],
})
export class OpsDashHelpModule {}
