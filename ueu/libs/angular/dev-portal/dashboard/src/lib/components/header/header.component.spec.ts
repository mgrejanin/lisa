import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { PicpayKeycloakConfig, PicpayKeycloakModule } from '@picpay/keycloak';
import { UiComponentsModule } from '@picpay/ui/components';

import { DashboardHeaderComponent } from './header.component';

describe('DashboardHeaderComponent', () => {
    let component: DashboardHeaderComponent;
    let fixture: ComponentFixture<DashboardHeaderComponent>;

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
            declarations: [DashboardHeaderComponent],
            imports: [
                RouterTestingModule,
                DesignSystemAngularModule,
                UiComponentsModule,
                PicpayKeycloakModule.forRoot(keycloakConfig),
            ],
            providers: [
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
        fixture = TestBed.createComponent(DashboardHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
