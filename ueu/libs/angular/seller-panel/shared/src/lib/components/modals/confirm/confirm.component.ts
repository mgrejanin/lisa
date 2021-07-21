import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ConfirmModal } from '../../../models/confirm-modal.model';

@Component({
    selector: 'seller-panel-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent {
    @Input() cancelButton: boolean;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: ConfirmModal,
        private dialogRef: MatDialogRef<ConfirmComponent>,
    ) {}

    onClose() {
        this.dialogRef.close({
            confirm: false,
        });
    }

    onConfirm() {
        this.dialogRef.close({
            confirm: true,
        });
    }
}
