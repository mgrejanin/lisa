import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { FutureRelease, FutureReleasesList } from '@picpay/seller-panel/services';
import { ConfirmComponent } from '@picpay/seller-panel/shared';

@Component({
    selector: 'seller-panel-table-future-releases',
    templateUrl: './table-future-releases.component.html',
    styleUrls: ['./table-future-releases.component.scss'],
})
export class TableFutureReleasesComponent {
    @Input() data: FutureReleasesList;

    displayedColumns: string[] = ['icon', 'date', 'day', 'id', 'value'];

    constructor(private matDialog: MatDialog) {}

    openFutureReleasesDetails(row: FutureRelease): void {
        if (!row?.list[1]?.value) {
            return;
        }

        const tax = row.list[1].value;
        const config = {
            panelClass: 'o-modal-reset',
            width: '280px',
            data: {
                title: 'Valor da taxa',
                caption: `A taxa descontada do valor inicial das suas vendas foi de ${tax}.`,
                buttons: {
                    align: 'center',
                    closeBtn: false,
                    confirm: 'Ok, entendi',
                },
            },
        };

        this.matDialog.open(ConfirmComponent, config);
    }
}
