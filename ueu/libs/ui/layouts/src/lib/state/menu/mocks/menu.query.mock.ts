// rxjs
import { Observable, of } from 'rxjs';

// interfaces & mocks
import { DashboardLogoOptions, MenuItemParams, MenuItemParamsMock } from '@picpay/ui/components';

export class MenuQueryMock {
    menuItems$: Observable<MenuItemParams[]>;
    mobileMenuItems$: Observable<MenuItemParams[]>;
    isMenuOpen$: Observable<boolean>;
    keepMenuOpen$: Observable<boolean>;
    logo$: Observable<DashboardLogoOptions>;
    title$: Observable<string>;

    constructor() {
        this.menuItems$ = of([MenuItemParamsMock]);
        this.mobileMenuItems$ = of([MenuItemParamsMock]);
        this.isMenuOpen$ = of(true);
        this.keepMenuOpen$ = of(true);
        this.logo$ = of(DashboardLogoOptions.FEATURE_FLAG);
        this.title$ = of('mockTitle');
    }
}
