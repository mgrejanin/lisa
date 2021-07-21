// interfaces
import { DashboardLogoOptions } from '@picpay/ui/components';
import { CommonLayoutsConfig } from '@picpay/ui/layouts';

const desktopMenu = [
    {
        icon: 'code',
        text: 'Variáveis',
        route: '/dashboard',
    },
    {
        icon: 'info',
        text: 'Primeiro acesso',
        route: '/first-access',
    },
];

const mobileMenu = [
    { icon: 'code', text: 'Variáveis', route: '/dashboard' },
    { icon: 'info', text: 'Primeiro acesso', route: '/first-access' },
];

export const layoutConfig: CommonLayoutsConfig = {
    menuItems: desktopMenu,
    mobileMenuItems: mobileMenu,
    dashboardLogo: DashboardLogoOptions.OPSDASH,
    dashboardTitle: 'OpsDash',
};
