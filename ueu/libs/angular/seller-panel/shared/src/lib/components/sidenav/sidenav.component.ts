import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { Subject } from 'rxjs';

import { SidenavService } from '@picpay/seller-panel/services';
import { subscribeUntil } from '@picpay/angular/shared/helpers';

@Component({
    selector: 'seller-panel-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
    opened$: Subject<boolean>;
    closed$: Subject<boolean>;

    showCloseButton: boolean;
    showPreviousButton: boolean;

    @ViewChild('sidenav') sidenav: MatSidenav;

    constructor(private sidenavService: SidenavService) {
        this.opened$ = this.sidenavService.opened$;
        this.closed$ = this.sidenavService.closed$;

        this.sidenavService.showCloseButton$.pipe(subscribeUntil(this)).subscribe((value: boolean) => {
            this.showCloseButton = value;
        });
    }

    onClosed() {
        this.sidenavService.close();
        this.sidenavService.closed();
    }
}
