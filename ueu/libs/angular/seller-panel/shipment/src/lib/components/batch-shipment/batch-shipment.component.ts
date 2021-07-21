import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BatchShipment } from '@picpay/seller-panel/services';
import { WINDOW } from '@picpay/angular/shared/helpers';
import { BehaviorSubject } from 'rxjs';
import { ConfirmPaymentComponent } from '../confirm-payment/confirm-payment.component';

@Component({
    selector: 'seller-panel-batch-shipment',
    templateUrl: './batch-shipment.component.html',
    styleUrls: ['./batch-shipment.component.scss'],
})
export class BatchShipmentComponent {
    form: FormGroup;
    step$ = new BehaviorSubject<number>(1);
    today = new Date();
    minDatePayment = new Date();
    maxDatePayment = new Date();
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        public dialog: MatDialog,
        @Inject(WINDOW) private windowToken: Window,
    ) {
        this.form = formBuilder.group({
            name: new FormControl('', Validators.maxLength(35)),
            end_date: new FormControl('', Validators.required),
            withdrawable: new FormControl(true, Validators.required),
            upload: formBuilder.group({
                file: new FormControl('', Validators.required),
            }),
        });
        this.today = new Date();
        this.minDatePayment.setDate(this.today.getDate() + 15);
        this.maxDatePayment.setDate(this.today.getDate() + 30);
    }

    onFileChange(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.form.patchValue({
                upload: { file: file },
            });
        }
    }

    setStep(step: number) {
        this.step$.next(step);
        this.windowToken.scroll({ top: 0, behavior: 'auto' });
    }

    openConfirmPayment(): void {
        this.submitted = true;
        if (this.form.invalid) {
            return;
        }
        const batchShipment: BatchShipment = {
            name: this.formRef.name.value,
            end_date: this.formRef.end_date.value,
            file: this.formUploadRef.value,
            withdrawable: this.formRef.withdrawable.value,
        };
        const confirmPayment = this.dialog.open(ConfirmPaymentComponent, {
            data: batchShipment,
            autoFocus: false,
        });
        confirmPayment.afterClosed().subscribe(response => {
            if (
                response?.error?.code === 403 &&
                response?.error?.message == 'Lote ativo encontrado. Aguarde até o fim do processamento.'
            ) {
                this.setStep(4);
            } else if (response?.status === 'CREATED') {
                this.setStep(3);
            }
        });
    }

    onRemoveFile(): void {
        this.form.patchValue({
            upload: { file: '' },
        });
    }

    get formUploadRef() {
        return this.form.get('upload.file');
    }

    get formRef() {
        return this.form.controls;
    }
}
