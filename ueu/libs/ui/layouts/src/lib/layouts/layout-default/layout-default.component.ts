import { Component } from '@angular/core';

// state
import { DashboardLogoOptions, MenuItemParams } from '@picpay/ui/components';
import { MenuQuery, MenuService } from '../../state';

// rxjs
import { Observable } from 'rxjs';

@Component({
    selector: 'picpay-layout-default',
    templateUrl: './layout-default.component.html',
    styleUrls: ['./layout-default.component.scss'],
})
export class LayoutDefaultComponent {
    logo$: Observable<DashboardLogoOptions>;
    title$: Observable<string>;
    items$: Observable<MenuItemParams[]>;
    isOpen$: Observable<boolean>;
    keepOpen$: Observable<boolean>;
    mobileItems$: Observable<MenuItemParams[]>;

    constructor(private menuQuery: MenuQuery, private menuService: MenuService) {
        this.logo$ = this.menuQuery.logo$;
        this.title$ = this.menuQuery.title$;
        this.items$ = this.menuQuery.menuItems$;
        this.mobileItems$ = this.menuQuery.mobileMenuItems$;
        this.isOpen$ = this.menuQuery.isMenuOpen$;
        this.keepOpen$ = this.menuQuery.keepMenuOpen$;
    }

    toggleIsMenuOpen(value: boolean): void {
        this.menuService.setIsMenuOpen(value);
    }

    toggleKeepMenuOpen(value: boolean): void {
        this.menuService.setKeepMenuOpen(value);
    }
}
