import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BatchShipment, ShipmentService } from '@picpay/seller-panel/services';

@Component({
    selector: 'seller-panel-confirm-payment',
    templateUrl: './confirm-payment.component.html',
    styleUrls: ['./confirm-payment.component.scss'],
})
export class ConfirmPaymentComponent {
    isLoading = false;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: BatchShipment,
        public dialogRef: MatDialogRef<ConfirmPaymentComponent>,
        private service: ShipmentService,
    ) {}

    onCancel(): void {
        this.dialogRef.close();
    }

    onSave() {
        this.isLoading = true;
        this.service.saveBatchShipment(this.data).subscribe(
            response => {
                this.isLoading = false;
                this.dialogRef.close(response);
            },
            error => {
                this.isLoading = false;
                this.dialogRef.close(error);
            },
        );
    }
}
