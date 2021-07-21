import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSpinner } from '@angular/material/progress-spinner';

import { MockComponent, MockModule } from 'ng-mocks';

import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalDynamicComponent } from './dynamic.component';
import { MatDialogRefMock } from '@picpay/angular/shared/helpers';

describe('DynamicComponent', () => {
    let component: ModalDynamicComponent;
    let fixture: ComponentFixture<ModalDynamicComponent>;
    let dialogRef: MatDialogRef<ModalDynamicComponent>;

    const dynamicModalData = {
        title: 'Trocar perfil',
        actions: { visible: false },
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ModalDynamicComponent, MockComponent(MatSpinner)],
            imports: [
                MockModule(MatIconModule),
                MockModule(MatDividerModule),
                MockModule(MatDialogModule),
                MockModule(MatFormFieldModule),
            ],
            providers: [
                { provide: MatDialogRef, useClass: MatDialogRefMock },
                { provide: MAT_DIALOG_DATA, useValue: dynamicModalData },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalDynamicComponent);
        component = fixture.componentInstance;

        dialogRef = TestBed.inject(MatDialogRef);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have onClose function ', () => {
        const dialogRefSpy = spyOn(dialogRef, 'close');

        component.onClose();

        expect(dialogRefSpy).toHaveBeenCalledTimes(1);
    });
});
