import { Component, Input } from '@angular/core';

// interfaces
import { MenuItemParams } from '../../interfaces';

@Component({
    selector: 'picpay-mobile-fixed-menu',
    templateUrl: './mobile-fixed-menu.component.html',
    styleUrls: ['./mobile-fixed-menu.component.scss'],
})
export class MobileFixedMenuComponent {
    @Input() items: MenuItemParams[];
}
