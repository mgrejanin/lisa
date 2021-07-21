import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { KeycloakService } from 'keycloak-angular';
import { PicpayKeycloakConfigService } from './picpay-keycloak.config';
import { keycloakConfigMock } from './mocks/picpay-keycloak.config.mock';
import { PicpayKeycloakGuard } from './picpay-keycloak.guard';
import { PicpayKeycloakService } from './picpay-keycloak.service';
import { KeycloakServiceMock } from './mocks/keycloak.service.mock';
import { from } from 'rxjs';
import { createMockActivatedRouteSnapshot, createMockRouteState, createMockUrlSegments } from './utils';

@Component({
    template: ` <div></div> `,
})
class DummyComponent {}

describe('PicpayKeycloakGuard (user is authenticated without roles)', () => {
    let guard: PicpayKeycloakGuard;
    let keycloakService: KeycloakService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DummyComponent],
            imports: [RouterTestingModule.withRoutes([{ path: 'test', component: DummyComponent }])],
            providers: [
                PicpayKeycloakService,
                { provide: KeycloakService, useValue: new KeycloakServiceMock(true, []) },
                { provide: PicpayKeycloakConfigService, useValue: keycloakConfigMock },
            ],
        });
        guard = TestBed.inject(PicpayKeycloakGuard);
        keycloakService = TestBed.inject(KeycloakService);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    it('should be able to activate route if the user is authenticated', async (done: jest.DoneCallback) => {
        const route = createMockActivatedRouteSnapshot([]);
        const state = createMockRouteState('mockRoute');
        const isLoggedInSpy = spyOn(keycloakService, 'isLoggedIn').and.callThrough();
        const loginSpy = spyOn(keycloakService, 'login').and.callThrough();

        const res$ = from(guard.canActivate(route, state));

        res$.subscribe(resp => {
            expect(resp).toEqual(true);
            expect(isLoggedInSpy).toHaveBeenCalled();
            expect(loginSpy).not.toHaveBeenCalled();
            done();
        });
    });

    it('should be able to activateChild route if the user is authenticated', async (done: jest.DoneCallback) => {
        const route = createMockActivatedRouteSnapshot([]);
        const state = createMockRouteState('mockRoute');
        const isLoggedInSpy = spyOn(keycloakService, 'isLoggedIn').and.callThrough();
        const loginSpy = spyOn(keycloakService, 'login').and.callThrough();

        const res$ = guard.canActivateChild(route, state);

        res$.subscribe(resp => {
            expect(resp).toEqual(true);
            expect(isLoggedInSpy).toHaveBeenCalled();
            expect(loginSpy).not.toHaveBeenCalled();
            done();
        });
    });

    it('should be able to load route if the user is authenticated', async (done: jest.DoneCallback) => {
        const route = createMockActivatedRouteSnapshot([]);
        const urlSegments = createMockUrlSegments('testPath');
        const isLoggedInSpy = spyOn(keycloakService, 'isLoggedIn').and.callThrough();
        const loginSpy = spyOn(keycloakService, 'login').and.callThrough();

        const res$ = guard.canLoad(route, urlSegments);

        res$.subscribe(resp => {
            expect(resp).toEqual(true);
            expect(isLoggedInSpy).toHaveBeenCalled();
            expect(loginSpy).not.toHaveBeenCalled();
            done();
        });
    });

    it('should not be able to activate if authenticated user does not have required roles', async (done: jest.DoneCallback) => {
        const route = createMockActivatedRouteSnapshot(['test']);
        const state = createMockRouteState('mockRoute');
        const isLoggedInSpy = spyOn(keycloakService, 'isLoggedIn').and.callThrough();
        const loginSpy = spyOn(keycloakService, 'login').and.callThrough();

        const res$ = from(guard.canActivate(route, state));

        res$.subscribe(resp => {
            expect(resp).toEqual(false);
            expect(isLoggedInSpy).toHaveBeenCalled();
            expect(loginSpy).not.toHaveBeenCalled();
            done();
        });
    });

    it('should not be able to activateChild if authenticated user does not have required roles', async (done: jest.DoneCallback) => {
        const route = createMockActivatedRouteSnapshot(['test']);
        const state = createMockRouteState('mockRoute');
        const isLoggedInSpy = spyOn(keycloakService, 'isLoggedIn').and.callThrough();
        const loginSpy = spyOn(keycloakService, 'login').and.callThrough();

        const res$ = guard.canActivateChild(route, state);

        res$.subscribe(resp => {
            expect(resp).toEqual(false);
            expect(isLoggedInSpy).toHaveBeenCalled();
            expect(loginSpy).not.toHaveBeenCalled();
            done();
        });
    });

    it('should not be able to load if authenticated user does not have required roles', async (done: jest.DoneCallback) => {
        const route = createMockActivatedRouteSnapshot(['test']);
        const urlSegments = createMockUrlSegments('testPath');
        const isLoggedInSpy = spyOn(keycloakService, 'isLoggedIn').and.callThrough();
        const loginSpy = spyOn(keycloakService, 'login').and.callThrough();

        const res$ = guard.canLoad(route, urlSegments);

        res$.subscribe(resp => {
            expect(resp).toEqual(false);
            expect(isLoggedInSpy).toHaveBeenCalled();
            expect(loginSpy).not.toHaveBeenCalled();
            done();
        });
    });
});

describe('PicpayKeycloakGuard (user is authenticated with roles)', () => {
    let guard: PicpayKeycloakGuard;
    let keycloakService: KeycloakService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DummyComponent],
            imports: [RouterTestingModule.withRoutes([{ path: 'test', component: DummyComponent }])],
            providers: [
                PicpayKeycloakService,
                { provide: KeycloakService, useValue: new KeycloakServiceMock(true, ['test']) },
                { provide: PicpayKeycloakConfigService, useValue: keycloakConfigMock },
            ],
        });
        guard = TestBed.inject(PicpayKeycloakGuard);
        keycloakService = TestBed.inject(KeycloakService);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    it('should be able to activate if authenticated user does have required roles', async (done: jest.DoneCallback) => {
        const route = createMockActivatedRouteSnapshot(['test']);
        const state = createMockRouteState('mockRoute');
        const isLoggedInSpy = spyOn(keycloakService, 'isLoggedIn').and.callThrough();
        const loginSpy = spyOn(keycloakService, 'login').and.callThrough();

        const res$ = from(guard.canActivate(route, state));

        res$.subscribe(resp => {
            expect(resp).toEqual(true);
            expect(isLoggedInSpy).toHaveBeenCalled();
            expect(loginSpy).not.toHaveBeenCalled();
            done();
        });
    });

    it('should be able to activateChild if authenticated user does have required roles', async (done: jest.DoneCallback) => {
        const route = createMockActivatedRouteSnapshot(['test']);
        const state = createMockRouteState('mockRoute');
        const isLoggedInSpy = spyOn(keycloakService, 'isLoggedIn').and.callThrough();
        const loginSpy = spyOn(keycloakService, 'login').and.callThrough();

        const res$ = guard.canActivateChild(route, state);

        res$.subscribe(resp => {
            expect(resp).toEqual(true);
            expect(isLoggedInSpy).toHaveBeenCalled();
            expect(loginSpy).not.toHaveBeenCalled();
            done();
        });
    });

    it('should be able to load if authenticated user does have required roles', async (done: jest.DoneCallback) => {
        const route = createMockActivatedRouteSnapshot(['test']);
        const urlSegments = createMockUrlSegments('testPath');
        const loginSpy = spyOn(keycloakService, 'login').and.callThrough();
        const isLoggedInSpy = spyOn(keycloakService, 'isLoggedIn').and.callThrough();

        const res$ = guard.canLoad(route, urlSegments);

        res$.subscribe(resp => {
            expect(resp).toEqual(true);
            expect(isLoggedInSpy).toHaveBeenCalled();
            expect(loginSpy).not.toHaveBeenCalled();
            done();
        });
    });
});

describe('PicpayKeycloakGuard (user is not authenticated)', () => {
    let guard: PicpayKeycloakGuard;
    let keycloakService: KeycloakService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DummyComponent],
            imports: [RouterTestingModule.withRoutes([{ path: 'test', component: DummyComponent }])],
            providers: [
                PicpayKeycloakService,
                { provide: KeycloakService, useValue: new KeycloakServiceMock(false, ['test']) },
                { provide: PicpayKeycloakConfigService, useValue: keycloakConfigMock },
            ],
        });
        guard = TestBed.inject(PicpayKeycloakGuard);
        keycloakService = TestBed.inject(KeycloakService);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    it('should not be able to activate route if the user is not authenticated', async (done: jest.DoneCallback) => {
        const route = createMockActivatedRouteSnapshot([]);
        const state = createMockRouteState('/mockRoute');
        const isLoggedInSpy = spyOn(keycloakService, 'isLoggedIn').and.callThrough();
        const loginSpy = spyOn(keycloakService, 'login').and.callThrough();

        const res$ = from(guard.canActivate(route, state));

        res$.subscribe(resp => {
            expect(resp).toEqual(false);
            expect(isLoggedInSpy).toHaveBeenCalled();
            expect(loginSpy).toHaveBeenCalledWith({ redirectUri: `${window.location.origin}/mockRoute` });
            done();
        });
    });

    it('should not be able to activateChild route if the user is not authenticated', async (done: jest.DoneCallback) => {
        const route = createMockActivatedRouteSnapshot([]);
        const state = createMockRouteState('/mockRoute');
        const isLoggedInSpy = spyOn(keycloakService, 'isLoggedIn').and.callThrough();
        const loginSpy = spyOn(keycloakService, 'login').and.callThrough();

        const res$ = guard.canActivateChild(route, state);

        res$.subscribe(resp => {
            expect(resp).toEqual(false);
            expect(isLoggedInSpy).toHaveBeenCalled();
            expect(loginSpy).toHaveBeenCalledWith({ redirectUri: `${window.location.origin}/mockRoute` });
            done();
        });
    });

    it('should not be able to load route if the user is not authenticated', async (done: jest.DoneCallback) => {
        const route = createMockActivatedRouteSnapshot([]);
        const urlSegments = createMockUrlSegments('testPath');
        const isLoggedInSpy = spyOn(keycloakService, 'isLoggedIn').and.callThrough();
        const loginSpy = spyOn(keycloakService, 'login').and.callThrough();

        const res$ = guard.canLoad(route, urlSegments);

        res$.subscribe(resp => {
            expect(resp).toEqual(false);
            expect(isLoggedInSpy).toHaveBeenCalled();
            expect(loginSpy).toHaveBeenCalledWith({ redirectUri: `${window.location.origin}/testPath` });
            done();
        });
    });
});
