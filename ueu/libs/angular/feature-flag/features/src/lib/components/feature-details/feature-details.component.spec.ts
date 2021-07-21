import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// components
import { FeatureDetailsComponent } from './feature-details.component';
import { FeatureLogComponent } from '../feature-log/feature-log.component';
import { FeatureSegmentationComponent } from '../feature-segmentation/feature-segmentation.component';

// services
import { FeaturesService } from '../../data-access/features/features.service';

// modules
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';

// interfaces
import { FeatureType, Feature, FeatureAuditing, FeatureCondition } from '../../models';
import { SimpleChange, SimpleChanges } from '@angular/core';

// directives
import {
    AuthQuery,
    AuthQueryMock,
    AuthService,
    AuthServiceMock,
    FeatureFlagAuthDirectivesModule,
    FeatureFlagPermissions,
} from '@picpay/feature-flag/auth';

// ng-mocks
import { MockComponents, MockedComponent, MockModule } from 'ng-mocks';
import { SharedPipesModule } from '@picpay/angular/shared/pipes';

// mocks
import { FeaturesServiceMock } from '../../data-access/features/mocks/features.service.mock';

describe('FeatureDetailsComponent', () => {
    let component: FeatureDetailsComponent;
    let fixture: ComponentFixture<FeatureDetailsComponent>;
    let mockFeature: Feature;

    beforeEach(() => {
        mockFeature = new Feature(
            'testName',
            'testDescription',
            FeatureType.BOOLEAN,
            'true',
            { id: 'testId', name: 'testName' },
            { id: 'testId', name: 'testName' },
            'testId',
            [new FeatureAuditing('mockId', 'mockMessage', '', 1, '', null)],
            [
                new FeatureCondition('mockName', 1, 10, 'true', []),
                new FeatureCondition('mockName2', 2, 10, 'false', []),
            ],
            'testDate',
            'testDate',
        );
        TestBed.configureTestingModule({
            declarations: [FeatureDetailsComponent, MockComponents(FeatureLogComponent, FeatureSegmentationComponent)],
            imports: [
                MockModule(MatButtonModule),
                MockModule(MatIconModule),
                MockModule(MatTabsModule),
                MockModule(SharedPipesModule),
                FeatureFlagAuthDirectivesModule,
                DesignSystemAngularModule,
            ],
            providers: [
                { provide: FeaturesService, useClass: FeaturesServiceMock },
                { provide: AuthQuery, useValue: new AuthQueryMock(true) },
                { provide: AuthService, useValue: new AuthServiceMock(false) },
            ],
        });
        fixture = TestBed.createComponent(FeatureDetailsComponent);
        component = fixture.componentInstance;
        component.feature = mockFeature;
        component.commits = [];

        fixture.detectChanges();
    });

    // controller

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have close event emitter', () => {
        expect(component.close).toBeDefined();
    });

    it('should have delete event emitter', () => {
        expect(component.delete).toBeDefined();
    });

    it('should have onClose function', () => {
        const emitSpy = spyOn(component.close, 'emit');

        component.onClose();

        expect(emitSpy).toHaveBeenCalledTimes(1);
    });

    it('should have onEdit function', () => {
        const emitSpy = spyOn(component.edit, 'emit');

        component.onEdit(component.feature);

        expect(emitSpy).toHaveBeenCalledWith(component.feature);
    });

    it('should have onDelete function', () => {
        const emitSpy = spyOn(component.delete, 'emit');

        component.onDelete('mockId');

        expect(emitSpy).toHaveBeenCalledWith('mockId');
    });

    it('should have a getTypeName function', () => {
        const service = TestBed.inject(FeaturesService);

        const spy = spyOn(service, 'getTypeName');

        component.getTypeName(FeatureType.BOOLEAN);

        expect(spy).toHaveBeenCalledWith(FeatureType.BOOLEAN);
    });

    it('should have onCollapse function', () => {
        expect(component.isCollapsed).toBe(false);

        component.onCollapse();

        expect(component.isCollapsed).toBe(true);

        component.onCollapse();

        expect(component.isCollapsed).toBe(false);
    });

    // template

    it('should have close btn', () => {
        const closeBtn = fixture.debugElement.query(By.css('.c-feature-details__close-btn'));

        expect(closeBtn).not.toBeNull();
    });

    it('should bind onClose to click action of close btn', () => {
        const closeBtn = fixture.debugElement.query(By.css('.c-feature-details__close-btn'));

        const functionSpy = spyOn(component, 'onClose');

        closeBtn.nativeElement.click();

        expect(functionSpy).toHaveBeenCalledTimes(1);
    });

    it('should have edit btn', () => {
        const deleteBtn = fixture.debugElement.query(By.css('.c-feature-details__edit-btn'));

        expect(deleteBtn).not.toBeNull();
    });

    it('should bind onEdit click action of edit btn', () => {
        const deleteBtn = fixture.debugElement.query(By.css('.c-feature-details__edit-btn'));

        const functionSpy = spyOn(component, 'onEdit');

        deleteBtn.nativeElement.click();

        expect(functionSpy).toHaveBeenCalledWith(mockFeature);
    });

    it('should have delete btn', () => {
        const deleteBtn = fixture.debugElement.query(By.css('.c-feature-details__delete-btn'));

        expect(deleteBtn).not.toBeNull();
    });

    it('should bind onDelete to click action of delete btn', () => {
        const deleteBtn = fixture.debugElement.query(By.css('.c-feature-details__delete-btn'));

        const functionSpy = spyOn(component, 'onDelete');

        deleteBtn.nativeElement.click();

        expect(functionSpy).toHaveBeenCalledWith(mockFeature.id);
    });

    it('should have title', () => {
        const title = fixture.debugElement.query(By.css('.c-feature-details__title'));

        expect(title).not.toBeNull();
        expect(title.nativeElement.textContent).toEqual(mockFeature.name);
    });

    it('should have description', () => {
        const description = fixture.debugElement.query(By.css('.c-feature-details__description'));

        expect(description).not.toBeNull();
        expect(description.nativeElement.textContent).toEqual(mockFeature.description);
    });

    it('should have type', () => {
        const type = fixture.debugElement.query(By.css('.c-feature-details__type'));

        expect(type).not.toBeNull();
        expect(type.nativeElement.textContent).toEqual('typeName');
    });

    it('should display feature id, value, application and squad', () => {
        const keys = fixture.debugElement.queryAll(By.css('.c-feature-details__tab-content--key'));
        const values = fixture.debugElement.queryAll(By.css('.c-feature-details__tab-content--value'));

        expect(keys.length).toEqual(4);
        expect(keys[0].nativeElement.textContent.trim()).toEqual('ID');
        expect(keys[1].nativeElement.textContent.trim()).toEqual('VALOR PADRÃO');
        expect(keys[2].nativeElement.textContent.trim()).toEqual('APLICAÇÃO DE DESTINO');
        expect(keys[3].nativeElement.textContent.trim()).toEqual('SQUAD RESPONSÁVEL');

        expect(values.length).toEqual(4);
        expect(values[0].nativeElement.textContent.trim()).toEqual(mockFeature.id);
        expect(values[1].nativeElement.textContent.trim()).toEqual(mockFeature.value.toString());
        expect(values[2].nativeElement.textContent.trim()).toEqual(mockFeature.application.name);
        expect(values[3].nativeElement.textContent.trim()).toEqual(mockFeature.squad.name);
    });

    it('should bind commits to feature-log component', () => {
        const featureLog = fixture.debugElement.query(By.css('.c-feature-details__log'))
            .componentInstance as MockedComponent<FeatureLogComponent>;

        expect(featureLog.commits).toBe(component.commits);
    });

    it('should bind conditions to feature-segmentations component', () => {
        const featureSegmentations = fixture.debugElement.queryAll(By.css('.c-feature-details__segmentation'));

        expect(featureSegmentations.length).toEqual(component.feature.conditions.length);

        const featureSegmentation1 = featureSegmentations[0]
            .componentInstance as MockedComponent<FeatureSegmentationComponent>;

        const featureSegmentation2 = featureSegmentations[1]
            .componentInstance as MockedComponent<FeatureSegmentationComponent>;

        expect(featureSegmentation1.segmentation).toBe(component.feature.conditions[0]);

        expect(featureSegmentation2.segmentation).toBe(component.feature.conditions[1]);
    });

    it('should have formatted json', () => {
        const supposedJsonContent = fixture.debugElement.query(By.css('.c-feature-details__tab-content-json'));
        const valueContent = fixture.debugElement.query(By.css('.c-feature-details__tab-content-default-value'));

        expect(supposedJsonContent).toBeNull();
        expect(valueContent).not.toBeNull();

        component.feature = { ...mockFeature, type: FeatureType.JSON };

        fixture.detectChanges();

        const jsonContent = fixture.debugElement.query(By.css('.c-feature-details__tab-content-json'));
        const supposedValueContent = fixture.debugElement.query(
            By.css('.c-feature-details__tab-content-default-value'),
        );

        expect(jsonContent).not.toBeNull();
        expect(supposedValueContent).toBeNull();
    });

    it('should correctly update permissions on feature change', () => {
        const emitSpy = spyOn(component, 'ngOnChanges').and.callThrough();

        const newFeature = new Feature(
            'featureName',
            'featureDescription',
            FeatureType.STRING,
            'true',
            { id: 'featureAppId', name: 'featureAppName' },
            { id: 'featureSquadId', name: 'featureSquadName' },
            'featureId',
            [new FeatureAuditing('mockId', 'mockMessage', '', 1, '', null)],
            [
                new FeatureCondition('featureConditionName', 1, 10, 'true', []),
                new FeatureCondition('featureConditionName2', 2, 10, 'false', []),
            ],
            'testDate',
            'testDate',
        );

        component.feature = newFeature;

        const featurePermissions = new FeatureFlagPermissions(false, true, ['featureSquadId'], ['featureSquadId']);

        const changes: SimpleChanges = {
            feature: new SimpleChange(mockFeature, newFeature, false),
        };

        component.ngOnChanges(changes);

        expect(emitSpy).toHaveBeenCalledWith(changes);
        expect(component.canShow).toEqual(featurePermissions);

        // should remove squad permissions when feature ins't received

        component.feature = null;

        const newChanges: SimpleChanges = {
            feature: new SimpleChange(newFeature, null, false),
        };

        component.ngOnChanges(newChanges);

        expect(component.canShow.availableToSquadAdmin[0]).toBeFalsy();
        expect(component.canShow.availableToSquadAdmin).not.toEqual(featurePermissions.availableToSquadAdmin);
        expect(component.canShow.availableToSquadEditor[0]).toBeFalsy();
        expect(component.canShow.availableToSquadEditor).not.toEqual(featurePermissions.availableToSquadEditor);

        // should still be available for global editors tho

        expect(component.canShow.availableToEditor).toBeTruthy();
        expect(component.canShow.availableToEditor).toEqual(featurePermissions.availableToEditor);

        // should still be available for global editors when changes don't affect the current feature

        const changesWithoutFeature: SimpleChanges = {
            commits: new SimpleChange(mockFeature.auditing, mockFeature.auditing, false),
        };

        component.ngOnChanges(changesWithoutFeature);

        expect(component.canShow.availableToEditor).toBeTruthy();
        expect(component.canShow.availableToEditor).toEqual(featurePermissions.availableToEditor);
    });
});
