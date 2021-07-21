import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { DevPortalSharedModule, ProjectServiceMock, ProjectsService, ProjectsStore } from '@picpay/dev-portal/shared';
import { PicpayKeycloakConfig, PicpayKeycloakModule, PicpayKeycloakService } from '@picpay/keycloak';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

import { ProjectDetailsComponent } from './project-details.component';

import { AvatarComponent } from '../../components/avatar/avatar.component';
import { UiComponentsModule } from '@picpay/ui/components';
import { MockNotificationsService, NotificationsService } from '@picpay/angular/shared/core/notifications';

describe('ProjectDetailsComponent', () => {
    let component: ProjectDetailsComponent;
    let fixture: ComponentFixture<ProjectDetailsComponent>;

    const product = {
        id: 1,
        category: 'category-1',
        name: 'Product 1',
        description: 'Product Test',
        slug: 'product-1',
    };

    const keycloakConfig: PicpayKeycloakConfig = {
        clientId: 'test_dev-portal',
        realm: 'dev-portal',
        url: 'http://test.com/auth/',
        onLoad: 'check-sso',
        withCallback: true,
        notAllowedRouteRedirectTo: '/',
    };

    const mockDialog = {
        open: jasmine.createSpy('open'),
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProjectDetailsComponent, AvatarComponent],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule.withRoutes([]),
                MatDialogModule,
                DevPortalSharedModule,
                DesignSystemAngularModule,
                UiComponentsModule,
                PicpayKeycloakModule.forRoot(keycloakConfig),
            ],
            providers: [
                ProjectsStore,
                PicpayKeycloakService,
                { provide: NotificationsService, useValue: new MockNotificationsService({}) },
                { provide: MatDialog, useValue: mockDialog },
                { provide: ProjectsService, useClass: ProjectServiceMock },
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
        fixture = TestBed.createComponent(ProjectDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have an openDialog function', () => {
        fixture.detectChanges();
        component.openDialog(product);
        expect(mockDialog.open).toHaveBeenCalled();
    });

    it('should have getInitials function', () => {
        const initials = component.getInitials('Studio PicPay');
        expect(initials).toBe('SP');
    });
});
