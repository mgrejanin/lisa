// ng-mocks
import { MockModule, MockedComponent } from 'ng-mocks';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
// modules
import { GlossaryDashboardsModule } from '../../pages/business-glossary-dashboards/business-glossary-dashboards.module';
import { BreadcrumbService, BreadcrumbsServiceMock, SharedModule } from '@picpay/picpedia/shared';

import { CardsModule } from '../../components/cards/cards.module';
import { BusinessGlossaryQuery } from '../../data-access/business-glossary/business-glossary.query';
import { BusinessGlossaryQueryMock } from '../../data-access/business-glossary/mocks/business-glossary.query.mock';
import { BusinessGlossaryService } from '../../data-access/business-glossary/business-glossary.service';
import { BusinessGlossaryServiceMock } from '../../data-access/business-glossary/mocks/business-glossary.service.mock';
import { mockBussinessGlossary } from '../../data-access/business-glossary/mocks/business-glossary.mock';
import { GlossaryMetricsComponent } from './business-glossary-metrics.component';
import { CardsComponent } from '../../components/cards/cards.component';

describe('GlossaryMetricsComponent', () => {
    let component: GlossaryMetricsComponent;
    let fixture: ComponentFixture<GlossaryMetricsComponent>;

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
            declarations: [GlossaryMetricsComponent],
            providers: [
                { provide: BusinessGlossaryService, useClass: BusinessGlossaryServiceMock },
                { provide: BreadcrumbService, useClass: BreadcrumbsServiceMock },
                { provide: BusinessGlossaryQuery, useClass: BusinessGlossaryQueryMock },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GlossaryMetricsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        breadcrumbsService = TestBed.inject(BreadcrumbService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a getMetricsCards function', () => {
        const serviceStub: BusinessGlossaryService = TestBed.inject(BusinessGlossaryService);
        const serviceSpy = spyOn(serviceStub, 'getMetricsCards').and.returnValue(of(BusinessGlossaryServiceMock));

        component.getMetricsCards();
        expect(serviceSpy).toHaveBeenCalled();
    });

    it('should have a iconMetrics function', () => {
        expect(component.iconMetrics).toBeTruthy();
    });

    it('should have a titleMetrics function', () => {
        expect(component.titleMetrics).toBeTruthy();
    });

    it('should have a updateBreadcrumbs function', () => {
        expect(component.updateBreadcrumbs).toBeTruthy();
    });

    it('should have metrics$ observable', () => {
        const glossaryQuery = TestBed.inject(BusinessGlossaryQuery);
        expect(component.metrics$).toEqual(glossaryQuery.metrics$);
    });

    it('should have isLoadingMetrics$ observable', () => {
        const glossaryQuery = TestBed.inject(BusinessGlossaryQuery);
        expect(component.isLoadingMetrics$).toEqual(glossaryQuery.isLoadingDisplay$);
    });

    it('should call update from breadcrumbsService when run updateBreadcrumbs function', () => {
        const updateSpy = spyOn(breadcrumbsService, 'update');
        component.updateBreadcrumbs();
        expect(updateSpy).toHaveBeenCalledTimes(1);
    });

    it('should have display if have metrics$ value', () => {
        const cards = fixture.debugElement.queryAll(By.css('.c-glossary-metrics__cards'));
        expect(cards.length).toEqual(mockBussinessGlossary.length);
        expect(cards).not.toBeNull();
    });

    it('should bind conditions to picpedia-cards component', () => {
        const cards = fixture.debugElement.queryAll(By.css('.c-glossary-metrics__cards-item'));
        expect(cards.length).toEqual(mockBussinessGlossary.length);

        const cardsElement1 = cards[0].componentInstance as MockedComponent<CardsComponent>;
        expect(cardsElement1.title).toEqual(mockBussinessGlossary[0].data_domain);
    });

    it('should display loading (if it is provided)', () => {
        component.isLoadingMetrics$ = of(true);
        fixture.detectChanges();

        const display = fixture.debugElement.query(By.css('.c-glossary-metrics__loading'));
        expect(display).not.toBeNull();
    });

    it('should not display loading (if it is not provided)', () => {
        component.isLoadingMetrics$ = of(false);
        fixture.detectChanges();

        const display = fixture.debugElement.query(By.css('.c-glossary-metrics__loading'));
        expect(display).toBeNull();
    });
});
