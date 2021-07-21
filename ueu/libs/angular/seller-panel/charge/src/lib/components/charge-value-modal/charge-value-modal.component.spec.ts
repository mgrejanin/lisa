import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MockModule } from 'ng-mocks';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';

import { MatDialogRefMock } from '@picpay/angular/shared/helpers';

import { ChargeValueModalComponent } from './charge-value-modal.component';

const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: 'center',
    allowNegative: false,
    decimal: ',',
    precision: 2,
    prefix: 'R$ ',
    suffix: '',
    thousands: '.',
};

describe('ChargeValueModalComponent', () => {
    let component: ChargeValueModalComponent;
    let fixture: ComponentFixture<ChargeValueModalComponent>;
    let matDialogRef: MatDialogRef<ChargeValueModalComponent>;
    const data = {};

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ChargeValueModalComponent],
            imports: [
                BrowserAnimationsModule,
                ReactiveFormsModule,
                CurrencyMaskModule,
                MockModule(MatFormFieldModule),
                MockModule(MatInputModule),
                MockModule(MatButtonModule),
                MockModule(MatIconModule),
            ],
            providers: [
                { provide: MatDialogRef, useClass: MatDialogRefMock },
                { provide: MAT_DIALOG_DATA, useValue: data },
                { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ChargeValueModalComponent);
        component = fixture.componentInstance;
        matDialogRef = TestBed.inject(MatDialogRef);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should close modal', () => {
        const confirmButton = fixture.debugElement.query(By.css('.c-charge-value-modal__confirm'));
        expect(confirmButton).not.toBeNull();

        const spy = spyOn(component, 'onSetValue');

        confirmButton.nativeElement.click();

        expect(spy).toHaveBeenCalled();
    });

    it('should check initial charge value', () => {
        const form = component.form;
        const field = form.get('chargeValue');
        expect(field.value).toBe(0);
    });

    it('should change chargeValue', () => {
        const form = component.form;
        const field = form.get('chargeValue');
        field.patchValue(5);

        fixture.detectChanges();
        expect(field.value).toBe(5);
    });

    it('should cancel modal', () => {
        const button = fixture.debugElement.query(By.css('.c-charge-value-modal__cancel'));
        expect(button).not.toBeNull();

        const spy = spyOn(component, 'onCancel');

        button.nativeElement.click();

        expect(spy).toHaveBeenCalled();
    });

    it('should close modal with value onClose', () => {
        const spy = spyOn(matDialogRef, 'close');

        const button = fixture.debugElement.query(By.css('.c-charge-value-modal__confirm'));
        expect(button).not.toBeNull();

        button.nativeElement.click();

        const form = component.form;
        const field = form.get('chargeValue');

        expect(spy).toHaveBeenCalledWith({ value: field.value });
    });

    it('should close modal without value onCancel', () => {
        const spy = spyOn(matDialogRef, 'close');

        const button = fixture.debugElement.query(By.css('.c-charge-value-modal__cancel'));
        expect(button).not.toBeNull();

        button.nativeElement.click();

        expect(spy).toHaveBeenCalledWith();
    });

    it('should test input mask', () => {
        const input = fixture.debugElement.query(By.css('input'));
        expect(input).not.toBeNull();

        const el = input.nativeElement as HTMLInputElement;
        expect(el.value).toBe('R$ 0,00');
    });

    it('should test change input mask', () => {
        const form = component.form;
        const field = form.get('chargeValue');
        field.patchValue(0.52);

        fixture.detectChanges();

        const input = fixture.debugElement.query(By.css('input'));
        expect(input).not.toBeNull();

        const el = input.nativeElement as HTMLInputElement;
        expect(el.value).toBe('R$ 0,52');
    });

    it('should have clearValue function', () => {
        const form = component.form;

        component.clearValue();

        expect(form.value.chargeValue).toBe(0);
    });
});
