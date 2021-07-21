// ng-mocks
import { MockModule } from 'ng-mocks';
import { of } from 'rxjs';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
// modules
import { GlossaryDashboardsModule } from '../business-glossary-dashboards/business-glossary-dashboards.module';
import { BreadcrumbService, BreadcrumbsServiceMock, SharedModule } from '@picpay/picpedia/shared';

import { CardsModule } from '../../components/cards/cards.module';
import { BusinessGlossaryQuery } from '../../data-access/business-glossary/business-glossary.query';
import { BusinessGlossaryService } from '../../data-access/business-glossary/business-glossary.service';
import { BusinessGlossaryServiceMock } from '../../data-access/business-glossary/mocks/business-glossary.service.mock';
import { GlossaryDashboardsComponent } from './business-glossary-dashboards.component';

describe('GlossaryDashboardsComponent', () => {
    let component: GlossaryDashboardsComponent;
    let fixture: ComponentFixture<GlossaryDashboardsComponent>;

    let breadcrumbsService: BreadcrumbService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                DesignSystemAngularModule,
                RouterTestingModule.withRoutes([]),
                MockModule(GlossaryDashboardsModule),
                MockModule(CardsModule),
                MockModule(SharedModule),
            ],
            declarations: [GlossaryDashboardsComponent],
            providers: [
                { provide: BusinessGlossaryService, useClass: BusinessGlossaryServiceMock },
                { provide: BreadcrumbService, useClass: BreadcrumbsServiceMock },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GlossaryDashboardsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        breadcrumbsService = TestBed.inject(BreadcrumbService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a getDashboardsCards function', () => {
        const serviceStub: BusinessGlossaryService = TestBed.inject(BusinessGlossaryService);
        const serviceSpy = spyOn(serviceStub, 'getDashboardsCards').and.returnValue(of(BusinessGlossaryServiceMock));

        component.getDashboardsCards();
        expect(serviceSpy).toHaveBeenCalled();
    });

    it('should have a iconDashboards function', () => {
        expect(component.iconDashboards).toBeTruthy();
    });

    it('should have a updateBreadcrumbs function', () => {
        expect(component.updateBreadcrumbs).toBeTruthy();
    });

    it('should have a titleDashboards on init', () => {
        expect(component.titleDashboards).toBeTruthy();
    });

    it('should have dashboards$ observable', () => {
        const glossaryQuery = TestBed.inject(BusinessGlossaryQuery);
        expect(component.dashboards$).toEqual(glossaryQuery.dashboards$);
    });

    it('should call update from breadcrumbsService when run updateBreadcrumbs function', () => {
        const updateSpy = spyOn(breadcrumbsService, 'update');
        component.updateBreadcrumbs();
        expect(updateSpy).toHaveBeenCalledTimes(1);
    });
});
