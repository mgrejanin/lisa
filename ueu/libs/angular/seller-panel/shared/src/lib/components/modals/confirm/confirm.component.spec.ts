import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { MatDialogRefMock } from '@picpay/angular/shared/helpers';

import { MatIconModule } from '@angular/material/icon';
import { ConfirmComponent } from './confirm.component';
import { MockModule } from 'ng-mocks';

describe('ConfirmComponent', () => {
    let component: ConfirmComponent;
    let fixture: ComponentFixture<ConfirmComponent>;
    let dialogRef: MatDialogRef<ConfirmComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MockModule(MatIconModule)],
            declarations: [ConfirmComponent],
            providers: [
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
        fixture = TestBed.createComponent(ConfirmComponent);
        component = fixture.componentInstance;
        dialogRef = TestBed.inject(MatDialogRef);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should onClose function', () => {
        const dialogSpy = spyOn(dialogRef, 'close');
        const cancelSpy = spyOn(component, 'onClose').and.callThrough();
        component.cancelButton = true;

        fixture.detectChanges();

        const cancelButton = fixture.debugElement.query(By.css('.c-confirm__footer--btn-cancel')).nativeElement;
        cancelButton.click();

        expect(cancelSpy).toHaveBeenCalled();
        expect(dialogSpy).toHaveBeenCalledWith({ confirm: false });
    });

    it('should onConfirm function', () => {
        const dialogSpy = spyOn(dialogRef, 'close');
        const confirmSpy = spyOn(component, 'onConfirm').and.callThrough();

        const confirmButton = fixture.debugElement.query(By.css('.c-confirm__footer--btn-confirm')).nativeElement;
        confirmButton.click();

        expect(confirmSpy).toHaveBeenCalled();
        expect(dialogSpy).toHaveBeenCalledWith({ confirm: true });
    });
});
