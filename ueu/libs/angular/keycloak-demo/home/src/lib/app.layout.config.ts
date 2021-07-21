// interfaces
import { DashboardLogoOptions, MenuItemParams } from '@picpay/ui/components';
import { CommonLayoutsConfig } from '@picpay/ui/layouts';

export const menu: MenuItemParams[] = [
    { icon: 'home', text: 'Home', route: '/home' },
    {
        icon: 'lock',
        text: 'Admin',
        route: '/admin',
        roles: ['admin'],
    },
];

export const layoutConfig: CommonLayoutsConfig = {
    menuItems: menu,
    mobileMenuItems: menu,
    dashboardLogo: DashboardLogoOptions.HERODASH,
    dashboardTitle: 'Keycloak',
};
