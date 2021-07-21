import { Test } from '@nestjs/testing';

import { GetDashboardsService } from './get-dashboards.service';

describe('GetDashboardsService', () => {
    let service: GetDashboardsService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [GetDashboardsService],
        }).compile();

        service = module.get(GetDashboardsService);
    });

    it('should be defined', () => {
        expect(service).toBeTruthy();
    });

    it('should return "Welcome to nest/api-picpedia!" on getData', () => {
        expect(service.getData()).toEqual({ message: 'Welcome to nest/api-picpedia!' });
    });
});
