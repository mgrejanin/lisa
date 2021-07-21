import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'seller-panel-blocked-balance',
    templateUrl: './blocked-balance.component.html',
    styleUrls: ['./blocked-balance.component.scss'],
})
export class BlockedBalanceComponent {
    constructor(private dialogRef: MatDialogRef<BlockedBalanceComponent>) {}

    onClose() {
        this.dialogRef.close();
    }
}
