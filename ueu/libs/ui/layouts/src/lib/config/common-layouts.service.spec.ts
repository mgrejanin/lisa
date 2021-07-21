import { TestBed } from '@angular/core/testing';

import { CommonLayoutsConfig, CommonLayoutsConfigService } from './common-layouts.config';

// services
import { CommonLayoutsService } from './common-layouts.service';

// libs
import { DashboardLogoOptions } from '@picpay/ui/components';

describe('CommonLayoutsService', () => {
    let service: CommonLayoutsService;

    const apiConfig: CommonLayoutsConfig = {
        menuItems: [],
        mobileMenuItems: [],
        dashboardLogo: DashboardLogoOptions.FEATURE_FLAG,
        dashboardTitle: 'Houston',
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CommonLayoutsService, { provide: CommonLayoutsConfigService, useValue: apiConfig }],
        });
        service = TestBed.inject(CommonLayoutsService);
    });

    it('should be created', () => {
        expect(service).toBeDefined();
    });

    it('should have getConfig function', () => {
        const config = service.getConfig();

        expect(config).toEqual(apiConfig);
    });
});
