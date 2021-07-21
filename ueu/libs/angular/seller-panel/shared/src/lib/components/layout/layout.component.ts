import { Component } from '@angular/core';
import { MenuQuery } from '@picpay/ui/layouts';
import { Observable } from 'rxjs';

@Component({
    selector: 'seller-panel-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
    isOpen$: Observable<boolean>;

    constructor(private menuQuery: MenuQuery) {
        this.isOpen$ = this.menuQuery.isMenuOpen$;
    }
}
