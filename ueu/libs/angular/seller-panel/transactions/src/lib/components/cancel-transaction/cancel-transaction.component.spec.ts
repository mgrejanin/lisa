import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { EventTracking } from '@picpay/event-tracking';
import { TransactionsService, TransactionsServiceMock, TransactionTable } from '@picpay/seller-panel/services';
import { MatDialogRefMock } from '@picpay/angular/shared/helpers';

import { MockModule } from 'ng-mocks';
import { throwError } from 'rxjs';

import { CancelTransactionComponent } from './cancel-transaction.component';
import { cancelTransactionMock } from '../../mocks/cancel-transaction.mock';
import { MockNotificationsService, NotificationsService } from '@picpay/angular/shared/core/notifications';

describe('CancelTransactionComponent', () => {
    let component: CancelTransactionComponent;
    let fixture: ComponentFixture<CancelTransactionComponent>;
    let matDialogRef: MatDialogRef<CancelTransactionComponent>;
    let transactionsService: TransactionsService;
    const data: TransactionTable = cancelTransactionMock;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                MockModule(MatFormFieldModule),
                MockModule(MatInputModule),
                MockModule(MatProgressSpinnerModule),
            ],
            declarations: [CancelTransactionComponent],
            providers: [
                { provide: TransactionsService, useClass: TransactionsServiceMock },
                { provide: MatDialogRef, useClass: MatDialogRefMock },
                { provide: MAT_DIALOG_DATA, useValue: data },
                { provide: NotificationsService, useValue: new MockNotificationsService({ confirmed: true }) },
            ],
        }).compileComponents();
    });

    beforeEach(async () => {
        fixture = TestBed.createComponent(CancelTransactionComponent);
        transactionsService = TestBed.inject(TransactionsService);
        matDialogRef = TestBed.inject(MatDialogRef);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize the form in ngOnInit', () => {
        const initFormSpy = spyOn(component, 'onInitForm');

        component.ngOnInit();

        expect(initFormSpy).toHaveBeenCalledTimes(1);
    });

    it('should validate the value as empty', () => {
        const formCancel = component.cancelForm;

        expect(formCancel).toBeDefined();
        expect(formCancel.get('password').value).toBe('');
        expect(formCancel.valid).toBe(false);
    });

    it('should have cancelTransaction function from transactionsService (Success case)', () => {
        const formCancel = component.cancelForm;
        const updateStatusTransactionSpy = spyOn(component, 'onUpdateStatusTransaction');
        const cancelTransactionServiceSpy = spyOn(transactionsService, 'cancelTransaction').and.callThrough();
        const closeSpy = spyOn(matDialogRef, 'close');

        formCancel.patchValue({ password: '123456' });

        component.cancelTransaction();

        expect(formCancel.valid).toBe(true);
        expect(cancelTransactionServiceSpy).toHaveBeenCalledWith(12345, '123456');
        expect(updateStatusTransactionSpy).toHaveBeenCalledTimes(1);
        expect(closeSpy).toHaveBeenCalledTimes(1);
        expect(component.isLoading).toBe(false);
    });

    it('should have cancelTransaction function from transactionsService (Error case)', () => {
        const formCancel = component.cancelForm;
        const cancelTransactionServiceSpy = spyOn(transactionsService, 'cancelTransaction').and.returnValue(
            throwError({}),
        );
        const closeSpy = spyOn(matDialogRef, 'close');

        formCancel.patchValue({ password: '123456' });

        component.cancelTransaction();

        expect(formCancel.valid).toBe(true);
        expect(cancelTransactionServiceSpy).toHaveBeenCalledTimes(1);
        expect(closeSpy).toHaveBeenCalledTimes(1);
        expect(component.isLoading).toBe(false);
    });

    it('should updated status and status_id from data', () => {
        component.onUpdateStatusTransaction();

        expect(component.data.status).toBe('Devolvida');
        expect(component.data.status_id).toBe('highlight_off');
    });

    it('test eventtrack', () => {
        const evtTracking = spyOn(EventTracking, 'track');
        const onCloseSpy = spyOn(matDialogRef, 'close');

        component.onClose();

        expect(evtTracking).toHaveBeenCalledWith('Dialog Interacted', {
            action: 'cancel',
            hit_type: 'event',
            event_category: 'clicked',
            event_action: 'User clicked',
            event_label: 'Dialog Interacted',
        });
        expect(onCloseSpy).toHaveBeenCalledTimes(1);
    });
});
