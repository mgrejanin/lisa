import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { MockComponent, MockModule } from 'ng-mocks';

import { ConfirmPaymentComponent } from './confirm-payment.component';
import { batchMock, ShipmentService, ShipmentServiceMock } from '@picpay/seller-panel/services';
import { throwError } from 'rxjs';

describe('ConfirmPaymentComponent', () => {
    let component: ConfirmPaymentComponent;
    let fixture: ComponentFixture<ConfirmPaymentComponent>;
    let service: ShipmentService;

    beforeEach(() => {
        const MatDialogRefStub = () => ({ close: () => ({}) });
        TestBed.configureTestingModule({
            imports: [MockModule(DesignSystemAngularModule), MatDialogModule],
            declarations: [ConfirmPaymentComponent, MockComponent(MatDialog)],
            providers: [
                { provide: ShipmentService, useClass: ShipmentServiceMock },
                { provide: MAT_DIALOG_DATA, useValue: batchMock },
                { provide: MatDialogRef, useFactory: MatDialogRefStub },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ConfirmPaymentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        service = TestBed.inject(ShipmentService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have onSave function called', () => {
        const onSaveSpy = spyOn(component, 'onSave');
        component.onSave();
        expect(onSaveSpy).toHaveBeenCalled();
    });

    it('should have saveBatchShipment function called', () => {
        const onSaveServiceSpy = spyOn(service, 'saveBatchShipment').and.callThrough();
        service.saveBatchShipment(batchMock);
        expect(onSaveServiceSpy).toHaveBeenCalled();
    });

    it('should have onSave function from transactionsService (Success case)', () => {
        const onSaveSpy = spyOn(component, 'onSave');
        const onSaveServiceSpy = spyOn(service, 'saveBatchShipment').and.callThrough();

        component.onSave();
        service.saveBatchShipment(batchMock);

        expect(onSaveServiceSpy).toHaveBeenCalled();
        expect(onSaveSpy).toHaveBeenCalled();
    });

    it('should have onSave function from transactionsService (Error case)', () => {
        const onSaveSpy = spyOn(component, 'onSave');
        const onSaveServiceSpy = spyOn(service, 'saveBatchShipment').and.returnValue(throwError({}));

        component.onSave();
        service.saveBatchShipment(batchMock);

        expect(onSaveServiceSpy).toHaveBeenCalledWith(batchMock);
        expect(onSaveSpy).toHaveBeenCalled();
    });

    it('should have onCancel function', () => {
        const onSaveServiceSpy = spyOn(component.dialogRef, 'close').and.callThrough();
        component.onCancel();
        expect(onSaveServiceSpy).toHaveBeenCalled();
    });
});
