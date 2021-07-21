import { PicpediaRoutePath, PicpediaRouteTitle } from '@picpay/picpedia/shared';
import { DashboardLogoOptions, MenuItemParams } from '@picpay/ui/components';
import { CommonLayoutsConfig } from '@picpay/ui/layouts';

const desktopMenu: MenuItemParams[] = [
    {
        icon: 'home',
        text: 'Início',
        route: '',
        submenus: [
            {
                text: 'Home',
                route: '/' + PicpediaRoutePath.Home,
            },
            {
                text: PicpediaRouteTitle.BusinessGlossary,
                route: '/' + PicpediaRoutePath.BusinessGlossary,
            },
            {
                text: PicpediaRouteTitle.Tags,
                route: '/' + PicpediaRoutePath.Tags,
            },
        ],
    },
    { icon: 'account_balance', text: 'Governança de Dados', route: null, disabled: true },
    { icon: 'analytics', text: 'Repositório de Research', route: null, disabled: true },
];

const mobileMenu = [
    { icon: 'home', text: 'Home', route: PicpediaRoutePath.Home },
    { icon: 'sell', text: PicpediaRouteTitle.Tags, route: PicpediaRoutePath.Tags },
    {
        icon: 'insights',
        text: PicpediaRouteTitle.BusinessGlossary,
        route: PicpediaRoutePath.BusinessGlossary,
        disabled: true,
    },
    { icon: 'account_balance', text: 'Governança de Dados', route: null, disabled: true },
    { icon: 'analytics', text: 'Repositório de Research', route: null, disabled: true },
] as MenuItemParams[];

export const layoutConfig: CommonLayoutsConfig = {
    menuItems: desktopMenu,
    mobileMenuItems: mobileMenu,
    dashboardLogo: DashboardLogoOptions.PICPEDIA,
    dashboardTitle: 'Picpedia',
};
