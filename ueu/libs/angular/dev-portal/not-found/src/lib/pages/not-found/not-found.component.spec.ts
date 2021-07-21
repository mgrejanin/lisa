import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';

import { NotFoundComponent } from './not-found.component';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

import { FooterComponent, HeaderComponent, LogoComponent } from '@picpay/dev-portal/shared';
import { UserDropdownComponent } from '@picpay/ui/components';
import { PicpayKeycloakConfig, PicpayKeycloakModule } from '@picpay/keycloak';

describe('NotFoundComponent', () => {
    let component: NotFoundComponent;
    let fixture: ComponentFixture<NotFoundComponent>;

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
            declarations: [
                NotFoundComponent,
                HeaderComponent,
                FooterComponent,
                LogoComponent,
                MockComponent(UserDropdownComponent),
            ],
            imports: [
                RouterTestingModule.withRoutes([]),
                DesignSystemAngularModule,
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
        fixture = TestBed.createComponent(NotFoundComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
