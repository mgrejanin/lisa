import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { EventTracking } from '@picpay/event-tracking';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

import { HeaderComponent } from './header.component';
import { LogoComponent } from '../logo/logo.component';
import { UiComponentsModule } from '@picpay/ui/components';
import { PicpayKeycloakConfig, PicpayKeycloakModule } from '@picpay/keycloak';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

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
            declarations: [HeaderComponent, LogoComponent],
            imports: [
                RouterTestingModule.withRoutes([]),
                PicpayKeycloakModule.forRoot(keycloakConfig),
                DesignSystemAngularModule,
                UiComponentsModule,
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
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have call eventTracking function', () => {
        const evtTracking = spyOn(EventTracking, 'track');
        const btn_name = 'HEADER';
        const ctx = 'B2P';
        const page_name = '';
        component.eventTracking(btn_name, ctx);

        expect(evtTracking).toHaveBeenCalledWith('Button Clicked', {
            button_name: `BOTAO_${btn_name}_${ctx}`,
            page_name: `STUDIO_PICPAY${page_name}`,
            context: ctx,
        });
    });
});
