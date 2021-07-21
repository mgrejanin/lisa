import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

// modules
import { SharedModule } from '@picpay/feature-flag/shared';

// material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';

// components
import { FeatureDetailsComponent } from '../../components/feature-details/feature-details.component';
import { FeaturesListComponent } from './features-list.component';

// modules
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

// mocks
import { FeaturesQuery } from '../../data-access/features/features.query';
import { FeaturesQueryMock } from '../../data-access/features/mocks/features.query.mock';
import { FeaturesService } from '../../data-access/features/features.service';
import { FeaturesServiceMock } from '../../data-access/features/mocks/features.service.mock';

// services
import { MockNotificationsService, NotificationsService } from '@picpay/angular/shared/core/notifications';

// ng-mocks
import { MockComponents, MockedComponent, MockModule, MockPipe } from 'ng-mocks';

// rxjs
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { debounceTime, map, pluck } from 'rxjs/operators';

// interfaces
import { FeatureType } from '../../models';
import { Feature } from '../../features';

// pipes
import { TruncatePipe } from '@picpay/angular/shared/pipes';
import {
    AuthQuery,
    AuthQueryMock,
    AuthService,
    AuthServiceMock,
    FeatureFlagAuthDirectivesModule,
} from '@picpay/feature-flag/auth';

describe('FeaturesListComponent', () => {
    let component: FeaturesListComponent;
    let fixture: ComponentFixture<FeaturesListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                FeaturesListComponent,
                MockComponents(FeatureDetailsComponent, MatInput),
                MockPipe(TruncatePipe),
            ],
            providers: [
                { provide: ActivatedRoute, useValue: { parent: {} } },
                { provide: FeaturesQuery, useClass: FeaturesQueryMock },
                { provide: FeaturesService, useClass: FeaturesServiceMock },
                { provide: AuthQuery, useValue: new AuthQueryMock(true) },
                { provide: AuthService, useValue: new AuthServiceMock(false) },
                { provide: NotificationsService, useValue: new MockNotificationsService({ confimed: true }) },
            ],
            imports: [
                MockModule(MatIconModule),
                MockModule(MatFormFieldModule),
                MockModule(MatMenuModule),
                MockModule(MatSidenavModule),
                MockModule(MatTableModule),
                MockModule(SharedModule),
                RouterTestingModule,
                FeatureFlagAuthDirectivesModule,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FeaturesListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // controller

    it('should have displayColumns variable', () => {
        expect(component.displayedColumns).toEqual(['name', 'description', 'type']);
    });

    it('should have a dataSource$ observable', () => {
        const query = TestBed.inject(FeaturesQuery);

        const features$: Observable<Feature[]> = query.features$;
        const filter$: BehaviorSubject<string> = new BehaviorSubject('');

        const expectedQuery = combineLatest([features$, filter$]).pipe(
            debounceTime(250),
            map(([feats, filterValue]) => {
                const dataSource = new MatTableDataSource(feats);
                dataSource.filter = filterValue;
                return dataSource;
            }),
        );

        expect(component.dataSource$).toBeDefined();
        expect(component.dataSource$.toString()).toEqual(expectedQuery.toString());
    });

    it('should bind dataSource$ to the data table', async () => {
        // waits 300ms to check if the dataSource$
        // observable is bound to the table. This is
        // needed because we have a debounceTime operator
        // with 250ms delay.
        await new Promise(r => setTimeout(r, 300));
        fixture.detectChanges();

        const table = fixture.debugElement.query(By.css('.c-features-list__table'));
        expect(table.attributes['ng-reflect-data-source'].toString()).toBe(component.dataSource$.toString());
    });

    it('should call getFeatures and getApplications on init', () => {
        const spy = spyOn(component, 'getFeatures');

        component.ngOnInit();

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should have a getFeatures function', () => {
        const service = TestBed.inject(FeaturesService);
        const spy = spyOn(service, 'getFeatures');

        component.getFeatures();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should have onCreateFeature function', async () => {
        const router = TestBed.inject(Router);
        const activatedRoute = TestBed.inject(ActivatedRoute);

        const routerSpy = spyOn(router, 'navigate');

        await component.onCreateFeature();

        expect(routerSpy).toHaveBeenCalledWith(['criar'], { relativeTo: activatedRoute.parent });
    });

    it('should have onDeleteFeature function (user doesnt confirm the action)', async () => {
        const featureService = TestBed.inject(FeaturesService);
        const modalsService = TestBed.inject(NotificationsService);

        const confirmationSpy = spyOn(modalsService, 'openConfirmationModal').and.returnValue({
            afterClosed: () => of({ confirm: false }),
        });

        const deleteSpy = spyOn(featureService, 'deleteFeature');
        const closeSpy = spyOn(component, 'onClose');

        const mockId = 'mockId';

        component.onDeleteFeature(mockId);

        expect(confirmationSpy).toHaveBeenCalledWith(
            'Excluir funcionalidade',
            'Ao excluir essa funcionalidade, você não poderá mais visualizá-la. Deseja realmente excluir?',
        );
        expect(deleteSpy).not.toHaveBeenCalled();
        expect(closeSpy).not.toHaveBeenCalled();
    });

    it('should have onDeleteFeature function (user confirm the action)', async () => {
        const featureService = TestBed.inject(FeaturesService);
        const modalsService = TestBed.inject(NotificationsService);

        const confirmationSpy = spyOn(modalsService, 'openConfirmationModal').and.returnValue({
            afterClosed: () => of({ confirm: true }),
        });

        const deleteSpy = spyOn(featureService, 'deleteFeature');
        const closeSpy = spyOn(component, 'onClose');

        const mockId = 'mockId';

        component.onDeleteFeature(mockId);

        expect(confirmationSpy).toHaveBeenCalledWith(
            'Excluir funcionalidade',
            'Ao excluir essa funcionalidade, você não poderá mais visualizá-la. Deseja realmente excluir?',
        );
        expect(deleteSpy).toHaveBeenCalledWith(mockId);
        expect(closeSpy).toHaveBeenCalledTimes(1);
    });

    it('should have a onSeeDetails function', async () => {
        const featureMock = new Feature(
            'testName',
            'testDescription',
            FeatureType.BOOLEAN,
            'true',
            { name: 'mockAppName', id: 'mockAppId' },
            { name: 'mockSquadName', id: 'mockSquadId' },
            'mockId',
            [],
            [],
            'mockDate',
            'mockDate',
        );

        const service = TestBed.inject(FeaturesService);

        const spyService = spyOn(service, 'setActiveFeature');
        const drawerSpy = spyOn(component.drawer, 'open');

        await component.onSeeDetails(featureMock);

        expect(spyService).toHaveBeenCalledWith(featureMock);
        expect(drawerSpy).toHaveBeenCalledTimes(1);
    });

    it('should have a onEditFeature function', async () => {
        const router = TestBed.inject(Router);
        const activatedRoute = TestBed.inject(ActivatedRoute);

        const service = TestBed.inject(FeaturesService);

        const routerSpy = spyOn(router, 'navigate');
        const serviceSpy = spyOn(service, 'setActiveFeature');

        const mockFeature = new Feature(
            'mockName',
            'mockDescription',
            FeatureType.BOOLEAN,
            'false',
            { name: 'mockAppName', id: 'mockAppId' },
            { name: 'mockSquadName', id: 'mockSquadId' },
            'mockId',
            [],
            [],
            'mockDate',
            'mockDate',
        );

        await component.onEditFeature(mockFeature);

        expect(serviceSpy).toHaveBeenCalledWith(mockFeature);
        expect(routerSpy).toHaveBeenCalledWith([`editar/${mockFeature.id}`], { relativeTo: activatedRoute.parent });
    });

    it('should have a onClose function', async () => {
        const drawerSpy = spyOn(component.drawer, 'close');

        await component.onClose();

        expect(drawerSpy).toHaveBeenCalledTimes(1);
    });

    it('should have a getTypeName function', () => {
        const service = TestBed.inject(FeaturesService);

        const spy = spyOn(service, 'getTypeName');

        component.getTypeName(FeatureType.BOOLEAN);

        expect(spy).toHaveBeenCalledWith(FeatureType.BOOLEAN);
    });

    it('should have applyFilter function', (done: jest.DoneCallback) => {
        component.dataSource$.pipe(pluck('filter')).subscribe(filterValue => {
            expect(filterValue).toBe('mockFilter');
            done();
        });

        component.applyFilter('mockFilter');
    });

    // TEMPLATE
    it('should have filter input', () => {
        const filterComponent = fixture.debugElement.query(By.css('.c-features-list__filter'));

        expect(filterComponent).not.toBeNull();

        const input = filterComponent.query(By.css('input'));

        expect(input).not.toBeNull();

        const filterSpy = spyOn(component, 'applyFilter');

        input.triggerEventHandler('keyup', { target: { value: 'mockValue' } });

        expect(filterSpy).toHaveBeenCalledWith('mockValue');
    });

    it('should have create feature btn', () => {
        const btn = fixture.debugElement.query(By.css('.c-features-list__create-btn'));

        expect(btn).not.toBeNull();

        const spy = spyOn(component, 'onCreateFeature');

        btn.nativeElement.click();

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should bind activeFeature$ to feature-details component', (done: jest.DoneCallback) => {
        const detailsComponent = fixture.debugElement.query(By.css('.c-features-list__sidenav--details'))
            .componentInstance as MockedComponent<FeatureDetailsComponent>;

        component.activeFeature$.subscribe(feature => {
            expect(detailsComponent.feature).toBe(feature);

            done();
        });
    });

    it('should bind activeCommits$ to feature-details component', (done: jest.DoneCallback) => {
        const detailsComponent = fixture.debugElement.query(By.css('.c-features-list__sidenav--details'))
            .componentInstance as MockedComponent<FeatureDetailsComponent>;

        component.activeCommits$.subscribe(commits => {
            expect(detailsComponent.commits).toBe(commits);

            done();
        });
    });

    it('should bind onClose to close event of feature-details component', () => {
        const detailsComponent = fixture.debugElement.query(By.css('.c-features-list__sidenav--details'))
            .componentInstance as MockedComponent<FeatureDetailsComponent>;

        const spy = spyOn(component, 'onClose');

        detailsComponent.close.emit();

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should bind onDelete to delete event of feature-details component', () => {
        const detailsComponent = fixture.debugElement.query(By.css('.c-features-list__sidenav--details'))
            .componentInstance as MockedComponent<FeatureDetailsComponent>;

        const spy = spyOn(component, 'onDeleteFeature');

        detailsComponent.delete.emit('mockId');

        expect(spy).toHaveBeenCalledWith('mockId');
    });
});
