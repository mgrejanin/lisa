// interfaces
import { DashboardLogoOptions } from '@picpay/ui/components';
import { CommonLayoutsConfig } from '@picpay/ui/layouts';

const desktopMenu = [
    { icon: 'dashboard', text: 'Dashboard', route: '/dashboard' },
    {
        icon: 'mobile_screen_share',
        text: 'Recargas',
        route: '/recharges',
    },
    {
        icon: 'attach_money',
        text: 'Saques',
        route: '',
        submenus: [
            {
                text: 'Solicitações',
                route: '',
                disabled: true,
            },
            {
                text: 'Alterações de status',
                route: '/withdrawals/solvers',
            },
        ],
    },
    {
        icon: 'payments',
        text: 'Pagamentos',
        route: '',
        submenus: [
            {
                text: 'Contas',
                route: '/bills',
            },
            {
                text: 'Informações de Boletos',
                route: '/billet-payment-information',
            },
        ],
    },
    {
        icon: 'done_all',
        text: 'Conciliação',
        route: '',
        submenus: [
            {
                text: 'Geral',
                route: '/statements',
            },
            {
                text: 'Manual',
                route: '/statements-manual-input',
            },
        ],
    },
    {
        icon: 'mail_outline',
        text: 'Envio de Comprovante',
        route: '/receipt',
    },
    {
        icon: 'account_balance',
        text: 'FIDC',
        route: '',
        submenus: [
            {
                text: 'Visão Sintética',
                route: '/fidc',
            },
            {
                text: 'Visão Analítica',
                route: '/fidc/analytical',
            },
            {
                text: 'Download de Relatórios',
                route: '/fidc/reporting',
            },
        ],
    },
];

const mobileMenu = [{ icon: 'toggle_on', text: 'Finance Dash', route: '/finance-dash' }];

export const layoutConfig: CommonLayoutsConfig = {
    menuItems: desktopMenu,
    mobileMenuItems: mobileMenu,
    dashboardLogo: DashboardLogoOptions.FINANCE_DASH,
    dashboardTitle: 'FinanceDash',
};
