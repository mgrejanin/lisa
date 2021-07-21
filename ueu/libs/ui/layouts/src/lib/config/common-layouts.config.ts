import { InjectionToken } from '@angular/core';

// interfaces
import { DashboardLogoOptions, MenuItemParams } from '@picpay/ui/components';

export interface CommonLayoutsConfig {
    menuItems: MenuItemParams[];
    mobileMenuItems: MenuItemParams[];
    dashboardLogo?: DashboardLogoOptions;
    dashboardTitle?: string;
}

export const CommonLayoutsConfigService = new InjectionToken<CommonLayoutsConfig>('LayoutsConfig');
