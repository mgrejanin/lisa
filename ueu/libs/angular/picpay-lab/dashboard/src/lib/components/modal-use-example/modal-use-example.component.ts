import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalUseExampleData } from '../../models/modal-use-example.model';

@Component({
    selector: 'picpay-lab-modal-use-example',
    templateUrl: 'modal-use-example.component.html',
    styleUrls: ['modal-use-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PicPayLabModalUseExampleComponent {
    constructor(
        public dialogRef: MatDialogRef<PicPayLabModalUseExampleComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ModalUseExampleData,
    ) {}

    handleClose(): void {
        this.dialogRef.close();
    }
}
