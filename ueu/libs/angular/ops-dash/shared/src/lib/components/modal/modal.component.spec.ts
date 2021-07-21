import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';

// ng-mocks
import { MockModule } from 'ng-mocks';

// modules
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';

describe('ModalComponent', () => {
    let component: ModalComponent;
    let fixture: ComponentFixture<ModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DesignSystemAngularModule, MockModule(MatDialogModule)],
            declarations: [ModalComponent],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef, useValue: { close: () => ({}) } },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a onNoClick function', () => {
        const MatDialogRefStub: MatDialogRef<unknown> | undefined = TestBed.inject(MatDialogRef);

        const spy = spyOn(MatDialogRefStub, 'close').and.callThrough();
        component.onNoClick();
        expect(spy).toHaveBeenCalled();
    });
});
