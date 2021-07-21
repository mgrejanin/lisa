import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { FeedBackComponent } from '@picpay/seller-panel/shared';
import { MatDialogRefMock } from '@picpay/angular/shared/helpers';

import { ModalWarningComponent } from './modal-warning.component';
import { MockComponents, MockModule } from 'ng-mocks';

describe('ModalWarningComponent', () => {
    let component: ModalWarningComponent;
    let fixture: ComponentFixture<ModalWarningComponent>;
    let dialogRef: MatDialogRef<ModalWarningComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ModalWarningComponent, MockComponents(FeedBackComponent)],
            imports: [MockModule(MatIconModule)],
            providers: [
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {},
                },
                {
                    provide: MatDialogRef,
                    useClass: MatDialogRefMock,
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalWarningComponent);
        component = fixture.componentInstance;
        dialogRef = TestBed.inject(MatDialogRef);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should onClose function', () => {
        const dialogSpy = spyOn(dialogRef, 'close');
        component.onClose();
        expect(dialogSpy).toHaveBeenCalledWith({ confirm: false });
    });
});
