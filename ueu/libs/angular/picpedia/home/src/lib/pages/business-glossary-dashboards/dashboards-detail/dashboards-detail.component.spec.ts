import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { DashboardsDetailComponent } from './dashboards-detail.component';

// modules
import { GlossaryDashboardsModule } from '../business-glossary-dashboards.module';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { SharedModule, BreadcrumbService, BreadcrumbsServiceMock } from '@picpay/picpedia/shared';
import { BadgeCertificationModule } from '../../../components/badge-certification/badge-certification.module';
import { RouterTestingModule } from '@angular/router/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { getOriginalRoutePathUrlByReplacingParamValues } from '@picpay/picpedia/shared';

// ng-mocks
import { MockModule } from 'ng-mocks';
import { DashboardsDetailService } from '../../../data-access/business-glossary/dashboards-detail/dashboards-detail.service';
import { DashboardsDetailServiceMock } from '../../../data-access/business-glossary/mocks/dashboards-detail.service.mock';
import { DashboardsDetailQuery } from '../../../data-access/business-glossary/dashboards-detail/dashboards-detail.query';
import { DashboardsDetailQueryMock } from '../../../data-access/business-glossary/mocks/dashboards-detail.query.mock';

describe('DashboardsDetailComponent', () => {
    let component: DashboardsDetailComponent;
    let fixture: ComponentFixture<DashboardsDetailComponent>;

    let breadcrumbsService: BreadcrumbService;
    let dashboardsDetailQuery: DashboardsDetailQuery;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                DesignSystemAngularModule,
                RouterTestingModule.withRoutes([]),
                MockModule(GlossaryDashboardsModule),
                MockModule(BadgeCertificationModule),
                MockModule(SharedModule),
                MockModule(MatTabsModule),
                MockModule(MatMenuModule),
            ],
            declarations: [DashboardsDetailComponent],
            providers: [
                { provide: DashboardsDetailService, useClass: DashboardsDetailServiceMock },
                { provide: BreadcrumbService, useClass: BreadcrumbsServiceMock },
                { provide: DashboardsDetailQuery, useClass: DashboardsDetailQueryMock },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardsDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        breadcrumbsService = TestBed.inject(BreadcrumbService);
        dashboardsDetailQuery = TestBed.inject(DashboardsDetailQuery);
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

    it('should have isLoadingDashboards$ observable', () => {
        expect(component.isLoadingDashboards$).toEqual(dashboardsDetailQuery.isLoadingDisplay$);
    });

    it('should have titleDashboardsDetail$ observable', () => {
        expect(component.titleDashboardsDetail$).toEqual(dashboardsDetailQuery.titleDashboardsDetail$);
    });

    it('should have descriptionDashboardsDetail$ observable', () => {
        expect(component.descriptionDashboardsDetail$).toEqual(dashboardsDetailQuery.descriptionDashboardsDetail$);
    });

    it('should have dateDashboardsDetail$ observable', () => {
        expect(component.dateDashboardsDetail$).toEqual(dashboardsDetailQuery.dateDashboardsDetail$);
    });

    it('should have frequencyDashboardsDetail$ observable', () => {
        expect(component.frequencyDashboardsDetail$).toEqual(dashboardsDetailQuery.frequencyDashboardsDetail$);
    });

    it('should have scopeDashboardsDetail$ observable', () => {
        expect(component.scopeDashboardsDetail$).toEqual(dashboardsDetailQuery.scopeDashboardsDetail$);
    });

    it('should have tagsDashboardsDetail$ observable', () => {
        expect(component.tagsDashboardsDetail$).toEqual(dashboardsDetailQuery.tagsDashboardsDetail$);
    });

    it('should have originDashboardsDetail$ observable', () => {
        expect(component.originDashboardsDetail$).toEqual(dashboardsDetailQuery.originDashboardsDetail$);
    });

    it('should have stewardDashboardsDetail$ observable', () => {
        expect(component.stewardDashboardsDetail$).toEqual(dashboardsDetailQuery.stewardDashboardsDetail$);
    });

    it('should have ownerDashboardsDetail$ observable', () => {
        expect(component.ownerDashboardsDetail$).toEqual(dashboardsDetailQuery.ownerDashboardsDetail$);
    });

    it('should have usersDashboardsDetail$ observable', () => {
        expect(component.usersDashboardsDetail$).toEqual(dashboardsDetailQuery.usersDashboardsDetail$);
    });

    it('should have badgeDashboardsDetail$ observable', () => {
        expect(component.badgeDashboardsDetail$).toEqual(dashboardsDetailQuery.badgeDashboardsDetail$);
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
        component.isLoadingDashboards$ = of(true);
        fixture.detectChanges();

        const display = fixture.debugElement.query(By.css('.c-dashboards-detail__loading'));
        expect(display).not.toBeNull();
    });

    it('should not display loading (if it is not provided)', () => {
        component.isLoadingDashboards$ = of(false);
        fixture.detectChanges();

        const display = fixture.debugElement.query(By.css('.c-dashboards-detail__loading'));
        expect(display).toBeNull();
    });

    it('should have display if have tagsDashboardsDetail$ value', () => {
        const item = fixture.debugElement.queryAll(By.css('.c-dashboards-detail__tag'));
        expect(item.length).toEqual([{ label: 'mockLabel' }].length);
        expect(item).not.toBeNull();
    });

    it('should have display if have stewardDashboardsDetail$ value', () => {
        const item = fixture.debugElement.queryAll(By.css('.c-dashboards-detail__text-users'));
        expect(item.length).toEqual(
            [
                { name: 'mockName1', email: 'mockEmail1', figure: 'mockFigure1' },
                { name: 'mockName2', email: 'mockEmail2', figure: 'mockFigure2' },
            ].length,
        );
        expect(item).not.toBeNull();
    });

    it('should have display if have ownerDashboardsDetail$ value', () => {
        const item = fixture.debugElement.queryAll(By.css('.c-dashboards-detail__text-users'));
        expect(item.length).toEqual(
            [
                { name: 'mockName1', email: 'mockEmail1', figure: 'mockFigure1' },
                { name: 'mockName2', email: 'mockEmail2', figure: 'mockFigure2' },
            ].length,
        );
        expect(item).not.toBeNull();
    });

    it('should have display if have usersDashboardsDetail$ value', () => {
        const item = fixture.debugElement.queryAll(By.css('.c-dashboards-detail__figure-users'));
        expect(item.length).toEqual(
            [{ figure: 'mockFigure1' }, { figure: 'mockFigure2' }, { figure: 'mockFigure3' }].length,
        );
        expect(item).not.toBeNull();
    });

    it('should have an description row', () => {
        const label = 'mockDescription';
        component.descriptionDashboardsDetail$ = of(label);
        fixture.detectChanges();

        const descriptionRow = fixture.debugElement.query(By.css('.c-dashboards-detail__text'));
        expect(descriptionRow.nativeElement.textContent.trim()).toBe(label);
        expect(descriptionRow).toBeTruthy();
    });

    it('should display iframe on tabClick function', () => {
        component.tabClick(1);
        fixture.detectChanges();

        const display = fixture.debugElement.query(By.css('.c-dashboards-detail__iframe'));
        expect(display).not.toBeNull();
    });

    it('should not display iframe on tabClick function', () => {
        component.tabClick(2);
        fixture.detectChanges();

        const display = fixture.debugElement.query(By.css('.c-dashboards-detail__iframe'));
        expect(display).not.toBeNull();
    });
});
