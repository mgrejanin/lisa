import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { MockModule } from 'ng-mocks';
import { throwError } from 'rxjs';
import { RechargesService } from '../../../data-access';
import { RechargesServiceMock } from '../../../data-access/recharges/mocks/recharges.service.mock';
import { By } from '@angular/platform-browser';

import { ChangeRechargeValueComponent } from './change-recharge-value.component';
import { MatDialogRefMock } from '@picpay/angular/shared/helpers';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CurrencyMaskModule } from 'ng2-currency-mask';

describe('ChangeRechargeValueComponent', () => {
    let component: ChangeRechargeValueComponent;
    let fixture: ComponentFixture<ChangeRechargeValueComponent>;
    let rechargeService: RechargesService;
    let dialogRef;

    const rechargeUpdateRequestMock = {
        id: 'idMock',
        value: 1000,
        value_srt: '1000',
    };

    const dataMock = {
        rechargeID: 'rechargeID',
        rechargeIDCounter: 0,
        rechargeValue: 0,
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                MockModule(DesignSystemAngularModule),
                MockModule(MatDialogModule),
                MockModule(MatFormFieldModule),
                MockModule(MatInputModule),
                MockModule(CurrencyMaskModule),
            ],
            declarations: [ChangeRechargeValueComponent],
            providers: [
                {
                    provide: RechargesService,
                    useClass: RechargesServiceMock,
                },
                { provide: MAT_DIALOG_DATA, useValue: dataMock },
                { provide: MatDialogRef, useClass: MatDialogRefMock },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ChangeRechargeValueComponent);
        component = fixture.componentInstance;

        rechargeService = TestBed.inject(RechargesService);
        dialogRef = TestBed.inject(MatDialogRef);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    /* CONTROLLER */

    it('should have onClose function', () => {
        const matDialogRefSpy = spyOn(dialogRef, 'close');

        component.onClose();

        expect(matDialogRefSpy).toHaveBeenCalled();
    });

    it('should have onApplyChangeValue function (invalid form)', () => {
        const updateRechargeValueSpy = spyOn(rechargeService, 'updateRechargeValue');

        component.form.get('rechargeValue').setValue('0');

        expect(component.isLoading).toBe(false);

        component.onApplyChangeValue();

        expect(updateRechargeValueSpy).not.toHaveBeenCalled();
        expect(component.isLoading).toBe(false);
    });

    it('should have success on onApplyChangeValue function (valid form)', () => {
        const updateRechargeValueSpy = spyOn(rechargeService, 'updateRechargeValue').and.callThrough();
        const formResetSpy = spyOn(component.form, 'reset');
        const dialogRefSpy = spyOn(dialogRef, 'close');

        component.form.get('rechargeValue').setValue(1000);
        component.data.rechargeID = rechargeUpdateRequestMock.id;

        expect(component.isLoading).toBe(false);

        component.onApplyChangeValue();

        expect(updateRechargeValueSpy).toHaveBeenCalledWith(rechargeUpdateRequestMock);

        expect(component.isLoading).toBe(false);

        expect(formResetSpy).toHaveBeenCalled();

        expect(dialogRefSpy).toHaveBeenCalled();
    });

    it('should have error onApplyChangeValue function (valid form) (with error)', () => {
        const formResetSpy = spyOn(component.form, 'reset');
        const dialogRefSpy = spyOn(dialogRef, 'close');
        const updateRechargeValueSpy = spyOn(rechargeService, 'updateRechargeValue').and.returnValue(throwError({}));

        component.form.get('rechargeValue').setValue(1000);
        component.data.rechargeID = rechargeUpdateRequestMock.id;

        expect(component.isLoading).toBe(false);

        component.onApplyChangeValue();

        expect(updateRechargeValueSpy).toHaveBeenCalledWith(rechargeUpdateRequestMock);

        expect(formResetSpy).not.toHaveBeenCalled();
        expect(dialogRefSpy).not.toHaveBeenCalled();

        expect(component.isLoading).toBe(false);
    });

    /* TEMPLATE */
    it('should have rechargeID', () => {
        const rechargeIDCounter = fixture.debugElement.query(By.css('.c-change-recharge-value__body-content-item-id'));

        expect(rechargeIDCounter.nativeElement.textContent.trim()).toBe(dataMock.rechargeIDCounter.toString());
    });

    it('should have rechargeValue', () => {
        const rechargeValue = fixture.debugElement.query(By.css('.c-change-recharge-value__body-content-item-value'));

        expect(rechargeValue.nativeElement.textContent.trim()).toBe('R$0.00');
    });
});
