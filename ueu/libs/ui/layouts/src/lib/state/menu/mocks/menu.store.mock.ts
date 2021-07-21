// interfaces
import { DashboardLogoOptions, MenuItemParams } from '@picpay/ui/components';

export class MenuStoreMock {
    updateMenuItems(items: MenuItemParams[]): void {}

    updateMobileMenuItems(items: MenuItemParams[]): void {}

    updateIsMenuOpen(isMenuOpen: boolean): void {}

    updateKeepMenuOpen(keepMenuOpen: boolean): void {}

    updateLogo(logo: DashboardLogoOptions): void {}

    updateTitle(title: string): void {}
}
