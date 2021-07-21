import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSelectModule } from '@angular/material/select';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { DevPortalSharedModule, projectMock, ProjectsService } from '@picpay/dev-portal/shared';
import { PicpayKeycloakConfig, PicpayKeycloakModule, PicpayKeycloakService } from '@picpay/keycloak';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { DashboardLogoOptions, UiComponentsModule } from '@picpay/ui/components';

import { DashboardComponent } from './dashboard.component';
import { CommonLayoutsConfig, CommonLayoutsModule, LayoutsModule } from '@picpay/ui/layouts';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CoreNotificationsModule } from '@picpay/angular/shared/core/notifications';

import { MockedComponentFixture, MockProvider, MockRender } from 'ng-mocks';
import { DashboardHeaderComponent } from '../header/header.component';

describe('DashboardComponent', () => {
    let fixture: MockedComponentFixture<DashboardComponent>;
    let service: ProjectsService;

    const keycloakConfig: PicpayKeycloakConfig = {
        clientId: 'test_dev-portal',
        realm: 'dev-portal',
        url: 'http://test.com/auth/',
        onLoad: 'check-sso',
        withCallback: true,
        notAllowedRouteRedirectTo: '/',
    };

    const layoutConfig: CommonLayoutsConfig = {
        menuItems: [],
        mobileMenuItems: [],
        dashboardLogo: DashboardLogoOptions.SELLER_PANEL,
        dashboardTitle: 'STUDIO',
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DashboardComponent, DashboardHeaderComponent],
            imports: [
                UiComponentsModule,
                ReactiveFormsModule,
                DevPortalSharedModule,
                RouterModule,
                LayoutsModule,
                DesignSystemAngularModule,
                MatSelectModule,
                RouterTestingModule.withRoutes([]),
                PicpayKeycloakModule.forRoot(keycloakConfig),
                CommonLayoutsModule.forRoot(layoutConfig),
                HttpClientTestingModule,
                CoreNotificationsModule,
                BrowserAnimationsModule,
            ],
            providers: [
                PicpayKeycloakService,
                MockProvider(ProjectsService),
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com', release: 'qa', apiKey: '123' }),
                    },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = MockRender(DashboardComponent);
        service = TestBed.inject(ProjectsService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(fixture.componentInstance).toBeTruthy();
    });

    it('should call setSelectedProject function', () => {
        const serviceSpy = spyOn(service, 'updateCurrentProject');
        expect(fixture.componentInstance.activatedProject).toBeNull();
        fixture.componentInstance.setSelectedProject(projectMock);
        expect(serviceSpy).toHaveBeenCalled();
        fixture.detectChanges();
        fixture.componentInstance.activatedProject$.subscribe(actived => {
            expect(actived).toEqual(projectMock);
        });
    });
});
