import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

// modules
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { UiComponentsModule } from '@picpay/ui/components';

// ng-mocks
import { MockModule } from 'ng-mocks';

import {
    keycloakConfigMock,
    KeycloakServiceMock,
    PicpayKeycloakConfigService,
    PicpayKeycloakService,
} from '@picpay/keycloak';
import { KeycloakService } from 'keycloak-angular';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let keycloakService: KeycloakService;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                DesignSystemAngularModule,
                RouterTestingModule.withRoutes([]),
                MockModule(MatIconModule),
                MockModule(MatButtonModule),
                MockModule(UiComponentsModule),
            ],
            declarations: [HeaderComponent],
            providers: [
                { provide: PicpayKeycloakConfigService, useValue: keycloakConfigMock },
                { provide: KeycloakService, useValue: new KeycloakServiceMock(true, []) },
                PicpayKeycloakService,
            ],
        }).compileComponents();

        keycloakService = TestBed.inject(KeycloakService);
        TestBed.inject(PicpayKeycloakService);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        router = TestBed.inject(Router);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a logout function', async () => {
        const spy = spyOn(keycloakService, 'logout');
        await component.logout();
        expect(spy).toHaveBeenCalled();
    });

    it('should have a downloadCertificate function', () => {
        const spy = spyOn(window, 'open');
        component.downloadCertificate();
        expect(spy).toHaveBeenCalled();
    });

    it('shound have locationHelpPage function', () => {
        const routerSpy = spyOn(router, 'navigateByUrl');
        component.locationHelpPage();

        expect(component.locationHelpPage).toBeTruthy();
        expect(routerSpy).toHaveBeenCalledWith('/help');
    });
});
