import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { ModelsListComponent } from './models-list.component';

// modules
import { GlossaryModelsModule } from '../business-glossary-models.module';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { SharedModule, BreadcrumbService, BreadcrumbsServiceMock } from '@picpay/picpedia/shared';
import { BadgeCertificationModule } from '../../../components/badge-certification/badge-certification.module';

import { of } from 'rxjs';

// ng-mocks
import { MockModule } from 'ng-mocks';
import { BusinessGlossaryService } from '../../../data-access/business-glossary/business-glossary.service';
import { BusinessGlossaryServiceMock } from '../../../data-access/business-glossary/mocks/business-glossary.service.mock';
import { BusinessGlossaryQuery } from '../../../data-access/business-glossary/business-glossary.query';
import { BusinessGlossaryQueryMock } from '../../../data-access/business-glossary/mocks/business-glossary.query.mock';
import {
    mockBussinessGlossary,
    mockBussinessGlossaryDetail,
} from '../../../data-access/business-glossary/mocks/business-glossary.mock';

describe('ModelsListComponent', () => {
    let component: ModelsListComponent;
    let fixture: ComponentFixture<ModelsListComponent>;

    let breadcrumbsService: BreadcrumbService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                DesignSystemAngularModule,
                RouterTestingModule.withRoutes([]),
                MockModule(GlossaryModelsModule),
                MockModule(BadgeCertificationModule),
                MockModule(SharedModule),
            ],
            declarations: [ModelsListComponent],
            providers: [
                { provide: BusinessGlossaryService, useClass: BusinessGlossaryServiceMock },
                { provide: BreadcrumbService, useClass: BreadcrumbsServiceMock },
                { provide: BusinessGlossaryQuery, useClass: BusinessGlossaryQueryMock },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ModelsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        breadcrumbsService = TestBed.inject(BreadcrumbService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a getModelsList function on init', () => {
        const initSpy = spyOn(component, 'getModelsList');
        component.ngOnInit();
        expect(initSpy).toHaveBeenCalled();
    });

    it('should have a startUpdateModelsList function on init', () => {
        const initSpy = spyOn(component, 'startUpdateModelsList');
        component.ngOnInit();
        expect(initSpy).toHaveBeenCalled();
    });

    it('should have a updateBreadcrumbs function', () => {
        expect(component.updateBreadcrumbs).toBeTruthy();
    });

    it('should have a startUpdateModelsList function', () => {
        const serviceStub: BusinessGlossaryService = TestBed.inject(BusinessGlossaryService);
        const serviceSpy = spyOn(serviceStub.onDashboardsList, 'subscribe').and.returnValue(
            of(mockBussinessGlossary),
        );
        const getSpy = spyOn(serviceStub, 'getModelsList').and.returnValue(of(mockBussinessGlossary));

        component.startUpdateModelsList();
        component.getModelsList();
        expect(serviceSpy).toHaveBeenCalled();
        expect(getSpy).toHaveBeenCalled();
    });

    it('should have a getModelsList function', () => {
        const serviceStub: BusinessGlossaryService = TestBed.inject(BusinessGlossaryService);
        const serviceSpy = spyOn(serviceStub, 'getModelsList').and.returnValue(of(mockBussinessGlossary));

        component.getModelsList();
        expect(serviceSpy).toHaveBeenCalled();
    });

    it('should have a updateModelsListFavorite function', () => {
        const itemMock = true;
        const idMock = 1;
        const serviceStub: BusinessGlossaryService = TestBed.inject(BusinessGlossaryService);
        const serviceSpy = spyOn(serviceStub, 'updateDashboardsListFavorite').and.returnValue(
            of(mockBussinessGlossary),
        );

        component.updateModelsListFavorite(itemMock, idMock);
        expect(serviceSpy).toHaveBeenCalled();
    });

    it('should call update from breadcrumbsService when run updateBreadcrumbs function', () => {
        const updateSpy = spyOn(breadcrumbsService, 'update');
        component.updateBreadcrumbs();
        expect(updateSpy).toHaveBeenCalledTimes(1);
    });

    it('should have modelsList$ observable', () => {
        const glossaryQuery = TestBed.inject(BusinessGlossaryQuery);
        expect(component.modelsList$).toEqual(glossaryQuery.modelsList$);
    });

    it('should have titleModelsList$ observable', () => {
        const glossaryQuery = TestBed.inject(BusinessGlossaryQuery);
        expect(component.titleModelsList$).toEqual(glossaryQuery.titleModelsList$);
    });

    it('should have isLoadingModels$ observable', () => {
        const glossaryQuery = TestBed.inject(BusinessGlossaryQuery);
        expect(component.isLoadingModels$).toEqual(glossaryQuery.isLoadingDisplay$);
    });

    it('should have display if have modelsList$ value', () => {
        const list = fixture.debugElement.queryAll(By.css('.c-models-list__list'));
        expect(list.length).toEqual(mockBussinessGlossaryDetail.length);
        expect(list).not.toBeNull();
    });

    it('should display loading (if it is provided)', () => {
        component.isLoadingModels$ = of(true);
        fixture.detectChanges();

        const display = fixture.debugElement.query(By.css('.c-models-list__loading'));
        expect(display).not.toBeNull();
    });

    it('should not display loading (if it is not provided)', () => {
        component.isLoadingModels$ = of(false);
        fixture.detectChanges();

        const display = fixture.debugElement.query(By.css('.c-models-list__loading'));
        expect(display).toBeNull();
    });
});
