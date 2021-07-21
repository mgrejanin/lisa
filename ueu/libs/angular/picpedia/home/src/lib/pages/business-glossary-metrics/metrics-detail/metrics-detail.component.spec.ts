import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { MetricsDetailComponent } from './metrics-detail.component';

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

import { MetricsDetailService } from '../../../data-access/business-glossary/metrics-detail/metrics-detail.service';
import { MetricsDetailServiceMock } from '../../../data-access/business-glossary/mocks/metrics-detail.service.mock';
import { MetricsDetailQuery } from '../../../data-access/business-glossary/metrics-detail/metrics-detail.query';
import { MetricsDetailQueryMock } from '../../../data-access/business-glossary/mocks/metrics-detail.query.mock';

describe('MetricsDetailComponent', () => {
    let component: MetricsDetailComponent;
    let fixture: ComponentFixture<MetricsDetailComponent>;

    let breadcrumbsService: BreadcrumbService;
    let metricsDetailQuery: MetricsDetailQuery;

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
            declarations: [MetricsDetailComponent],
            providers: [
                { provide: MetricsDetailService, useClass: MetricsDetailServiceMock },
                { provide: BreadcrumbService, useClass: BreadcrumbsServiceMock },
                { provide: MetricsDetailQuery, useClass: MetricsDetailQueryMock },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MetricsDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        breadcrumbsService = TestBed.inject(BreadcrumbService);
        metricsDetailQuery = TestBed.inject(MetricsDetailQuery);
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

    it('should have isLoadingMetrics$ observable', () => {
        expect(component.isLoadingMetrics$).toEqual(metricsDetailQuery.isLoadingDisplay$);
    });

    it('should have titleMetricsDetail$ observable', () => {
        expect(component.titleMetricsDetail$).toEqual(metricsDetailQuery.titleMetricsDetail$);
    });

    it('should have descriptionMetricsDetail$ observable', () => {
        expect(component.descriptionMetricsDetail$).toEqual(metricsDetailQuery.descriptionMetricsDetail$);
    });

    it('should have ruleMetricsDetail$ observable', () => {
        expect(component.ruleMetricsDetail$).toEqual(metricsDetailQuery.ruleMetricsDetail$);
    });

    it('should have tagsMetricsDetail$ observable', () => {
        expect(component.tagsMetricsDetail$).toEqual(metricsDetailQuery.tagsMetricsDetail$);
    });

    it('should have stewardMetricsDetail$ observable', () => {
        expect(component.stewardMetricsDetail$).toEqual(metricsDetailQuery.stewardMetricsDetail$);
    });

    it('should have ownerMetricsDetail$ observable', () => {
        expect(component.ownerMetricsDetail$).toEqual(metricsDetailQuery.ownerMetricsDetail$);
    });

    it('should have usersMetricsDetail$ observable', () => {
        expect(component.usersMetricsDetail$).toEqual(metricsDetailQuery.usersMetricsDetail$);
    });

    it('should have badgeMetricsDetail$ observable', () => {
        expect(component.badgeMetricsDetail$).toEqual(metricsDetailQuery.badgeMetricsDetail$);
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
        component.isLoadingMetrics$ = of(true);
        fixture.detectChanges();

        const display = fixture.debugElement.query(By.css('.c-metrics-detail__loading'));
        expect(display).not.toBeNull();
    });

    it('should not display loading (if it is not provided)', () => {
        component.isLoadingMetrics$ = of(false);
        fixture.detectChanges();

        const display = fixture.debugElement.query(By.css('.c-metrics-detail__loading'));
        expect(display).toBeNull();
    });

    it('should have display if have tagsMetricsDetail$ value', () => {
        const item = fixture.debugElement.queryAll(By.css('.c-metrics-detail__tag'));
        const labelMock = [{ label: 'mockLabel' }];

        expect(item.length).toEqual(labelMock.length);
        expect(item).not.toBeNull();
    });

    it('should have display if have stewardMetricsDetail$ value', () => {
        const item = fixture.debugElement.queryAll(By.css('.c-metrics-detail__text-users'));
        expect(item.length).toEqual(
            [
                { name: 'mockName1', email: 'mockEmail1', figure: 'mockFigure1' },
                { name: 'mockName2', email: 'mockEmail2', figure: 'mockFigure2' },
            ].length,
        );
        expect(item).not.toBeNull();
    });

    it('should have display if have ownerMetricsDetail$ value', () => {
        const item = fixture.debugElement.queryAll(By.css('.c-metrics-detail__text-users'));
        expect(item.length).toEqual(
            [
                { name: 'mockName1', email: 'mockEmail1', figure: 'mockFigure1' },
                { name: 'mockName2', email: 'mockEmail2', figure: 'mockFigure2' },
            ].length,
        );
        expect(item).not.toBeNull();
    });

    it('should have display if have usersMetricsDetail$ value', () => {
        const item = fixture.debugElement.queryAll(By.css('.c-metrics-detail__figure-users'));
        expect(item.length).toEqual(
            [{ figure: 'mockFigure1' }, { figure: 'mockFigure2' }, { figure: 'mockFigure3' }].length,
        );
        expect(item).not.toBeNull();
    });
});
