import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'seller-panel-charge-value-modal',
    templateUrl: './charge-value-modal.component.html',
    styleUrls: ['./charge-value-modal.component.scss'],
})
export class ChargeValueModalComponent {
    form: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        public dialogRef: MatDialogRef<ChargeValueModalComponent>,
        private formBuilder: FormBuilder,
    ) {
        this.form = this.formBuilder.group({ chargeValue: 0 });
    }

    onSetValue() {
        const value = Number(this.value) < 0 ? 0 : this.value;

        this.dialogRef.close({ value });
    }

    get value() {
        return this.form.value.chargeValue;
    }

    clearValue(): void {
        this.form.controls.chargeValue.setValue(0);
    }

    onCancel(): void {
        this.dialogRef.close();
    }
}
