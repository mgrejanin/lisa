import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// akita
import { Query } from '@datorama/akita';

// store components
import { MenuState, MenuStore } from './menu.store';

// rxjs
import { Observable } from 'rxjs';

// interfaces
import { DashboardLogoOptions, MenuItemParams } from '@picpay/ui/components';

@Injectable({ providedIn: 'root' })
export class MenuQuery extends Query<MenuState> {
    readonly menuItems$: Observable<MenuItemParams[]>;
    readonly mobileMenuItems$: Observable<MenuItemParams[]>;
    readonly isMenuOpen$: Observable<boolean>;
    readonly keepMenuOpen$: Observable<boolean>;
    readonly logo$: Observable<DashboardLogoOptions>;
    readonly title$: Observable<string>;

    constructor(protected store: MenuStore, private route: ActivatedRoute, private router: Router) {
        super(store);

        this.menuItems$ = this.select('items');

        this.mobileMenuItems$ = this.select('mobileItems');

        this.isMenuOpen$ = this.select('isMenuOpen');

        this.keepMenuOpen$ = this.select('keepMenuOpen');

        this.logo$ = this.select('logo');

        this.title$ = this.select('title');
    }
}
