// interfaces
import { SellerUser } from '@picpay/seller-panel/helpers';
import { DashboardLogoOptions, MenuItemParams } from '@picpay/ui/components';
import { CommonLayoutsConfig } from '@picpay/ui/layouts';

export const menuItems: MenuItemParams[] = [
    {
        icon: 'home',
        text: 'Início',
        route: '/inicio',
    },
    {
        icon: 'format_list_bulleted',
        text: 'Transações',
        route: '/transacoes',
    },
    {
        icon: 'local_atm',
        text: 'Extrato',
        route: '/extrato',
    },
    {
        icon: 'assignment',
        text: 'Credenciais',
        route: '/credenciais',
        roles: [SellerUser.B2P],
    },
    {
        icon: 'account_balance_wallet',
        text: 'Cobrar',
        route: '/cobrar',
        roles: [SellerUser.BIZ],
    },
    {
        icon: 'share',
        text: 'Integrações',
        route: '/integracoes',
        roles: [SellerUser.ECOMMERCE],
    },
];

export const layoutConfig: CommonLayoutsConfig = {
    menuItems,
    mobileMenuItems: menuItems,
    dashboardLogo: DashboardLogoOptions.SELLER_PANEL,
    dashboardTitle: '',
};
