import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { GetDashboardsService } from './get-dashboards.service';

@ApiTags('Business Glossary')
@Controller('business-glossary/get-dashboards')
export class GetDashboardsController {
    constructor(private getDashboardsService: GetDashboardsService) {}

    @Get()
    getData() {
        return this.getDashboardsService.getData();
    }
}
