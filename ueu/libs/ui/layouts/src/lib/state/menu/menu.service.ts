import { Injectable } from '@angular/core';

// store components
import { MenuStore } from './menu.store';

// interfaces
import { MenuItemParams } from '@picpay/ui/components';

@Injectable({ providedIn: 'root' })
export class MenuService {
    constructor(private menuStore: MenuStore) {}

    setMenuItems(items: MenuItemParams[]): void {
        this.menuStore.updateMenuItems(items);
    }

    setIsMenuOpen(isMenuOpen: boolean): void {
        this.menuStore.updateIsMenuOpen(isMenuOpen);
    }

    setKeepMenuOpen(keepMenuOpen: boolean): void {
        this.menuStore.updateKeepMenuOpen(keepMenuOpen);
    }

    setMobileMenuItems(items: MenuItemParams[]): void {
        this.menuStore.updateMobileMenuItems(items);
    }
}
