import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxMaskModule } from 'ngx-mask';

// modules
import { SharedModule } from '@picpay/feature-flag/shared';

// material
import { MatOption } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';

// components
import { FeatureWorkbenchComponent } from './feature-workbench.component';

// ng-mocks
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { MockComponents, MockModule } from 'ng-mocks';

// mocks
import { FeaturesQueryMock, mockFeature } from '../../data-access/features/mocks/features.query.mock';
import { FeaturesServiceMock } from '../../data-access/features/mocks/features.service.mock';

// data-access
import { FeaturesQuery } from '../../data-access/features/features.query';
import { FeaturesService } from '../../data-access/features/features.service';

// services
import { MockNotificationsService, NotificationsService } from '@picpay/angular/shared/core/notifications';

// interfaces
import {
    FeatureType,
    UpdateFeatureParams,
    FeatureCondition,
    FeatureConditionExpression,
    Comparator,
    FeatureCreate,
} from '../../models';

// rxjs
import { of } from 'rxjs';

describe('FeatureWorkbenchComponent', () => {
    let component: FeatureWorkbenchComponent;
    let fixture: ComponentFixture<FeatureWorkbenchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FeatureWorkbenchComponent, MockComponents(MatOption, MatProgressSpinner, MatSelect)],
            imports: [
                MockModule(MatFormFieldModule),
                MockModule(MatIconModule),
                MockModule(NgxMaskModule),
                MockModule(SharedModule),
                MockModule(MatInputModule),
                ReactiveFormsModule,
                RouterTestingModule,
            ],
            providers: [
                { provide: FeaturesQuery, useClass: FeaturesQueryMock },
                { provide: FeaturesService, useClass: FeaturesServiceMock },
                { provide: ActivatedRoute, useValue: { snapshot: { data: { editing: false } } } },
                { provide: NotificationsService, useValue: new MockNotificationsService({ confimed: true }) },
            ],
        }).compileComponents();
    });

    describe('generic', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(FeatureWorkbenchComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        // CONTROLLER

        it('should call getApplications on init', () => {
            const service = TestBed.inject(FeaturesService);

            const serviceSpy = spyOn(service, 'getApplications');

            component.ngOnInit();

            expect(serviceSpy).toHaveBeenCalledTimes(1);
        });

        it('should call getSquads on init', () => {
            const service = TestBed.inject(FeaturesService);

            const serviceSpy = spyOn(service, 'getSquads');

            component.ngOnInit();

            expect(serviceSpy).toHaveBeenCalledTimes(1);
        });

        it('should call getClientGroups when getAppClientGroups function is triggered', () => {
            const service = TestBed.inject(FeaturesService);

            const serviceSpy = spyOn(service, 'getClientGroups');

            component.getAppClientGroups('PicPayVerdinho');

            expect(serviceSpy).toHaveBeenCalledTimes(1);
        });

        it('should have onReturn function', async () => {
            const router = TestBed.inject(Router);

            const routerSpy = spyOn(router, 'navigate');

            await component.onReturn();

            expect(routerSpy).toHaveBeenCalledWith(['../']);
        });

        it('should have conditions getter function', () => {
            const conditions = component.conditions;

            const expectedConditions = component.form.get('conditions') as FormArray;

            expect(conditions).toBe(expectedConditions);
        });

        it('should have getConditionGroup function', () => {
            component.onAddCondition();

            const expectedFormGroup = component.conditions.controls[0] as FormGroup;
            const formGroup = component.getConditionGroup(0);

            expect(formGroup).toEqual(expectedFormGroup);
        });

        it('should have on onAddCondition function', () => {
            const formBuilder = TestBed.inject(FormBuilder);

            const expectedFormGroup = formBuilder.group({
                id: [null],
                name: ['', Validators.required],
                value: ['', Validators.required],
                percentage: [0, Validators.compose([Validators.required, Validators.min(1), Validators.max(100)])],
                system: ['', Validators.required],
                versionComparator: [''],
                clientGroup: [''],
            });

            const spy = spyOn(component.conditions, 'push').and.callThrough();

            component.onAddCondition();

            expect(spy).toHaveBeenCalled();

            // minor workaround to bypass
            // toHaveBeenCalledWith not recognizing
            // the expectedFormGroup because it is a
            // different object. In this, i am just
            // checking if it has the proper controls by checking
            // their names.
            const callArguments = spy.calls.mostRecent().args[0];

            expect(Object.keys(callArguments.controls)).toEqual(Object.keys(expectedFormGroup.controls));

            // Testing the subscription to version comparator changes.
            // All these controls should not be defined at the condition creation.
            expect(component.getConditionGroup(0).controls.version).toBeUndefined();
            expect(component.getConditionGroup(0).controls.minVersion).toBeUndefined();
            expect(component.getConditionGroup(0).controls.maxVersion).toBeUndefined();

            component.getConditionGroup(0).controls.versionComparator.setValue('greater');
            expect(component.getConditionGroup(0).controls.version).toBeDefined();
            expect(component.getConditionGroup(0).controls.minVersion).toBeUndefined();
            expect(component.getConditionGroup(0).controls.maxVersion).toBeUndefined();

            component.getConditionGroup(0).controls.versionComparator.setValue('');
            expect(component.getConditionGroup(0).controls.version).toBeUndefined();
            expect(component.getConditionGroup(0).controls.minVersion).toBeUndefined();
            expect(component.getConditionGroup(0).controls.maxVersion).toBeUndefined();

            component.getConditionGroup(0).controls.versionComparator.setValue('');
            component.getConditionGroup(0).controls.versionComparator.setValue('greater-or-equal');
            expect(component.getConditionGroup(0).controls.version).toBeDefined();
            expect(component.getConditionGroup(0).controls.minVersion).toBeUndefined();
            expect(component.getConditionGroup(0).controls.maxVersion).toBeUndefined();

            component.getConditionGroup(0).controls.versionComparator.setValue('');
            component.getConditionGroup(0).controls.versionComparator.setValue('between');
            expect(component.getConditionGroup(0).controls.version).toBeUndefined();
            expect(component.getConditionGroup(0).controls.minVersion).toBeDefined();
            expect(component.getConditionGroup(0).controls.maxVersion).toBeDefined();

            component.getConditionGroup(0).controls.versionComparator.setValue('');
            component.getConditionGroup(0).controls.versionComparator.setValue('less');
            expect(component.getConditionGroup(0).controls.version).toBeDefined();
            expect(component.getConditionGroup(0).controls.minVersion).toBeUndefined();
            expect(component.getConditionGroup(0).controls.maxVersion).toBeUndefined();

            component.getConditionGroup(0).controls.versionComparator.setValue('');
            component.getConditionGroup(0).controls.versionComparator.setValue('less-or-equal');
            expect(component.getConditionGroup(0).controls.version).toBeDefined();
            expect(component.getConditionGroup(0).controls.minVersion).toBeUndefined();
            expect(component.getConditionGroup(0).controls.maxVersion).toBeUndefined();

            component.getConditionGroup(0).controls.versionComparator.setValue('');
            component.getConditionGroup(0).controls.versionComparator.setValue('equal');
            expect(component.getConditionGroup(0).controls.version).toBeDefined();
            expect(component.getConditionGroup(0).controls.minVersion).toBeUndefined();
            expect(component.getConditionGroup(0).controls.maxVersion).toBeUndefined();
        });

        it('should have on onRemoveCondition function (user confirm)', () => {
            const modalsService = TestBed.inject(NotificationsService);

            const confirmationSpy = spyOn(modalsService, 'openConfirmationModal').and.returnValue({
                afterClosed: () => of({ confirm: true }),
            });

            const index = 780;
            const removeSpy = spyOn(component.conditions, 'removeAt');

            component.onRemoveCondition(index);

            expect(confirmationSpy).toHaveBeenCalledWith(
                'Excluir segmentação',
                'Ao excluir essa segmentação, você não poderá mais visualizá-la. Deseja realmente excluir?',
            );

            expect(removeSpy).toHaveBeenCalledWith(index);
        });

        it('should have on onRemoveCondition function (user dont confirm)', () => {
            const modalsService = TestBed.inject(NotificationsService);

            const confirmationSpy = spyOn(modalsService, 'openConfirmationModal').and.returnValue({
                afterClosed: () => of({ confirm: false }),
            });

            const index = 780;
            const removeSpy = spyOn(component.conditions, 'removeAt');

            component.onRemoveCondition(index);

            expect(confirmationSpy).toHaveBeenCalledWith(
                'Excluir segmentação',
                'Ao excluir essa segmentação, você não poderá mais visualizá-la. Deseja realmente excluir?',
            );

            expect(removeSpy).not.toHaveBeenCalled();
        });

        it('should have updateValidators function', () => {
            const jsonError: ValidationErrors = { ['invalidJson']: true };
            const requiredError: ValidationErrors = { ['required']: true };

            const typeControl = component.form.get('type');

            typeControl.setValue(FeatureType.JSON);
            component.onAddCondition();
            component.updateValidators(typeControl.value);

            const valueControl = component.form.get('value');
            const conditionValueControl = component.conditions.controls[0].get('value');

            valueControl.setValue('this is not a valid json');
            conditionValueControl.setValue('this also is not a valid json');

            expect(valueControl.valid).toBeFalsy();
            expect(valueControl.errors).toEqual(jsonError);
            expect(conditionValueControl.valid).toBeFalsy();
            expect(conditionValueControl.errors).toEqual(jsonError);

            valueControl.setValue('{"is this json valid": true}');
            conditionValueControl.setValue('{"is this json valid": true}');

            expect(valueControl.valid).toBeTruthy();
            expect(valueControl.errors).toEqual(null);
            expect(conditionValueControl.valid).toBeTruthy();
            expect(conditionValueControl.errors).toEqual(null);

            typeControl.setValue(FeatureType.BOOLEAN);
            component.updateValidators(typeControl.value);

            expect(valueControl.valid).toBeFalsy();
            expect(valueControl.errors).toEqual(requiredError);
            expect(conditionValueControl.valid).toBeFalsy();
            expect(conditionValueControl.errors).toEqual(requiredError);

            typeControl.setValue(FeatureType.STRING);
            component.updateValidators(typeControl.value);

            valueControl.setValue('');
            conditionValueControl.setValue('');

            expect(valueControl.valid).toBeFalsy();
            expect(valueControl.errors).toEqual(requiredError);
            expect(conditionValueControl.valid).toBeFalsy();
            expect(conditionValueControl.errors).toEqual(requiredError);

            valueControl.setValue('any string');
            conditionValueControl.setValue('any string');

            expect(valueControl.valid).toBeTruthy();
            expect(valueControl.errors).toEqual(null);
            expect(conditionValueControl.valid).toBeTruthy();
            expect(conditionValueControl.errors).toEqual(null);
        });

        it('should have formatJsonInput function', () => {
            const mock = {
                mock: true,
                mock2: 'mock',
                mock3: ['mock', 'mock', 'mock'],
                mock4: {
                    mock: {
                        mock: 'mock',
                        mock2: 'mock',
                        mock3: {
                            mock: 'mock',
                            mock2: 'mock',
                        },
                    },
                },
            };

            const typeControl = component.form.get('type');
            const valueControl = component.form.get('value');

            const stringifiedJson = JSON.stringify(mock);
            const formattedJson = JSON.stringify(mock, undefined, 4);

            typeControl.setValue(FeatureType.JSON);
            valueControl.setValue(stringifiedJson);
            component.formatJsonInput(valueControl);

            expect(valueControl.value).not.toEqual(stringifiedJson);
            expect(valueControl.value).toEqual(formattedJson);
        });

        it('should have getConditionName', () => {
            // adding a new condition
            component.onAddCondition();

            let name = component.getConditionName(0);

            // should return default value
            expect(name).toBe('Nova segmentação');

            const control = component.conditions.get('0') as FormGroup;
            control.controls.name.setValue('mockName');

            name = component.getConditionName(0);

            // should return the name control value
            expect(name).toBe('mockName');
        });

        it('should have applications$ observable', () => {
            const featuresQuery = TestBed.inject(FeaturesQuery);

            expect(component.applications$).toEqual(featuresQuery.applications$);
        });

        it('should have squads$ observable', () => {
            const featuresQuery = TestBed.inject(FeaturesQuery);

            expect(component.squads$).toEqual(featuresQuery.squads$);
        });

        it('should have clientGroups$ observable', () => {
            const featuresQuery = TestBed.inject(FeaturesQuery);

            expect(component.clientGroups$).toEqual(featuresQuery.clientGroups$);
        });

        it('should have isLoading$ observable', () => {
            const featuresQuery = TestBed.inject(FeaturesQuery);

            expect(component.isLoading$).toEqual(featuresQuery.isLoading$);
        });

        // TEMPLATE

        it('should have add condition btn', () => {
            const btn = fixture.debugElement.query(By.css('.c-feature-workbench__add-condition-btn'));
            const spy = spyOn(component, 'onAddCondition');
            const form = component.form;

            expect(btn).not.toBeNull();

            btn.nativeElement.click();

            expect(spy).not.toHaveBeenCalled();

            form.controls.application.setValue(mockFeature.application);
            fixture.detectChanges();

            btn.nativeElement.click();

            expect(spy).not.toHaveBeenCalled();

            form.controls.type.setValue(mockFeature.type);
            fixture.detectChanges();

            btn.nativeElement.click();

            expect(spy).toHaveBeenCalledTimes(1);
        });

        it('should have cancel btn', () => {
            const btn = fixture.debugElement.query(By.css('.c-feature-workbench__cancel-btn'));
            const spy = spyOn(component, 'onReturn');

            expect(btn).not.toBeNull();

            btn.nativeElement.click();

            expect(spy).toHaveBeenCalledTimes(1);
        });

        it('should have apply btn', () => {
            // making the form valid
            const form = component.form;

            const expectedFeature = new FeatureCreate(
                'mockName',
                'mockDescription',
                FeatureType.BOOLEAN,
                'true',
                'mockApp',
                'mockSquad',
                [],
            );

            form.controls.name.setValue(expectedFeature.name);
            form.controls.description.setValue(expectedFeature.description);
            form.controls.type.setValue(expectedFeature.type);
            form.controls.value.setValue(expectedFeature.value);
            form.controls.application.setValue(expectedFeature.application);
            form.controls.squad.setValue(expectedFeature.squad);
            form.updateValueAndValidity();

            const btn = fixture.debugElement.query(By.css('.c-feature-workbench__apply-btn'));
            const spy = spyOn(component, 'onSubmit');

            expect(btn).not.toBeNull();
            expect(btn.nativeElement.textContent.trim()).toBe('aplicar');

            btn.nativeElement.click();

            expect(spy).toHaveBeenCalledTimes(1);
        });
    });

    describe('creation mode', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(FeatureWorkbenchComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        // CONTROLLER
        it('isEditing variable should be false', () => {
            expect(component.isEditing).toBe(false);
        });

        it('should have an onSubmit function', () => {
            const service = TestBed.inject(FeaturesService);
            const form = component.form;

            const createSpy = spyOn(service, 'createFeature');

            // should not submit if the form is invalid
            component.onSubmit();

            expect(form.invalid).toBe(true);
            expect(createSpy).not.toHaveBeenCalled();

            // should submit

            const expectedCondition = new FeatureCondition('mockName', 1, 89, 'false', [
                new FeatureConditionExpression('appOS', Comparator.EQUAL, 'android'),
            ]);
            const expectedFeature = new FeatureCreate(
                'mockName',
                'mockDescription',
                FeatureType.BOOLEAN,
                'true',
                'mockApp',
                'mockSquad',
                [expectedCondition],
            );

            // setting form control values
            form.controls.name.setValue(expectedFeature.name);
            form.controls.description.setValue(expectedFeature.description);
            form.controls.type.setValue(expectedFeature.type);
            form.controls.value.setValue('true');
            form.controls.application.setValue(expectedFeature.application);
            form.controls.squad.setValue(expectedFeature.squad);

            // adding condition
            component.onAddCondition();

            const control = component.conditions.get('0') as FormGroup;
            control.controls.name.setValue('mockName');
            control.controls.value.setValue('false');
            control.controls.percentage.setValue(89);
            control.controls.system.setValue('android');

            form.updateValueAndValidity();

            expect(form.valid).toBe(true);

            component.onSubmit();
            expect(createSpy).toHaveBeenCalledWith(expectedFeature);

            // testing app version expressions
            // GREATER
            createSpy.calls.reset();
            control.controls.versionComparator.setValue('greater');

            component.onSubmit();
            expect(createSpy).not.toHaveBeenCalled();

            control.controls.version.setValue('mockVersion');
            expectedFeature.conditions[0].expressions.push(
                new FeatureConditionExpression('appVersion', Comparator.GREATER, 'mockVersion'),
            );

            component.onSubmit();
            expect(createSpy).toHaveBeenCalledWith(expectedFeature);

            // GREATER OR EQUAL
            createSpy.calls.reset();
            control.controls.versionComparator.setValue('greater-or-equal');

            component.onSubmit();
            expect(createSpy).not.toHaveBeenCalled();

            control.controls.version.setValue('mockVersion');
            expectedFeature.conditions[0].expressions.pop();
            expectedFeature.conditions[0].expressions.push(
                new FeatureConditionExpression('appVersion', Comparator.GREATER_OR_EQUAL, 'mockVersion'),
            );

            component.onSubmit();
            expect(createSpy).toHaveBeenCalledWith(expectedFeature);

            // LESS
            createSpy.calls.reset();
            control.controls.versionComparator.setValue('less');

            component.onSubmit();
            expect(createSpy).not.toHaveBeenCalled();

            control.controls.version.setValue('mockVersion');
            expectedFeature.conditions[0].expressions.pop();
            expectedFeature.conditions[0].expressions.push(
                new FeatureConditionExpression('appVersion', Comparator.LESS, 'mockVersion'),
            );

            component.onSubmit();
            expect(createSpy).toHaveBeenCalledWith(expectedFeature);

            // LESS OR EQUAL
            createSpy.calls.reset();
            control.controls.versionComparator.setValue('less-or-equal');

            component.onSubmit();
            expect(createSpy).not.toHaveBeenCalled();

            control.controls.version.setValue('mockVersion');
            expectedFeature.conditions[0].expressions.pop();
            expectedFeature.conditions[0].expressions.push(
                new FeatureConditionExpression('appVersion', Comparator.LESS_OR_EQUAL, 'mockVersion'),
            );

            component.onSubmit();
            expect(createSpy).toHaveBeenCalledWith(expectedFeature);

            // EQUAL
            createSpy.calls.reset();
            control.controls.versionComparator.setValue('equal');

            component.onSubmit();
            expect(createSpy).not.toHaveBeenCalled();

            control.controls.version.setValue('mockVersion');
            expectedFeature.conditions[0].expressions.pop();
            expectedFeature.conditions[0].expressions.push(
                new FeatureConditionExpression('appVersion', Comparator.EQUAL, 'mockVersion'),
            );

            component.onSubmit();
            expect(createSpy).toHaveBeenCalledWith(expectedFeature);

            // BETWEEN
            createSpy.calls.reset();
            control.controls.versionComparator.setValue('between');

            component.onSubmit();
            expect(createSpy).not.toHaveBeenCalled();

            control.controls.minVersion.setValue('minMockVersion');
            control.controls.maxVersion.setValue('maxMockVersion');
            expectedFeature.conditions[0].expressions.pop();
            expectedFeature.conditions[0].expressions.push(
                new FeatureConditionExpression('appVersion', Comparator.GREATER_OR_EQUAL, 'minMockVersion'),
            );
            expectedFeature.conditions[0].expressions.push(
                new FeatureConditionExpression('appVersion', Comparator.LESS_OR_EQUAL, 'maxMockVersion'),
            );

            component.onSubmit();
            expect(createSpy).toHaveBeenCalledWith(expectedFeature);

            // client group expression
            createSpy.calls.reset();
            control.controls.clientGroup.setValue('PicPayLovers');

            expectedFeature.conditions[0].expressions.unshift(
                new FeatureConditionExpression('groups', Comparator.CONTAINS, 'PicPayLovers'),
            );

            component.onSubmit();
            expect(createSpy).toHaveBeenCalledWith(expectedFeature);

            // json feature type
            createSpy.calls.reset();

            form.controls.type.setValue(FeatureType.JSON);
            expectedFeature.type = FeatureType.JSON;

            /* eslint-disable no-useless-escape */
            const formattedJson = '{\n    \"buttonColor\": \"#000000\",\n    \"buttonDarkColor\": \"#F4F4F5\"\n}' //prettier-ignore

            const unformattedJson = '{\"buttonColor\":\"#000000\",\"buttonDarkColor\":\"#F4F4F5\"}' //prettier-ignore
            /* eslint-enable no-useless-escape */

            form.controls.value.setValue(formattedJson);
            expectedFeature.value = unformattedJson;

            control.controls.value.setValue(formattedJson);
            expectedFeature.conditions[0].value = unformattedJson;

            component.onSubmit();
            expect(createSpy).toHaveBeenCalledWith(expectedFeature);
        });

        // TEMPLATE

        it('should have title', () => {
            const title = fixture.debugElement.query(By.css('.c-feature-workbench__title'));

            expect(title).not.toBeNull();
            expect(title.nativeElement.textContent.trim()).toBe('Criar funcionalidade');
        });

        it('should not have commit message field', () => {
            const commitMessageField = fixture.debugElement.query(By.css('.c-update-feature__commit-message'));

            expect(commitMessageField).toBeNull();
        });

        it('should have boolean input', () => {
            component.onAddCondition();
            fixture.detectChanges();

            const supposedBooleanInput = fixture.debugElement.query(By.css('.c-feature-workbench__form-boolean-input'));
            const valueInput = fixture.debugElement.query(By.css('.c-feature-workbench__form-value-input'));

            expect(supposedBooleanInput).toBeNull();
            expect(valueInput).not.toBeNull();

            const supposedConditionBooleanInput = fixture.debugElement.query(
                By.css('.c-feature-workbench__form-condition-boolean-input'),
            );
            const conditionValueInput = fixture.debugElement.query(
                By.css('.c-feature-workbench__form-condition-value-input'),
            );

            expect(supposedConditionBooleanInput).toBeNull();
            expect(conditionValueInput).not.toBeNull();

            component.form.controls.type.setValue(FeatureType.BOOLEAN);
            fixture.detectChanges();

            const booleanInput = fixture.debugElement.query(By.css('.c-feature-workbench__form-boolean-input'));
            const supposedValueInput = fixture.debugElement.query(By.css('.c-feature-workbench__form-value-input'));

            expect(booleanInput).not.toBeNull();
            expect(supposedValueInput).toBeNull();

            const conditionBooleanInput = fixture.debugElement.query(
                By.css('.c-feature-workbench__form-condition-boolean-input'),
            );
            const supposedConditionValueInput = fixture.debugElement.query(
                By.css('.c-feature-workbench__form-condition-value-input'),
            );

            expect(conditionBooleanInput).not.toBeNull();
            expect(supposedConditionValueInput).toBeNull();
        });
    });

    describe('editing mode', () => {
        beforeEach(() => {
            TestBed.overrideProvider(ActivatedRoute, { useValue: { snapshot: { data: { editing: true } } } });

            fixture = TestBed.createComponent(FeatureWorkbenchComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        // CONTROLLER

        it('isEditing variable should be true', () => {
            expect(component.isEditing).toBe(true);
        });

        it('should return to root if there is no activeFeature on init', () => {
            const query = TestBed.inject(FeaturesQuery);
            query.activeFeature$ = of(null);

            const router = TestBed.inject(Router);

            const routerSpy = spyOn(router, 'navigate');

            component.ngOnInit();

            expect(routerSpy).toHaveBeenCalledWith(['../']);
        });

        it('should set activeFeature values on the form on init', () => {
            const form = component.form.controls;

            // testing against the mockFeature used by the query mock
            expect(form.name.value).toBe(mockFeature.name);
            expect(form.description.value).toBe(mockFeature.description);
            expect(form.application.value).toBe(mockFeature.application.id);
            expect(form.squad.value).toBe(mockFeature.squad.id);
            expect(form.type.value).toBe(mockFeature.type);
            expect(form.value.value).toBe(mockFeature.value);

            // checking if the name,
            // application and type input are disabled
            expect(form.name.disabled).toBe(true);
            expect(form.application.disabled).toBe(true);
            expect(form.squad.disabled).toBe(true);
            expect(form.type.disabled).toBe(true);

            // checking if the conditions were properly added
            expect(component.conditions.length).toBe(mockFeature.conditions.length);

            expect(component.getConditionGroup(0).controls.name.value).toBe(mockFeature.conditions[0].name);
            expect(component.getConditionGroup(0).controls.value.value).toBe(mockFeature.conditions[0].value);
            expect(component.getConditionGroup(0).controls.percentage.value).toBe(mockFeature.conditions[0].percentage);
            expect(component.getConditionGroup(0).controls.system.value).toBe(
                mockFeature.conditions[0].expressions[0].value,
            );

            // checks if client group was added
            expect(component.getConditionGroup(7).controls.clientGroup.value).toBe(
                mockFeature.conditions[7].expressions[0].value,
            );

            // Checking if the validators were
            // added to commit message control
            const requiredError: ValidationErrors = { ['required']: true };
            expect(form.message.errors).toEqual(requiredError);
        });

        it('should have an onSubmit function', () => {
            const service = TestBed.inject(FeaturesService);
            const form = component.form;

            const updatedSpy = spyOn(service, 'updateFeature');

            // should not submit if the form is invalid
            component.onSubmit();

            expect(form.invalid).toBe(true);
            expect(updatedSpy).not.toHaveBeenCalled();

            // should submit

            const expectedParams = new UpdateFeatureParams(
                'mockDescription',
                'false',
                'mockMessage',
                mockFeature.conditions,
            );

            form.controls.description.setValue(expectedParams.description);
            form.controls.value.setValue(expectedParams.value);
            form.controls.message.setValue(expectedParams.commitMessage);
            form.updateValueAndValidity();

            expect(form.valid).toBe(true);

            component.onSubmit();
            expect(updatedSpy).toHaveBeenCalledWith('mockId', expectedParams);

            // should not submit with invalid conditions

            updatedSpy.calls.reset();

            const invalidCondition = new FeatureCondition('mockGroup', 9, 50, 'false', [
                new FeatureConditionExpression('groups', Comparator.CONTAINS, 'PicPayLovers'),
            ]);

            expectedParams.conditions.push(invalidCondition);

            component.ngOnInit();

            component.onSubmit();

            expect(form.invalid).toBe(true);
            expect(updatedSpy).not.toHaveBeenCalled();
        });

        // TEMPLATE

        it('should have title', () => {
            const title = fixture.debugElement.query(By.css('.c-feature-workbench__title'));

            expect(title).not.toBeNull();
            expect(title.nativeElement.textContent.trim()).toBe('Editar funcionalidade');
        });

        it('should have commit message field', () => {
            const commitMessageField = fixture.debugElement.query(By.css('.c-update-feature__commit-message'));

            expect(commitMessageField).not.toBeNull();
        });
    });
});
