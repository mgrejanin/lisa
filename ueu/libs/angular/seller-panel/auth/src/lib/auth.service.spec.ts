import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SellerService, SellerServiceMock } from '@picpay/seller-panel/services';
import { LocalStorageMock } from '@picpay/angular/shared/helpers';

import { SellerAccessConfig } from '@picpay/seller-panel/seller-access';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { SellerPanelAuthService } from './auth.service';
import { Login, RequestLostPassword, RequestNewPassword, UpdatePassword } from './model';
import { EventTracking } from '@picpay/event-tracking';
import {
    MockNotificationsService,
    NotificationsService,
    SnackbarTypes,
} from '@picpay/angular/shared/core/notifications';

const store = {
    token_transaction: '745f6ada-8d82-4483-9122-4b8b87a8f9d9',
    token_transaction_expires_in: '2020-07-30 12:57:58',
    token_refresh: 'd1b6a0e8-a1ae-486d-8e5b-89f0c8660ce0',
    token_refresh_expires_in: '2020-07-30 13:27:58',
    token_biz: '1ngB333GumIBaoeRwtdcfiRrdZiY1h6isIEJHLEw',
    seller: {},
    timezone: {},
};
const tokenTransactionExpires = new Date(new Date().getTime() + 60000).toISOString();
const tokenRefreshExpires = new Date(new Date().getTime() + 120000).toISOString();

describe('SellerPanelAuthService', () => {
    let authService: SellerPanelAuthService;
    let configService: CoreDataAccessService<SellerAccessConfig>;
    let notificationService: NotificationsService;
    let httpMock: HttpTestingController;
    let localStorageMock: LocalStorageMock;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                SellerPanelAuthService,
                { provide: SellerService, useClass: SellerServiceMock },
                { provide: NotificationsService, useValue: new MockNotificationsService({ confirmed: true }) },
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'seller-panel-auth.com' }),
                    },
                },
            ],
            imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule],
        });

        authService = TestBed.inject(SellerPanelAuthService);

        configService = TestBed.inject(CoreDataAccessService);

        localStorageMock = new LocalStorageMock();
        notificationService = TestBed.inject(NotificationsService);

        httpMock = TestBed.inject(HttpTestingController);

        router = TestBed.inject(Router);

        localStorageMock.store = store;

        spyOn(localStorage, 'getItem').and.callFake(localStorageMock.getItem);
        spyOn(localStorage, 'setItem').and.callFake(localStorageMock.setItem);
        spyOn(localStorage, 'removeItem').and.callFake(localStorageMock.removeItem);
        spyOn(localStorage, 'clear').and.callFake(localStorageMock.clear);
    });

    it('should be created', () => {
        expect(authService).toBeTruthy();
    });

    it('should have setLocalStorage function', () => {
        authService.setLocalStorage({
            token_transaction: 'new-token-transaction',
            token_transaction_expires_in: tokenTransactionExpires,
            token_refresh: 'new-token-refresh',
            token_refresh_expires_in: tokenRefreshExpires,
            token_biz: 'new-token-biz',
            timezone: {
                timezone: 'America/Sao_Paulo',
                timezone_type: 3,
            },
        });

        expect(authService.getLocalStorage()).toEqual({
            token_transaction: 'new-token-transaction',
            token_transaction_expires_in: tokenTransactionExpires,
            token_refresh: 'new-token-refresh',
            token_refresh_expires_in: tokenRefreshExpires,
            token_biz: 'new-token-biz',
            timezone: {
                timezone: 'America/Sao_Paulo',
                timezone_type: 3,
            },
        });
    });

    it('should have getLocalStorage function', () => {
        const storage = authService.getLocalStorage();

        expect(storage).toEqual({
            token_transaction: 'new-token-transaction',
            token_transaction_expires_in: tokenTransactionExpires,
            token_refresh: 'new-token-refresh',
            token_refresh_expires_in: tokenRefreshExpires,
            token_biz: 'new-token-biz',
            timezone: {
                timezone: 'America/Sao_Paulo',
                timezone_type: 3,
            },
        });
    });

    it('should have isLogged function', () => {
        expect(authService.isLogged()).toBe(true);
    });

    it('should have login function (Success case)', (done: jest.DoneCallback) => {
        const expectedUrl = `${configService.getConfig().apiUrl}/user/login`;
        const expectedBody: Login = {
            email: 'testLogin',
            password: 'testPassword',
            cnpj: '22084696000112',
            ignore_interceptor: true,
        };
        const setLocalStorageSpy = spyOn(authService, 'setLocalStorage');

        authService.login(expectedBody).subscribe(
            () => {
                expect(setLocalStorageSpy).toHaveBeenCalled();
                done();
            },
            () => done(),
        );

        const request = httpMock.expectOne(expectedUrl);
        request.flush({});

        expect(request.request.method).toBe('POST');
        expect(request.request.body).toEqual(expectedBody);

        httpMock.verify();
    });

    it('should have login funcion (Error case)', (done: jest.DoneCallback) => {
        const url = `${configService.getConfig().apiUrl}/user/login`;
        const body: Login = {
            email: 'testLogin',
            password: 'testPassword',
            cnpj: '22084696000112',
            ignore_interceptor: true,
        };
        let statusCode: number;

        authService.login(body).subscribe(
            () => {
                done();
            },
            err => {
                statusCode = err.status;
                done();
            },
        );

        const authRequest = httpMock.expectOne(url);

        authRequest.error(new ErrorEvent('unauthorized'), { status: 404, statusText: 'bad request' });

        expect(authRequest.request.method).toBe('POST');
        expect(statusCode).toBe(404);
    });

    it('should have refreshToken function (Success case)', (done: jest.DoneCallback) => {
        const expectedUrl = `${configService.getConfig().apiUrl}/user/refresh`;
        const setLocalStorageSpy = spyOn(authService, 'setLocalStorage');
        const logoutSpy = spyOn(authService, 'logout');

        authService.setLocalStorage({
            token_transaction: 'new-token-transaction',
            token_transaction_expires_in: tokenTransactionExpires,
            token_refresh: 'new-token-refresh',
            token_refresh_expires_in: tokenRefreshExpires,
            token_biz: 'new-token-biz',
        });

        authService.refreshToken().subscribe(
            () => {
                expect(setLocalStorageSpy).toHaveBeenCalled();
                done();
            },
            () => {
                expect(logoutSpy).toHaveBeenCalled();
                done();
            },
        );

        const request = httpMock.expectOne(expectedUrl);
        request.flush({});

        expect(request.request.method).toBe('POST');

        httpMock.verify();
    });

    it('should have refreshToken funcion (Error case)', (done: jest.DoneCallback) => {
        const url = `${configService.getConfig().apiUrl}/user/refresh`;
        let statusCode: number;

        authService.refreshToken().subscribe(
            () => {
                done();
            },
            err => {
                statusCode = err.status;
                done();
            },
        );

        const authRequest = httpMock.expectOne(url);

        authRequest.error(new ErrorEvent('unauthorized'), { status: 404, statusText: 'bad request' });

        expect(authRequest.request.method).toBe('POST');
        expect(statusCode).toBe(404);
    });

    it('should have logout function (Success case)', () => {
        const expectedUrl = `${configService.getConfig().apiUrl}/user/logout`;
        const routerSpy = spyOn(router, 'navigate');
        const spyOnLogout = spyOn(EventTracking, 'logout');

        authService.logout();

        const request = httpMock.expectOne(expectedUrl);
        request.flush({});

        expect(request.request.method).toBe('POST');
        expect(routerSpy).toHaveBeenCalledWith(['/login']);
        expect(spyOnLogout).toHaveBeenCalled();

        httpMock.verify();
    });

    it('should have logout funcion (Error case)', (done: jest.DoneCallback) => {
        const url = `${configService.getConfig().apiUrl}/user/logout`;
        const routerSpy = spyOn(router, 'navigate');

        authService.logout();
        done();

        const authRequest = httpMock.expectOne(url);

        authRequest.error(new ErrorEvent('unauthorized'), { status: 404, statusText: 'bad request' });

        expect(authRequest.request.method).toBe('POST');
        expect(routerSpy).toHaveBeenCalledWith(['/login']);
    });

    it('should have updatePassword function', () => {
        const expectedUrl = `${configService.getConfig().apiUrl}/user/changePassword`;
        const expectedBody: UpdatePassword = {
            password: 'oldPassword',
            old_password: 'newPassword',
            password_confirmation: 'newPassword',
        };
        const notificationSpy = spyOn(notificationService, 'openSnackbar');

        authService
            .updatePassword({
                password: 'oldPassword',
                old_password: 'newPassword',
                password_confirmation: 'newPassword',
            })
            .subscribe(() => {
                expect(notificationSpy).toHaveBeenCalledWith(
                    'Sua senha foi atualizada com sucesso!',
                    SnackbarTypes.DONE,
                );
            });

        const request = httpMock.expectOne(expectedUrl);
        request.flush({});

        expect(request.request.method).toBe('POST');
        expect(request.request.body).toEqual(expectedBody);

        httpMock.verify();
    });

    it('should have requestNewPassword function', (done: jest.DoneCallback) => {
        const expectedUrl = `${configService.getConfig().apiUrl}/user/recoveryPasswordStepOne`;
        const expectedBody: RequestNewPassword = {
            email: 'test@test.com',
            cnpj: '22084696000112',
            ignore_interceptor: true,
        };

        authService
            .requestNewPassword({
                email: 'test@test.com',
                cnpj: '22084696000112',
                ignore_interceptor: true,
            })
            .subscribe(
                () => done(),
                () => done(),
            );

        const request = httpMock.expectOne(expectedUrl);
        request.flush({});

        expect(request.request.method).toBe('POST');
        expect(request.request.body).toEqual(expectedBody);

        httpMock.verify();
    });

    it('should have changeLostPassword function', (done: jest.DoneCallback) => {
        const expectedUrl = `${configService.getConfig().apiUrl}/user/recoveryPasswordStepTwo`;
        const expectedBody: RequestLostPassword = {
            password_recovery_key: 'pw-key-recovery-key',
            password: 'new-password',
            password_confirmation: 'new-password',
            email: 'test@test.com',
            ignore_interceptor: true,
        };

        authService
            .changeLostPassword({
                password_recovery_key: 'pw-key-recovery-key',
                password: 'new-password',
                password_confirmation: 'new-password',
                email: 'test@test.com',
                ignore_interceptor: true,
            })
            .subscribe(
                () => done(),
                () => done(),
            );

        const request = httpMock.expectOne(expectedUrl);
        request.flush({});

        expect(request.request.method).toBe('POST');
        expect(request.request.body).toEqual(expectedBody);

        httpMock.verify();
    });
});
