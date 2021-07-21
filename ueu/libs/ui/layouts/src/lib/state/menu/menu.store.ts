import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

// interfaces
import { DashboardLogoOptions, MenuItemParams } from '@picpay/ui/components';
import { CommonLayoutsService } from '../../config/common-layouts.service';

export interface MenuState {
    items: MenuItemParams[];
    mobileItems: MenuItemParams[];
    isMenuOpen: boolean;
    keepMenuOpen: boolean;
    logo: DashboardLogoOptions | null;
    title: string;
}

export function createInitialState(): MenuState {
    return {
        items: [],
        mobileItems: [],
        isMenuOpen: true,
        keepMenuOpen: true,
        logo: null,
        title: '',
    };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'menu' })
export class MenuStore extends Store<MenuState> {
    constructor(private layoutsService: CommonLayoutsService) {
        super(createInitialState());

        const config = this.layoutsService.getConfig();

        this.updateMenuItems(config.menuItems);
        this.updateMobileMenuItems(config.mobileMenuItems);
        this.updateLogo(config.dashboardLogo);
        this.updateTitle(config.dashboardTitle);
    }

    updateMenuItems(items: MenuItemParams[]): void {
        this.update(state => ({ ...state, items }));
    }

    updateMobileMenuItems(mobileItems: MenuItemParams[]): void {
        this.update(state => ({ ...state, mobileItems }));
    }

    updateIsMenuOpen(isMenuOpen: boolean): void {
        // Doesnt set isMenuOpen to false
        // if keepMenuOpen is true.
        if (!isMenuOpen && this.getValue().keepMenuOpen) {
            return;
        }

        this.update({ isMenuOpen });
    }

    updateKeepMenuOpen(keepMenuOpen: boolean): void {
        this.update(state => ({ ...state, keepMenuOpen, isMenuOpen: keepMenuOpen }));
    }

    updateLogo(logo: DashboardLogoOptions): void {
        this.update(state => ({ ...state, logo }));
    }

    updateTitle(title: string): void {
        this.update(state => ({ ...state, title }));
    }
}
