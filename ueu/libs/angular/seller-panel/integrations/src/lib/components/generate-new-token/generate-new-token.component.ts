import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'seller-panel-generate-new-token',
    templateUrl: './generate-new-token.component.html',
    styleUrls: ['./generate-new-token.component.scss'],
})
export class GenerateNewTokenComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: string,
        public dialogRef: MatDialogRef<GenerateNewTokenComponent>,
    ) {}

    onClose() {
        this.dialogRef.close(false);
    }

    onGenerateNewToken() {
        this.dialogRef.close(true);
    }
}
