import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AuthQuery, ContactFormComponent, UiQuery } from '@picpay/dev-portal/shared';
import { EventTracking } from '@picpay/event-tracking';
import { Observable } from 'rxjs';

import { CodeMock } from '../../../models/code.model';
import { CodesEcommerceMock } from '../../../services/mocks/codes-ecommerce.mock';
@Component({
    selector: 'dev-portal-e-commerce',
    templateUrl: './e-commerce.component.html',
    styleUrls: ['./e-commerce.component.scss'],
})
export class ECommerceComponent implements OnInit, OnDestroy {
    readonly isMobile$: Observable<boolean>;
    codes: CodeMock = CodesEcommerceMock;
    elementScript;

    constructor(
        private uiQuery: UiQuery,
        private dialog: MatDialog,
        @Inject(DOCUMENT) private document: Document,
        private renderer2: Renderer2,
        private authQuery: AuthQuery,
    ) {
        this.isMobile$ = this.uiQuery.isMobile$;
        this.elementScript = this.renderer2.createElement('script');
    }

    ngOnInit() {
        this.onLoadScript();
    }

    onLoadScript(): void {
        this.elementScript.type = 'text/javascript';
        this.elementScript.src = 'https://run.pstmn.io/button.js';
        this.renderer2.appendChild(this.document.body, this.elementScript);
    }

    // Open the material UI dialog with fullscreen on mobile (see the dev-portal app styles for more insight)
    openDialog(): void {
        EventTracking.track(`Button Clicked`, {
            button_name: `BOTAO_CONTATO_E-COMMERCE`,
            page_name: 'STUDIO_PICPAY_E-COMMERCE',
            context: `E-COMMERCE`,
        });
        this.dialog.open(ContactFormComponent, {
            maxWidth: '100vw',
            maxHeight: '100vh',
            panelClass: 'modal-control',
            data: {
                user: this.authQuery.getValue().logged ? this.authQuery.getValue().user : null,
                slug: 'e-commerce',
                doc: 'external',
            },
        });
    }

    ngOnDestroy() {
        this.renderer2.removeChild(this.document.body, this.elementScript);
    }
}
