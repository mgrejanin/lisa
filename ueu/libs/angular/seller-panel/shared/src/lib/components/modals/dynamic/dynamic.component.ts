import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DynamicModal } from '../../../models/dynamic-modal.model';

@Component({
    selector: 'seller-panel-confirm',
    templateUrl: './dynamic.component.html',
    styleUrls: ['./dynamic.component.scss'],
})
export class ModalDynamicComponent {
    constructor(public dialogRef: MatDialogRef<Component>, @Inject(MAT_DIALOG_DATA) public data: DynamicModal) {}

    onClose(): void {
        this.dialogRef.close();
    }
}
