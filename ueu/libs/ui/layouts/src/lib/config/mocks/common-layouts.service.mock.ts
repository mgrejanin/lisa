// interfaces
import { CommonLayoutsConfig } from '../common-layouts.config';

// libs
import { DashboardLogoOptions } from '@picpay/ui/components';

export class CommonLayoutsServiceMock {
    getConfig(): CommonLayoutsConfig {
        return {
            menuItems: [],
            mobileMenuItems: [],
            dashboardLogo: DashboardLogoOptions.FEATURE_FLAG,
            dashboardTitle: 'Houston',
        };
    }
}
