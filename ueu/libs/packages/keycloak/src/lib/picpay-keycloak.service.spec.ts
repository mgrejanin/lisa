import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { KeycloakService } from 'keycloak-angular';
import { PicpayKeycloakCallback, PicpayKeycloakCallbackService } from './picpay-keycloak.config';
import { keycloakConfigMock, keycloakConfigWithCallbackMock } from './mocks/picpay-keycloak.config.mock';
import { PicpayKeycloakModule } from './picpay-keycloak.module';
import { PicpayKeycloakService } from './picpay-keycloak.service';
import { of } from 'rxjs';
import { KeycloakServiceMock, getTokenResponse, initParams } from './mocks/keycloak.service.mock';
import { userProfileMock } from './mocks/keycloak.service.mock';

class KeycloakCallback implements PicpayKeycloakCallback {
    callback() {
        return of();
    }
}

describe('PicayKeycloakService without callback', () => {
    let service: PicpayKeycloakService;
    let router: Router;
    let keycloak: KeycloakService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, PicpayKeycloakModule.forRoot(keycloakConfigMock)],
            providers: [
                PicpayKeycloakService,
                { provide: KeycloakService, useValue: new KeycloakServiceMock(true, []) },
            ],
        });

        service = TestBed.inject(PicpayKeycloakService);
        keycloak = TestBed.inject(KeycloakService);
        router = TestBed.inject(Router);
    });

    it('should be created', () => {
        expect(service).toBeDefined();
    });

    it('initKeycloak function: should initialize keycloak', () => {
        const keycloakInitSpy = spyOn(keycloak, 'init').and.returnValue(of(null));
        const routeSpy = spyOn(router, 'initialNavigation');

        service.initKeycloak();

        expect(keycloakInitSpy).toHaveBeenCalledWith(initParams);
        expect(routeSpy).toHaveBeenCalled();
    });

    it('should have a getUserRoles function', () => {
        const userRoles = service.getUserRoles();
        expect(userRoles).toBeInstanceOf(Array);
    });

    it('should have a loadUserProfile function', async () => {
        const spy = spyOn(keycloak, 'loadUserProfile').and.callThrough();

        let profile: Keycloak.KeycloakProfile;

        service.loadUserProfile().subscribe((userProfile: Keycloak.KeycloakProfile) => (profile = userProfile));

        expect(spy).toHaveBeenCalled();
        expect(profile).toMatchObject({} as Keycloak.KeycloakProfile);
    });

    it('should have a getToken function', () => {
        const spy = jest.spyOn(keycloak, 'getToken');

        let token: string;

        service.getToken().subscribe((keycloakToken: string) => {
            token = keycloakToken;
            expect(spy).toHaveBeenCalled();
            expect(token).toBe(getTokenResponse);
        });
    });

    it('should have a logout function', () => {
        const spy = spyOn(keycloak, 'logout');

        service.logout();

        expect(spy).toHaveBeenCalled();
    });

    it('should have a isLoggedIn function', () => {
        const spy = spyOn(keycloak, 'isLoggedIn').and.callThrough();

        service.isLoggedIn().subscribe(() => {
            expect(spy).toHaveBeenCalled();
        });
    });

    it('should have a getUserProfile function', () => {
        const spy = spyOn(keycloak, 'getKeycloakInstance').and.callThrough();

        const userProfile = service.getUserProfile();

        expect(spy).toHaveBeenCalled();
        expect(userProfile).toBe(userProfileMock);
    });
});

describe('PicayKeycloakService with callback', () => {
    let service: PicpayKeycloakService;
    let router: Router;
    let keycloak: KeycloakService;
    let keycloakCallback: PicpayKeycloakCallback;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, PicpayKeycloakModule.forRoot(keycloakConfigWithCallbackMock)],
            providers: [
                PicpayKeycloakService,
                KeycloakService,
                { provide: PicpayKeycloakCallbackService, useClass: KeycloakCallback },
            ],
        });

        service = TestBed.inject(PicpayKeycloakService);
        keycloak = TestBed.inject(KeycloakService);
        router = TestBed.inject(Router);
        keycloakCallback = TestBed.inject(PicpayKeycloakCallbackService);
    });

    it('initKeycloak function: should initialize keycloak', () => {
        const keycloakInitSpy = spyOn(keycloak, 'init').and.returnValue(of(true));
        const routeSpy = spyOn(router, 'initialNavigation');
        const callbackSpy = spyOn(keycloakCallback, 'callback').and.returnValue(of(null));

        service.initKeycloak();

        expect(keycloakInitSpy).toHaveBeenCalledWith(initParams);
        expect(callbackSpy).toHaveBeenCalled();
        expect(routeSpy).toHaveBeenCalled();
    });
});
