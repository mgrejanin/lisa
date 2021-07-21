import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { By } from '@angular/platform-browser';

import { MockModule } from 'ng-mocks';

import { WithdrawalsService, WithdrawalsServiceMock } from '@picpay/seller-panel/services';
import { MatDialogRefMock } from '@picpay/angular/shared/helpers';

import { ModalAutoWithdrawalComponent } from './modal-auto-withdrawal.component';
import { MockNotificationsService, NotificationsService } from '@picpay/angular/shared/core/notifications';

describe('ModalAutoWithdrawalComponent', () => {
    let component: ModalAutoWithdrawalComponent;
    let fixture: ComponentFixture<ModalAutoWithdrawalComponent>;
    let dialogRef: MatDialogRef<ModalAutoWithdrawalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MockModule(MatIconModule), MockModule(MatDialogModule), MockModule(MatProgressSpinnerModule)],
            declarations: [ModalAutoWithdrawalComponent],
            providers: [
                {
                    provide: NotificationsService,
                    useValue: new MockNotificationsService({ confirmed: true }),
                },
                {
                    provide: WithdrawalsService,
                    useClass: WithdrawalsServiceMock,
                },
                {
                    provide: MatDialogRef,
                    useClass: MatDialogRefMock,
                },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {},
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalAutoWithdrawalComponent);
        component = fixture.componentInstance;
        dialogRef = TestBed.inject(MatDialogRef);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have onClose function', () => {
        const onCloseSpy = spyOn(component, 'onClose').and.callThrough();
        const dialogRefSpy = spyOn(dialogRef, 'close');
        const btnOnClose = fixture.debugElement.query(By.css('.c-modal-auto-withdrawal__footer--btn-cancel'));

        btnOnClose.nativeElement.click();

        component.onClose();

        expect(onCloseSpy).toHaveBeenCalled();
        expect(dialogRefSpy).toHaveBeenCalledWith({ confirm: true });
    });

    it('should have onNext function (disabled auto-withdrawal)', () => {
        component.isCheck = false;

        fixture.detectChanges();

        const onNextSpy = spyOn(component, 'onNext').and.callThrough();
        const btnOnNext = fixture.debugElement.query(By.css('.c-modal-auto-withdrawal__footer--btn-confirm'));

        btnOnNext.nativeElement.click();

        component.onNext();

        expect(onNextSpy).toHaveBeenCalled();
    });

    it('should have onNext onConfirm function (enabled auto-withdrawal)', () => {
        component.isCheck = true;
        component.enablingConfirm = true;

        fixture.detectChanges();

        const onConfirmSpy = spyOn(component, 'onConfirm').and.callThrough();
        const onNextSpy = spyOn(component, 'onNext').and.callThrough();
        const onAutoWithdrawalSpy = spyOn(component, 'onAutoWithdrawal').and.callThrough();

        const btnOnConfirm = fixture.debugElement.query(By.css('.c-modal-auto-withdrawal__footer--btn-confirm'));

        btnOnConfirm.nativeElement.click();
        component.onNext();
        component.onAutoWithdrawal(true);
        component.enablingConfirm = false;

        fixture.detectChanges();

        btnOnConfirm.nativeElement.click();
        component.onConfirm();

        fixture.detectChanges();

        expect(onNextSpy).toHaveBeenCalled();
        expect(onConfirmSpy).toHaveBeenCalled();
        expect(onAutoWithdrawalSpy).toHaveBeenCalledWith(true);
    });

    it('should have onNext (tryAgain) function', () => {
        component.isError = true;
        component.isCheck = false;

        fixture.detectChanges();

        const onNextSpy = spyOn(component, 'onNext').and.callThrough();
        const onAutoWithdrawalSpy = spyOn(component, 'onAutoWithdrawal').and.callThrough();

        const btnOnTryAgain = fixture.debugElement.query(By.css('.c-modal-auto-withdrawal__body-retry'));

        btnOnTryAgain.nativeElement.click();
        component.onNext();
        component.onAutoWithdrawal(false);

        expect(onNextSpy).toHaveBeenCalled();
        expect(onAutoWithdrawalSpy).toHaveBeenCalledWith(false);
    });
});
