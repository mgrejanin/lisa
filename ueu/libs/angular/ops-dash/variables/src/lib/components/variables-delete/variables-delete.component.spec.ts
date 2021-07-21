import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VariablesDeleteComponent } from './variables-delete.component';
import { of } from 'rxjs';

// data-access
import { VariablesServiceMock } from '../../data-access/mocks/variables.service.mock';

// ng-mocks
import { MockModule } from 'ng-mocks';

// modules
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VariablesService } from '../../data-access/variables/variables.service';

describe('VariablesDeleteComponent', () => {
    let component: VariablesDeleteComponent;
    let fixture: ComponentFixture<VariablesDeleteComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                MockModule(MatButtonModule),
                MockModule(DesignSystemAngularModule),
                MockModule(DesignSystemAngularModule),
                MockModule(MatDialogModule),
            ],
            declarations: [VariablesDeleteComponent],
            providers: [
                { provide: VariablesService, useClass: VariablesServiceMock },
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef, useValue: { close: () => ({}) } },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(VariablesDeleteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set value false on keyDelete', () => {
        const value = component.data.key;
        component.keyDelete(value);
        expect(component.showButton).toBe(false);
    });

    it('should set value true on keyDelete', () => {
        const value = 'mock';
        component.keyDelete(value);
        expect(component.showButton).toBe(true);
    });

    it('should have deleteVariable function', () => {
        const variablesServiceStub: VariablesService = TestBed.inject(VariablesService);
        const serviceSpy = spyOn(variablesServiceStub, 'deleteVariable').and.returnValue(of(null));
        const key = 'mock';

        component.formDeleteVariable.get('keyValue').setValue('mock');
        component.formDeleteVariable.updateValueAndValidity();
        component.data.key = 'mock';

        component.deleteVariable();
        expect(serviceSpy).toHaveBeenCalledWith(key);
    });

    it('form invalid on deleteVariable', () => {
        component.formDeleteVariable.patchValue({ keyValue: '' });
        const keyValue = component.formDeleteVariable.controls.keyValue;
        component.data.key = 'mock';

        component.deleteVariable();
        expect(keyValue.invalid).toBeTruthy();
    });

    it('form valid on deleteVariable', () => {
        component.formDeleteVariable.patchValue({ keyValue: 'mock' });
        const keyValue = component.formDeleteVariable.controls.keyValue;
        component.keyValue = 'mock';

        component.deleteVariable();
        expect(keyValue.valid).toBeTruthy();
    });

    it('should have a onNoClick function', () => {
        const MatDialogRefStub: MatDialogRef<unknown> | undefined = TestBed.inject(MatDialogRef);

        const spy = spyOn(MatDialogRefStub, 'close').and.callThrough();
        component.onNoClick();
        expect(spy).toHaveBeenCalled();
    });
});
