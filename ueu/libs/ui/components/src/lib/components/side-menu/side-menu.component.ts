import { Component, EventEmitter, Input, Output } from '@angular/core';

// interfaces
import { DashboardLogoOptions, MenuItemParams } from '../../interfaces';

@Component({
    selector: 'picpay-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent {
    @Input() logo: DashboardLogoOptions;

    @Input() title: string;

    @Input() items: MenuItemParams[];

    @Input() isOpen: boolean;

    @Input() keepOpen: boolean;

    @Output() toggleKeepMenuOpen: EventEmitter<boolean>;

    @Output() toggleIsMenuOpen: EventEmitter<boolean>;

    constructor() {
        this.toggleKeepMenuOpen = new EventEmitter();
        this.toggleIsMenuOpen = new EventEmitter();
    }

    onToggleKeepMenuOpen(value: boolean): void {
        this.toggleKeepMenuOpen.emit(value);
    }

    onToggleIsMenuOpen(value: boolean): void {
        this.toggleIsMenuOpen.emit(value);
    }

    onMouseOverLockButton(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
    }
}
