import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { MetricsListComponent } from './metrics-list.component';

// modules
import { GlossaryMetricsModule } from '../business-glossary-metrics.module';
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

describe('MetricsListComponent', () => {
    let component: MetricsListComponent;
    let fixture: ComponentFixture<MetricsListComponent>;

    let breadcrumbsService: BreadcrumbService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                DesignSystemAngularModule,
                RouterTestingModule.withRoutes([]),
                MockModule(GlossaryMetricsModule),
                MockModule(BadgeCertificationModule),
                MockModule(SharedModule),
            ],
            declarations: [MetricsListComponent],
            providers: [
                { provide: BusinessGlossaryService, useClass: BusinessGlossaryServiceMock },
                { provide: BreadcrumbService, useClass: BreadcrumbsServiceMock },
                { provide: BusinessGlossaryQuery, useClass: BusinessGlossaryQueryMock },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MetricsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        breadcrumbsService = TestBed.inject(BreadcrumbService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a getMetricsList function on init', () => {
        const initSpy = spyOn(component, 'getMetricsList');
        component.ngOnInit();
        expect(initSpy).toHaveBeenCalled();
    });

    it('should have a startUpdateMetricsList function on init', () => {
        const initSpy = spyOn(component, 'startUpdateMetricsList');
        component.ngOnInit();
        expect(initSpy).toHaveBeenCalled();
    });

    it('should have a updateBreadcrumbs function', () => {
        expect(component.updateBreadcrumbs).toBeTruthy();
    });

    it('should have a startUpdateMetricsList function', () => {
        const serviceStub: BusinessGlossaryService = TestBed.inject(BusinessGlossaryService);
        const serviceSpy = spyOn(serviceStub.onDashboardsList, 'subscribe').and.returnValue(
            of(mockBussinessGlossary),
        );
        const getSpy = spyOn(serviceStub, 'getMetricsList').and.returnValue(of(mockBussinessGlossary));

        component.startUpdateMetricsList();
        component.getMetricsList();
        expect(serviceSpy).toHaveBeenCalled();
        expect(getSpy).toHaveBeenCalled();
    });

    it('should have a getMetricsList function', () => {
        const serviceStub: BusinessGlossaryService = TestBed.inject(BusinessGlossaryService);
        const serviceSpy = spyOn(serviceStub, 'getMetricsList').and.returnValue(of(mockBussinessGlossary));

        component.getMetricsList();
        expect(serviceSpy).toHaveBeenCalled();
    });

    it('should have a updateMetricsListFavorite function', () => {
        const itemMock = true;
        const idMock = 1;
        const serviceStub: BusinessGlossaryService = TestBed.inject(BusinessGlossaryService);
        const serviceSpy = spyOn(serviceStub, 'updateDashboardsListFavorite').and.returnValue(
            of(mockBussinessGlossary),
        );

        component.updateMetricsListFavorite(itemMock, idMock);
        expect(serviceSpy).toHaveBeenCalled();
    });

    it('should call update from breadcrumbsService when run updateBreadcrumbs function', () => {
        const updateSpy = spyOn(breadcrumbsService, 'update');
        component.updateBreadcrumbs();
        expect(updateSpy).toHaveBeenCalledTimes(1);
    });

    it('should have metricsList$ observable', () => {
        const glossaryQuery = TestBed.inject(BusinessGlossaryQuery);
        expect(component.metricsList$).toEqual(glossaryQuery.metricsList$);
    });

    it('should have titleMetricsList$ observable', () => {
        const glossaryQuery = TestBed.inject(BusinessGlossaryQuery);
        expect(component.titleMetricsList$).toEqual(glossaryQuery.titleMetricsList$);
    });

    it('should have isLoadingMetrics$ observable', () => {
        const glossaryQuery = TestBed.inject(BusinessGlossaryQuery);
        expect(component.isLoadingMetrics$).toEqual(glossaryQuery.isLoadingDisplay$);
    });

    it('should have display if have metricsList$ value', () => {
        const list = fixture.debugElement.queryAll(By.css('.c-metrics-list__list'));
        expect(list.length).toEqual(mockBussinessGlossaryDetail.length);
        expect(list).not.toBeNull();
    });

    it('should display loading (if it is provided)', () => {
        component.isLoadingMetrics$ = of(true);
        fixture.detectChanges();

        const display = fixture.debugElement.query(By.css('.c-metrics-list__loading'));
        expect(display).not.toBeNull();
    });

    it('should not display loading (if it is not provided)', () => {
        component.isLoadingMetrics$ = of(false);
        fixture.detectChanges();

        const display = fixture.debugElement.query(By.css('.c-metrics-list__loading'));
        expect(display).toBeNull();
    });
});
