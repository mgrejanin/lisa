import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VariablesCreateComponent } from './variables-create.component';
import { of } from 'rxjs';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';

// data-access
import { VariablesServiceMock } from '../../data-access/mocks/variables.service.mock';

// ng-mocks
import { MockModule } from 'ng-mocks';

// modules
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VariablesRequest } from '../../models/variables-request.model';
import { VariablesService } from '../../data-access/variables/variables.service';

describe('VariablesCreateComponent', () => {
    let component: VariablesCreateComponent;
    let fixture: ComponentFixture<VariablesCreateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                MockModule(MatDialogModule),
                MockModule(DesignSystemAngularModule),
                MockModule(MatInputModule),
                MockModule(MatButtonModule),
                MockModule(MatFormFieldModule),
            ],
            declarations: [VariablesCreateComponent],
            providers: [
                { provide: VariablesService, useClass: VariablesServiceMock },
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef, useValue: { close: () => ({}) } },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(VariablesCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have createVariable function', () => {
        const variablesServiceStub: VariablesService = TestBed.inject(VariablesService);
        const serviceSpy = spyOn(variablesServiceStub, 'createVariable').and.returnValue(of(null));

        component.createVariable();
        component.formCreateVariable.get('key').setValue('A1');
        component.formCreateVariable.updateValueAndValidity();

        const expectedParams = new VariablesRequest('A1');

        component.createVariable();
        expect(serviceSpy).toHaveBeenCalledWith(expectedParams);
    });

    it('should have closeDialog function', () => {
        const MatDialogRefStub: MatDialogRef<unknown> | undefined = TestBed.inject(MatDialogRef);

        const spy = spyOn(MatDialogRefStub, 'close').and.callThrough();
        component.closeDialog();
        expect(spy).toHaveBeenCalled();
    });

    it('should have a startUpdateSubscription function on init', () => {
        const initSpy = spyOn(component, 'startUpdateSubscription');
        component.ngOnInit();
        expect(initSpy).toHaveBeenCalled();
    });

    it('should have a startUpdateSubscription function', () => {
        const variablesServiceStub: VariablesService = TestBed.inject(VariablesService);
        const serviceSpy = spyOn(variablesServiceStub.onVariablesUpdate, 'subscribe').and.returnValue(of({}));

        component.startUpdateSubscription();
        expect(serviceSpy).toHaveBeenCalled();
    });
});
