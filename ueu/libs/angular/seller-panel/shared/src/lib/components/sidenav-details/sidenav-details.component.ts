import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { Subject } from 'rxjs';

import { SidenavService } from '@picpay/seller-panel/services';

@Component({
    selector: 'seller-panel-sidenav-details',
    templateUrl: './sidenav-details.component.html',
    styleUrls: ['./sidenav-details.component.scss'],
})
export class SidenavDetailsComponent {
    opened$: Subject<boolean>;

    @ViewChild('sidenav') sidenavDetails: MatSidenav;

    constructor(private sidenavService: SidenavService) {
        this.opened$ = this.sidenavService.opened$;
    }

    onClosed(): void {
        this.sidenavService.close();
        this.sidenavService.closed();
    }
}
