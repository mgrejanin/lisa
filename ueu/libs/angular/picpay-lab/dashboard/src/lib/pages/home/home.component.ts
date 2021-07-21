import { Component, ViewChild } from '@angular/core';

// interfaces
import { MenuItem } from '../../models/menu-item';
import { PicpayLabSideMenuComponent } from '../../components/sidemenu/side-menu.component';
import { Section } from '../../models/section.model';

import { CdkDragDrop, moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';
import { slideInOut } from '../../animations/slideInOut';
import { deviceMove } from '../../animations/deviceMove';

@Component({
    selector: 'picpay-lab-home-page',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [slideInOut, deviceMove],
})
export class PicpayLabHomePageComponent {
    itemsMenu: MenuItem[];

    itemActive: MenuItem;

    items: Section[];

    menuState: 'in' | 'out' = 'out';

    @ViewChild(PicpayLabSideMenuComponent) sidemenu: PicpayLabSideMenuComponent;

    constructor() {
        this.itemsMenu = [
            {
                id: 1,
                icon: 'add',
                text: 'Adicionar seção',
                isActive: false,
                description: 'São os elementos para você montar sua loja.',
            },
            {
                id: 2,
                icon: 'layers',
                text: 'Conferir telas',
                isActive: false,
                description: 'Veja as telas que compõem sua loja.',
            },
            {
                id: 3,
                icon: 'lock',
                text: 'Gerenciar',
                isActive: false,
                description: 'Acompanhe o status de aprovação da sua loja.',
            },
            {
                id: 4,
                icon: 'comment',
                text: 'Ajuda',
                isActive: false,
                description: 'Dúvidas frequentes, tutorial, fale com a gente.',
            },
        ];
        this.items = [];
    }

    handleOpenSidePanel(item: MenuItem) {
        this.menuState = item.isActive ? 'in' : 'out';
        this.itemActive = item;
    }

    openSidePanel(item: MenuItem) {
        this.sidemenu.onActiveOrInactiveMenuOption(item);
        this.handleOpenSidePanel(item);
    }

    closePanel() {
        this.menuState = 'out';
        this.sidemenu.onActiveOrInactiveMenuOption(this.itemActive);
    }

    drop(event: CdkDragDrop<Section[]>) {
        if (event.container.id === event.previousContainer.id) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            copyArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        }
    }
}
