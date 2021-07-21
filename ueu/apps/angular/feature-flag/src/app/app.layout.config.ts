// interfaces
import { DashboardLogoOptions } from '@picpay/ui/components';
import { CommonLayoutsConfig } from '@picpay/ui/layouts';

const desktopMenu = [
    { icon: 'toggle_on', text: 'Funcionalidades', route: '/features' },
    { icon: 'person', text: 'Gestão de acessos', route: '/acessos' },
];

const mobileMenu = [
    { icon: 'toggle_on', text: 'Funcionalidades', route: '/features' },
    { icon: 'person', text: 'Gestão de acessos', route: '/acessos' },
];

export const layoutConfig: CommonLayoutsConfig = {
    menuItems: desktopMenu,
    mobileMenuItems: mobileMenu,
    dashboardLogo: DashboardLogoOptions.FEATURE_FLAG,
    dashboardTitle: 'Houston',
};
