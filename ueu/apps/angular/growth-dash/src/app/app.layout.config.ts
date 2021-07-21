import { DashboardLogoOptions } from '@picpay/ui/components';
import { CommonLayoutsConfig } from '@picpay/ui/layouts';

const desktopMenu = [{ icon: 'dashboard', text: 'Campanhas', route: '/campaigns' }];

const mobileMenu = [{ icon: 'dashboard', text: 'Campanhas', route: '/campaigns' }];

export const layoutConfig: CommonLayoutsConfig = {
    menuItems: desktopMenu,
    mobileMenuItems: mobileMenu,
    dashboardLogo: DashboardLogoOptions.GROWTH_DASH,
    dashboardTitle: 'GrowthDash',
};
