import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalWarningsModal } from '../../models/modal-warning.interface';

@Component({
    selector: 'seller-panel-modal-warning-dialog',
    templateUrl: './modal-warning.component.html',
    styleUrls: ['./modal-warning.component.scss'],
})
export class ModalWarningComponent {
    @Input() cancelButton: boolean;
    readonly faq_url = 'https://ajudaempresas.picpay.com/hc/pt-br?utm_source=site_empresas&utm_medium=faq';

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: ModalWarningsModal,
        private dialogRef: MatDialogRef<ModalWarningComponent>,
    ) {}

    onClose(): void {
        this.dialogRef.close({
            confirm: false,
        });
    }
}
