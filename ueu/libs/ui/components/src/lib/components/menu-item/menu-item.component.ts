import { Component, Input } from '@angular/core';

// interfaces
import { MenuItemParams } from '../../interfaces';

@Component({
    selector: 'picpay-menu-item',
    templateUrl: './menu-item.component.html',
    styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent {
    @Input() params: MenuItemParams;

    @Input() isCollapsed: boolean;
}
