import { Module } from '@nestjs/common';

import { GetDashboardsController } from './get-dashboards.controller';
import { GetDashboardsService } from './get-dashboards.service';

@Module({
    controllers: [GetDashboardsController],
    providers: [GetDashboardsService],
    exports: [GetDashboardsService],
})
export class GetDashboardsModule {}
