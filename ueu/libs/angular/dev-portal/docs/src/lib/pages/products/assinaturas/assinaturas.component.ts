import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { AuthQuery, ContactFormComponent, UiQuery } from '@picpay/dev-portal/shared';
import { EventTracking } from '@picpay/event-tracking';
import { Observable } from 'rxjs';

@Component({
    selector: 'dev-portal-assinaturas',
    templateUrl: './assinaturas.component.html',
    styleUrls: ['./assinaturas.component.scss'],
})
export class AssinaturasComponent {
    readonly isMobile$: Observable<boolean>;

    constructor(private uiQuery: UiQuery, private dialog: MatDialog, private authQuery: AuthQuery) {
        this.isMobile$ = this.uiQuery.isMobile$;
    }

    // Open the material UI dialog with fullscreen on mobile (see the dev-portal app styles for more insight)
    openDialog(): void {
        EventTracking.track(`Button Clicked`, {
            button_name: `BOTAO_CONTATO_ASSINATURAS`,
            page_name: 'STUDIO_PICPAY_ASSINATURAS',
            context: `ASSINATURAS`,
        });

        this.dialog.open(ContactFormComponent, {
            maxWidth: '100vw',
            maxHeight: '100vh',
            panelClass: 'modal-control',
            data: {
                user: this.authQuery.getValue().logged ? this.authQuery.getValue().user : null,
                slug: 'assinaturas',
                doc: 'external',
            },
        });
    }
}
