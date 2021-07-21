import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { VariablesUpdateComponent } from './variables-update.component';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';

// data-access
import { VariablesServiceMock } from '../../data-access/mocks/variables.service.mock';
import { VariablesQueryMock } from '../../data-access/mocks/variables.query.mock';

// ng-mocks
import { MockModule } from 'ng-mocks';

// modules
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { Service } from '../../models/services.model';
import { Variable } from '../../models/variable.model';
import { VariableType } from '../../models/variables-type.model';
import { VariablesUpdate } from '../../models/variables-update.model';
import { VariablesService } from '../../data-access/variables/variables.service';
import { VariablesQuery } from '../../data-access/variables/variables.query';

describe('VariablesUpdateComponent', () => {
    let component: VariablesUpdateComponent;
    let fixture: ComponentFixture<VariablesUpdateComponent>;

    const mockDialog = {
        open: jasmine.createSpy('open'),
        close: jasmine.createSpy('close'),
        closeAll: jasmine.createSpy('closeAll'),
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                MockModule(DesignSystemAngularModule),
                MockModule(MatInputModule),
                MockModule(MatTabsModule),
                MockModule(MatListModule),
                MockModule(MatButtonModule),
                MockModule(MatDialogModule),
                MockModule(MatFormFieldModule),
                MockModule(MatProgressSpinnerModule),
                MockModule(MatMenuModule),
                MockModule(MatIconModule),
            ],
            declarations: [VariablesUpdateComponent],
            providers: [
                { provide: VariablesService, useClass: VariablesServiceMock },
                { provide: VariablesQuery, useClass: VariablesQueryMock },
                { provide: MatDialog, useValue: mockDialog },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(VariablesUpdateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a tabClick function', () => {
        const getServiceKeySpy = spyOn(component, 'getServiceKey');
        component.tabClick(1);
        expect(getServiceKeySpy).toHaveBeenCalled();
    });

    it('should set tab on  tabClick', () => {
        component.tabClick(2);
        fixture.detectChanges();
    });

    it('should have a updateFormByVariableType function', () => {
        component.typeVariable = VariableType.SECRET;
        component.updateFormByVariableType();
        expect(component.buttonHelpSecret).toBe(true);
    });

    it('should set button on updateFormByVariableType function', () => {
        component.buttonHelpSecret = false;
        component.updateFormByVariableType();
        expect(component.buttonHelpSecret).toBe(false);
    });

    it('should set type on updateFormByVariableType function', () => {
        component.typeVariable = null;
        component.updateFormByVariableType();
        expect(component.buttonHelpSecret).toBe(false);
    });

    it('should have a changeVersion function', () => {
        const variablesServiceStub: VariablesService = TestBed.inject(VariablesService);
        const mock: Variable = new Variable('mockKey', 'mockValue', VariableType.PLAIN, 'mockId', 1, 'mockCreatedAt');
        const serviceSpy = spyOn(variablesServiceStub, 'getVariableVersion').and.returnValue(of(mock));

        component.versionChange = 1;
        component.versionChange.toString();

        component.versionVariable = 2;
        component.versionVariable.toString();

        component.changeVersion(2);

        expect(serviceSpy).toHaveBeenCalled();
        expect(component.buttonUpdate).toBe(false);
        expect(component.buttonRollback).toBe(true);
    });

    it('should set version on changeVersion', () => {
        component.versionChange = 1;
        component.versionVariable = 1;
        component.changeVersion(1);

        expect(component.versionChange).toBe(1);
        expect(component.versionVariable).toBe(1);
        expect(component.buttonUpdate).toBe(true);
        expect(component.buttonRollback).toBe(false);
    });

    it('should have a getVariableKey function (success case)', () => {
        const variablesServiceStub: VariablesService = TestBed.inject(VariablesService);
        const mock: Variable = new Variable('mockKey', 'mockValue', VariableType.PLAIN, 'mockId', 1, 'mockCreatedAt');
        const serviceSpy = spyOn(variablesServiceStub, 'getVariableKey').and.returnValue(of(mock));

        component.getVariableKey();
        expect(serviceSpy).toHaveBeenCalled();
        expect(component.variables.toString()).toEqual(mock.toString());
    });

    it('should have updateVariable function', () => {
        const variablesServiceStub: VariablesService = TestBed.inject(VariablesService);
        const serviceSpy = spyOn(variablesServiceStub, 'updateVariable').and.returnValue(of(null));
        const key = 'mockKey';

        component.updateVariable();

        component.formUpdateVariable.get('value').setValue('mockKey');
        component.formUpdateVariable.get('type').setValue('PLAIN');
        component.formUpdateVariable.updateValueAndValidity();

        const expectedParams = new VariablesUpdate('mockKey', VariableType.PLAIN);

        component.updateVariable();
        expect(serviceSpy).toHaveBeenCalledWith(key, expectedParams);
    });

    it('should have a showValueVariableSecret function', () => {
        const variablesServiceStub: VariablesService = TestBed.inject(VariablesService);
        const mock: Variable = new Variable('mockKey', 'mockValue', VariableType.PLAIN, 'mockId', 1, 'mockCreatedAt');
        const serviceSpy = spyOn(variablesServiceStub, 'showValueVariableSecret').and.returnValue(of(mock));

        component.showValueVariableSecret();
        expect(serviceSpy).toHaveBeenCalled();
    });

    it('should have rollbackVariable function', () => {
        const variablesServiceStub: VariablesService = TestBed.inject(VariablesService);
        const serviceSpy = spyOn(variablesServiceStub, 'rollbackVariable').and.returnValue(of(null));

        const key = 'mockKey';
        const version = 1;

        component.rollbackVariable();

        component.formUpdateVariable.get('value').setValue('testValue');
        component.formUpdateVariable.get('type').setValue('PLAIN');
        component.formUpdateVariable.updateValueAndValidity();

        const expectedParams = new VariablesUpdate('testValue', VariableType.PLAIN);

        component.rollbackVariable();
        expect(serviceSpy).toHaveBeenCalledWith(key, version, expectedParams);
    });

    it('should have a getServiceKey function', () => {
        const variablesServiceStub: VariablesService = TestBed.inject(VariablesService);
        const expectedVariables = new Service('testService', 'testKey', 'testAlias', 'testStage');
        const serviceSpy = spyOn(variablesServiceStub, 'getVariableServicesByKey').and.returnValue(
            of(expectedVariables),
        );

        component.getServiceKey();
        expect(serviceSpy).toHaveBeenCalled();
    });

    it('should have associateService function', () => {
        const variablesServiceStub: VariablesService = TestBed.inject(VariablesService);
        const serviceSpy = spyOn(variablesServiceStub, 'associateService').and.returnValue(of(null));
        const service = 'testService';

        component.associateService();

        component.formService.get('service').setValue('testService');
        component.activeKey = 'testKey';
        component.formService.get('alias').setValue('testAlias');
        component.formService.updateValueAndValidity();

        const expectedParams = new Service('testService', 'testKey', 'testAlias', null);

        component.associateService();
        expect(serviceSpy).toHaveBeenCalledWith(service, expectedParams);
        component.dialog.closeAll();
    });

    it('should have a desassociateService function', () => {
        const variablesServiceStub: VariablesService = TestBed.inject(VariablesService);
        const serviceSpy = spyOn(variablesServiceStub, 'desassociateService').and.returnValue(of(null));
        const paramService = 'testService';

        component.desassociateService(paramService);
        expect(serviceSpy).toHaveBeenCalled();
    });

    it('should have a startUpdateSubscription function', () => {
        const variablesServiceStub: VariablesService = TestBed.inject(VariablesService);
        const expectedVariables = new Service('testService', 'testKey', 'testAlias', 'testStage');
        const serviceSpy = spyOn(variablesServiceStub.onServiceUpdate, 'subscribe').and.returnValue(
            of(expectedVariables),
        );

        component.startUpdateSubscription();
        expect(serviceSpy).toHaveBeenCalled();
    });

    it('should have a onCheckboxChange function', () => {
        const checked = true;
        const service = 'mockService';
        component.onCheckboxChange(checked, service);
    });

    it('should set chekcked on onCheckboxChange function', () => {
        const checked = false;
        const service = 'mockService';
        component.onCheckboxChange(checked, service);
    });

    it('should have a deployService function', () => {
        component.tabClick(1);
        fixture.detectChanges();

        const expectedValue = [];
        component.formDeployService.get('deploy').setValue(expectedValue);

        const variablesService: VariablesService = TestBed.inject(VariablesService);
        const serviceSpy = spyOn(variablesService, 'deployService').and.returnValue(of(null));

        component.deployService();
        expect(serviceSpy).toHaveBeenCalledWith(expectedValue);
    });

    it('should have a menuDropdownClick function', () => {
        const variablesServiceStub: VariablesService = TestBed.inject(VariablesService);
        const serviceSpy = spyOn(variablesServiceStub, 'setEnvironment').and.returnValue(null);

        component.menuDropdownClick('testTitle', 'testClass');
        expect(component.itemDropdownClass).toEqual('testClass');
        expect(serviceSpy).toHaveBeenCalled();
    });
});
