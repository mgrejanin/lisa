import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { OnboardingExtractComponent } from '@picpay/seller-panel/shared';
import { Receipt } from '@picpay/seller-panel/services';

@Component({
    selector: 'seller-panel-extract-details',
    templateUrl: './extract-details.component.html',
    styleUrls: ['./extract-details.component.scss'],
})
export class ExtractDetailsComponent {
    @Input() data: Receipt;

    constructor(private matDialog: MatDialog) {}

    knowMore(): void {
        this.matDialog.open(OnboardingExtractComponent, {
            panelClass: ['o-modal-reset', 'full-screen-modal'],
            width: '628px',
            height: '624px',
            disableClose: true,
        });
    }
}
