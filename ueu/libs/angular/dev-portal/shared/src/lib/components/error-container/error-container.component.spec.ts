import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { HeaderComponent } from '../header/header.component';
import { LogoComponent } from '../logo/logo.component';

import { ErrorContainerComponent } from './error-container.component';
import { UiComponentsModule } from '@picpay/ui/components';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { PicpayKeycloakConfig, PicpayKeycloakModule } from '@picpay/keycloak';

describe('ErrorContainerComponent', () => {
    let component: ErrorContainerComponent;
    let fixture: ComponentFixture<ErrorContainerComponent>;

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
            declarations: [ErrorContainerComponent, HeaderComponent, LogoComponent],
            imports: [
                RouterTestingModule,
                DesignSystemAngularModule,
                BrowserAnimationsModule,
                UiComponentsModule,
                PicpayKeycloakModule.forRoot(keycloakConfig),
            ],
            providers: [
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
        fixture = TestBed.createComponent(ErrorContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
