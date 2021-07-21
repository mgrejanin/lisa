import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'seller-panel-blocked-transferred-balance',
    templateUrl: './blocked-transferred-balance.component.html',
    styleUrls: ['./blocked-transferred-balance.component.scss'],
})
export class BlockedTransferredBalanceComponent {
    constructor(private dialogRef: MatDialogRef<BlockedTransferredBalanceComponent>) {}

    onClose() {
        this.dialogRef.close();
    }
}
