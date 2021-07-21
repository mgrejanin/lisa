// interfaces
import { MenuItemParams } from '@picpay/ui/components';

export class MenuServiceMock {
    setMenuItems(items: MenuItemParams[]): void {}

    setMobileMenuItems(items: MenuItemParams[]): void {}

    setIsMenuOpen(isMenuOpen: boolean): void {}

    setKeepMenuOpen(keepMenuOpen: boolean): void {}
}
