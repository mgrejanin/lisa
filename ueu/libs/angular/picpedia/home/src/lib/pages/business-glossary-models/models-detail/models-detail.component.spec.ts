import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { ModelsDetailComponent } from './models-detail.component';

// modules
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { SharedModule, BreadcrumbService, BreadcrumbsServiceMock } from '@picpay/picpedia/shared';
import { BadgeCertificationModule } from '../../../components/badge-certification/badge-certification.module';
import { RouterTestingModule } from '@angular/router/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { getOriginalRoutePathUrlByReplacingParamValues } from '@picpay/picpedia/shared';

// ng-mocks
import { MockModule } from 'ng-mocks';
import { ModelsDetailService } from '../../../data-access/business-glossary/models-detail/models-detail.service';
import { ModelsDetailServiceMock } from '../../../data-access/business-glossary/mocks/models-detail.service.mock';
import { ModelsDetailQuery } from '../../../data-access/business-glossary/models-detail/models-detail.query';
import { ModelsDetailQueryMock } from '../../../data-access/business-glossary/mocks/models-detail.query.mock';

describe('ModelsDetailComponent', () => {
    let component: ModelsDetailComponent;
    let fixture: ComponentFixture<ModelsDetailComponent>;

    let breadcrumbsService: BreadcrumbService;
    let modelsDetailQuery: ModelsDetailQuery;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                DesignSystemAngularModule,
                RouterTestingModule.withRoutes([]),
                MockModule(BadgeCertificationModule),
                MockModule(SharedModule),
                MockModule(MatTabsModule),
                MockModule(MatMenuModule),
            ],
            declarations: [ModelsDetailComponent],
            providers: [
                { provide: ModelsDetailService, useClass: ModelsDetailServiceMock },
                { provide: BreadcrumbService, useClass: BreadcrumbsServiceMock },
                { provide: ModelsDetailQuery, useClass: ModelsDetailQueryMock },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ModelsDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        breadcrumbsService = TestBed.inject(BreadcrumbService);
        modelsDetailQuery = TestBed.inject(ModelsDetailQuery);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a updateBreadcrumbs function', () => {
        expect(component.updateBreadcrumbs).toBeTruthy();
    });

    it('should call update from breadcrumbsService when run updateBreadcrumbs function', () => {
        const updateSpy = spyOn(breadcrumbsService, 'update');
        component.updateBreadcrumbs();
        expect(updateSpy).toHaveBeenCalledTimes(1);
    });

    it('should have isLoadingModels$ observable', () => {
        expect(component.isLoadingModels$).toEqual(modelsDetailQuery.isLoadingDisplay$);
    });

    it('should have titleModelsDetail$ observable', () => {
        expect(component.titleModelsDetail$).toEqual(modelsDetailQuery.titleModelsDetail$);
    });

    it('should have descriptionModelsDetail$ observable', () => {
        expect(component.descriptionModelsDetail$).toEqual(modelsDetailQuery.descriptionModelsDetail$);
    });

    it('should have resultModelsDetail$ observable', () => {
        expect(component.resultModelsDetail$).toEqual(modelsDetailQuery.resultModelsDetail$);
    });

    it('should have projectModelsDetail$ observable', () => {
        expect(component.projectModelsDetail$).toEqual(modelsDetailQuery.projectModelsDetail$);
    });

    it('should have timesIaModelsDetail$ observable', () => {
        expect(component.timesIaModelsDetail$).toEqual(modelsDetailQuery.timesIaModelsDetail$);
    });

    it('should have timeImpactedModelsDetail$ observable', () => {
        expect(component.timeImpactedModelsDetail$).toEqual(modelsDetailQuery.timeImpactedModelsDetail$);
    });

    it('should have tagsModelsDetail$ observable', () => {
        expect(component.tagsModelsDetail$).toEqual(modelsDetailQuery.tagsModelsDetail$);
    });

    it('should have stewardModelsDetail$ observable', () => {
        expect(component.stewardModelsDetail$).toEqual(modelsDetailQuery.stewardModelsDetail$);
    });

    it('should have ownerModelsDetail$ observable', () => {
        expect(component.ownerModelsDetail$).toEqual(modelsDetailQuery.ownerModelsDetail$);
    });

    it('should have usersModelsDetail$ observable', () => {
        expect(component.usersModelsDetail$).toEqual(modelsDetailQuery.usersModelsDetail$);
    });

    it('should have badgeModelsDetail$ observable', () => {
        expect(component.badgeModelsDetail$).toEqual(modelsDetailQuery.badgeModelsDetail$);
    });

    it('should have getCurrentUrlPath function', () => {
        expect(component.getCurrentUrlPath).toBeTruthy();
    });

    it('should return params getCurrentUrlPath function', () => {
        const params = {key: 'mockKey'};
        const mock = 'mock';

        expect(component.getCurrentUrlPath(params, mock)).toEqual(getOriginalRoutePathUrlByReplacingParamValues(mock, params));
    });

    it('should return null params getCurrentUrlPath function', () => {
        expect(component.getCurrentUrlPath(null, '')).toEqual('')
    });

    it('should have getCurrentUrlPathReplace function', () => {
        expect(component.getCurrentUrlPathReplace).toBeTruthy();
    });

    it('should return params getCurrentUrlPathReplace function', () => {
        const params = {key: 'mockKey'};
        const mock = 'mock';

        expect(component.getCurrentUrlPathReplace(params, mock)).toEqual(getOriginalRoutePathUrlByReplacingParamValues(mock, params));
    });

    it('should return null params getCurrentUrlPathReplace function', () => {
        expect(component.getCurrentUrlPathReplace(null, '')).toEqual('')
    });

    it('should display loading (if it is provided)', () => {
        component.isLoadingModels$ = of(true);
        fixture.detectChanges();

        const display = fixture.debugElement.query(By.css('.c-models-detail__loading'));
        expect(display).not.toBeNull();
    });

    it('should not display loading (if it is not provided)', () => {
        component.isLoadingModels$ = of(false);
        fixture.detectChanges();

        const display = fixture.debugElement.query(By.css('.c-models-detail__loading'));
        expect(display).toBeNull();
    });

    it('should have display if have tagsModelsDetail$ value', () => {
        const item = fixture.debugElement.queryAll(By.css('.c-models-detail__tag'));
        const labelMock = [{ label: 'mockLabel' }];

        expect(item.length).toEqual(labelMock.length);
        expect(item).not.toBeNull();
    });

    it('should have display if have stewardModelsDetail$ value', () => {
        const item = fixture.debugElement.queryAll(By.css('.c-models-detail__text-users'));
        expect(item.length).toEqual(
            [
                { name: 'mockName1', email: 'mockEmail1', figure: 'mockFigure1' },
                { name: 'mockName2', email: 'mockEmail2', figure: 'mockFigure2' },
            ].length,
        );
        expect(item).not.toBeNull();
    });

    it('should have display if have ownerModelsDetail$ value', () => {
        const item = fixture.debugElement.queryAll(By.css('.c-models-detail__text-users'));
        expect(item.length).toEqual(
            [
                { name: 'mockName1', email: 'mockEmail1', figure: 'mockFigure1' },
                { name: 'mockName2', email: 'mockEmail2', figure: 'mockFigure2' },
            ].length,
        );
        expect(item).not.toBeNull();
    });

    it('should have display if have usersModelsDetail$ value', () => {
        const item = fixture.debugElement.queryAll(By.css('.c-models-detail__figure-users'));
        expect(item.length).toEqual(
            [{ figure: 'mockFigure1' }, { figure: 'mockFigure2' }, { figure: 'mockFigure3' }].length,
        );
        expect(item).not.toBeNull();
    });
});
