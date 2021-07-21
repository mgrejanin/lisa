import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardsListComponent } from './dashboards-list.component';

// modules
import { GlossaryDashboardsModule } from '../business-glossary-dashboards.module';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { SharedModule, BreadcrumbService, BreadcrumbsServiceMock } from '@picpay/picpedia/shared';
import { BadgeCertificationModule } from '../../../components/badge-certification/badge-certification.module';
import { RouterTestingModule } from '@angular/router/testing';

import { of } from 'rxjs';

// ng-mocks
import { MockModule } from 'ng-mocks';
import { BusinessGlossaryService } from '../../../data-access/business-glossary/business-glossary.service';
import { BusinessGlossaryServiceMock } from '../../../data-access/business-glossary/mocks/business-glossary.service.mock';
import { BusinessGlossaryQuery } from '../../../data-access/business-glossary/business-glossary.query';
import { mockBussinessGlossary } from '../../../data-access/business-glossary/mocks/business-glossary.mock';

describe('DashboardsListComponent', () => {
    let component: DashboardsListComponent;
    let fixture: ComponentFixture<DashboardsListComponent>;

    let breadcrumbsService: BreadcrumbService;
    let businessGlossaryQuery: BusinessGlossaryQuery;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                DesignSystemAngularModule,
                RouterTestingModule.withRoutes([]),
                MockModule(GlossaryDashboardsModule),
                MockModule(BadgeCertificationModule),
                MockModule(SharedModule),
            ],
            declarations: [DashboardsListComponent],
            providers: [
                { provide: BusinessGlossaryService, useClass: BusinessGlossaryServiceMock },
                { provide: BreadcrumbService, useClass: BreadcrumbsServiceMock },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        breadcrumbsService = TestBed.inject(BreadcrumbService);
        businessGlossaryQuery = TestBed.inject(BusinessGlossaryQuery);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a getDashboardsList function on init', () => {
        const initSpy = spyOn(component, 'getDashboardsList');
        component.ngOnInit();
        expect(initSpy).toHaveBeenCalled();
    });

    it('should have a startUpdateDashboardsList function on init', () => {
        const initSpy = spyOn(component, 'startUpdateDashboardsList');
        component.ngOnInit();
        expect(initSpy).toHaveBeenCalled();
    });

    it('should have a updateBreadcrumbs function', () => {
        expect(component.updateBreadcrumbs).toBeTruthy();
    });

    it('should have a startUpdateDashboardsList function', () => {
        const serviceStub: BusinessGlossaryService = TestBed.inject(BusinessGlossaryService);
        const serviceSpy = spyOn(serviceStub.onDashboardsList, 'subscribe').and.returnValue(
            of(mockBussinessGlossary),
        );
        const getSpy = spyOn(serviceStub, 'getDashboardsList').and.returnValue(of(mockBussinessGlossary));

        component.startUpdateDashboardsList();
        component.getDashboardsList();
        expect(serviceSpy).toHaveBeenCalled();
        expect(getSpy).toHaveBeenCalled();
    });

    it('should have a getDashboardsList function', () => {
        const serviceStub: BusinessGlossaryService = TestBed.inject(BusinessGlossaryService);
        const serviceSpy = spyOn(serviceStub, 'getDashboardsList').and.returnValue(of(mockBussinessGlossary));

        component.getDashboardsList();
        expect(serviceSpy).toHaveBeenCalled();
    });

    it('should have a updateDashboardsListFavorite function', () => {
        const itemMock = true;
        const idMock = 1;
        const serviceStub: BusinessGlossaryService = TestBed.inject(BusinessGlossaryService);
        const serviceSpy = spyOn(serviceStub, 'updateDashboardsListFavorite').and.returnValue(
            of(mockBussinessGlossary),
        );

        component.updateDashboardsListFavorite(itemMock, idMock);
        expect(serviceSpy).toHaveBeenCalled();
    });

    it('should call update from breadcrumbsService when run updateBreadcrumbs function', () => {
        const updateSpy = spyOn(breadcrumbsService, 'update');
        component.updateBreadcrumbs();
        expect(updateSpy).toHaveBeenCalledTimes(1);
    });

    it('should have dashboardsList$ observable', () => {
        expect(component.dashboardsList$).toEqual(businessGlossaryQuery.dashboardsList$);
    });

    it('should have titleDashboardsList$ observable', () => {
        expect(component.titleDashboardsList$).toEqual(businessGlossaryQuery.titleDashboardsList$);
    });

    it('should have isLoadingDashboards$ observable', () => {
        expect(component.isLoadingDashboards$).toEqual(businessGlossaryQuery.isLoadingDisplay$);
    });
});
