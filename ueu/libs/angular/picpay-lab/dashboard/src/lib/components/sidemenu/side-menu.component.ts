import { Component, Input, Output, EventEmitter } from '@angular/core';

import { MenuItem } from '../../models/menu-item';
@Component({
    selector: 'picpay-lab-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.scss'],
})
export class PicpayLabSideMenuComponent {
    @Input() items: MenuItem[];

    @Input() disabledOptions: boolean;

    @Output() openMenuOption: EventEmitter<MenuItem> = new EventEmitter<MenuItem>();

    onActiveOrInactiveMenuOption(item: MenuItem): void {
        //ativa ou desativa a opção clicada.
        item.isActive = !item.isActive;

        this.items = this.items.map(option => {
            if (item.id !== option.id) option.isActive = false;
            return option;
        });

        this.openMenuOption.emit(item);
    }
}
