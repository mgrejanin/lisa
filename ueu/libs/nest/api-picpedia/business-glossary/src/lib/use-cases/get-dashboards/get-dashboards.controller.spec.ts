import { Test } from '@nestjs/testing';

import { GetDashboardsController } from './get-dashboards.controller';
import { GetDashboardsService } from './get-dashboards.service';

describe('GetDashboardsController', () => {
    let controller: GetDashboardsController;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [GetDashboardsService],
            controllers: [GetDashboardsController],
        }).compile();

        controller = module.get(GetDashboardsController);
    });

    it('should be defined', () => {
        expect(controller).toBeTruthy();
    });

    it('should return "Welcome to nest/api-picpedia!"', () => {
        expect(controller.getData()).toEqual({ message: 'Welcome to nest/api-picpedia!' });
    });
});
