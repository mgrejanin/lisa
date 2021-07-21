import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import {
    keycloakConfigMock,
    KeycloakServiceMock,
    PicpayKeycloakConfigService,
    PicpayKeycloakModule,
    PicpayKeycloakService,
} from '@picpay/keycloak';
import { UiComponentsModule } from '@picpay/ui/components';
import { HeaderComponent } from './header.component';
import { KeycloakService } from 'keycloak-angular';
import { MockModule } from 'ng-mocks';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let keycloakService: KeycloakService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HeaderComponent],
            imports: [
                MockModule(MatButtonModule),
                MockModule(MatIconModule),
                MockModule(UiComponentsModule),
                DesignSystemAngularModule,
                PicpayKeycloakModule.forRoot(keycloakConfigMock),
            ],
            providers: [
                PicpayKeycloakService,
                { provide: KeycloakService, useValue: new KeycloakServiceMock(true, []) },
                { provide: PicpayKeycloakConfigService, useValue: keycloakConfigMock },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        keycloakService = TestBed.inject(KeycloakService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a doLogout function', async () => {
        const logoutSpy = spyOn(keycloakService, 'logout');

        await component.doLogout();

        expect(logoutSpy).toHaveBeenCalled();
    });
});
