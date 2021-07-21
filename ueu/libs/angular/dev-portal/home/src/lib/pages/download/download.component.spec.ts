import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DevPortalSharedModule, ProjectServiceMock, ProjectsService } from '@picpay/dev-portal/shared';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

import { DownloadComponent } from './download.component';
import { PicpayKeycloakConfig, PicpayKeycloakModule } from '@picpay/keycloak';

describe('DownloadComponent', () => {
    let component: DownloadComponent;
    let fixture: ComponentFixture<DownloadComponent>;

    const keycloakConfig: PicpayKeycloakConfig = {
        clientId: 'test_dev-portal',
        realm: 'dev-portal',
        url: 'http://test.com/auth/',
        onLoad: 'check-sso',
        withCallback: true,
        notAllowedRouteRedirectTo: '/',
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DownloadComponent],
            imports: [
                DevPortalSharedModule,
                RouterTestingModule.withRoutes([]),
                PicpayKeycloakModule.forRoot(keycloakConfig),
            ],
            providers: [
                { provide: ProjectsService, useClass: ProjectServiceMock },
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com' }),
                    },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DownloadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
