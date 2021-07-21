import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { SellerPanelAuthServiceMock } from '../mocks/auth.service.mock';

import { SellerAccessConfig } from '@picpay/seller-panel/seller-access';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { SellerPanelAuthService } from '../auth.service';
import { SellerPanelRequestInterceptor } from './http-request.interceptor';
import { MockNotificationsService, NotificationsService } from '@picpay/angular/shared/core/notifications';

describe('SellerPanelRequestInterceptor', () => {
    let interceptor: SellerPanelRequestInterceptor;
    let http: HttpClient;
    let httpMock: HttpTestingController;
    let configService: CoreDataAccessService<SellerAccessConfig>;
    let authService: SellerPanelAuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                SellerPanelRequestInterceptor,
                { provide: SellerPanelAuthService, useClass: SellerPanelAuthServiceMock },
                { provide: NotificationsService, useValue: new MockNotificationsService({ confirmed: true }) },
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'sellerpanel-api.test' }),
                    },
                },
                { provide: HTTP_INTERCEPTORS, useClass: SellerPanelRequestInterceptor, multi: true },
            ],
        });

        interceptor = TestBed.inject(SellerPanelRequestInterceptor);
        configService = TestBed.inject(CoreDataAccessService);
        authService = TestBed.inject(SellerPanelAuthService);

        http = TestBed.inject(HttpClient);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(interceptor).toBeTruthy();
    });

    it('should add token bearer to the request', (done: jest.DoneCallback) => {
        const expectedUrl = `${configService.getConfig().apiUrl}/test`;

        http.get(expectedUrl).subscribe(() => done());

        const request = httpMock.expectOne(expectedUrl);

        request.flush({});

        expect(request.request.method).toBe('GET');
        expect(request.request.headers.has('Authorization')).toBe(true);
    });

    it('should pass without auth bearer to the request', (done: jest.DoneCallback) => {
        const expectedUrl = `${configService.getConfig().apiUrl}/test`;

        http.post(expectedUrl, { ignore_interceptor: true }).subscribe(() => done());

        const request = httpMock.expectOne(expectedUrl);

        request.flush({});

        expect(request.request.method).toBe('POST');
        expect(request.request.headers.has('Authorization')).toBe(false);
    });

    it('should not refresh token on a 401 error response', () => {
        const expectedUrl = `${configService.getConfig().apiUrl}/test`;
        const refreshSpy = spyOn(authService, 'refreshToken').and.callFake(() => of({}));
        const logoutSpy = spyOn(authService, 'logout');

        http.get(expectedUrl).subscribe();

        const httpRequest = httpMock.expectOne(expectedUrl);
        httpRequest.error(new ErrorEvent('Unauthorized'), { status: 401, statusText: 'Unauthorized' });

        expect(refreshSpy).toHaveBeenCalled();
        expect(logoutSpy).toHaveBeenCalled();
    });

    it('should handleError return default throwError without ignoreInterceptor', (done: jest.DoneCallback) => {
        const expectedUrl = `${configService.getConfig().apiUrl}/test`;

        http.get(expectedUrl).subscribe(
            () => done(),
            () => done(),
        );

        const httpRequest = httpMock.expectOne(expectedUrl);

        httpRequest.error(new ErrorEvent('Not found'), { status: 404, statusText: 'Not found' });

        expect(httpRequest.request.method).toBe('GET');
    });

    it('should handleError return default throwError with ignoreInterceptor', (done: jest.DoneCallback) => {
        const expectedUrl = `${configService.getConfig().apiUrl}/test`;

        http.post(expectedUrl, { ignore_interceptor: true }).subscribe(
            () => done(),
            () => done(),
        );

        const httpRequest = httpMock.expectOne(expectedUrl);

        httpRequest.error(new ErrorEvent('Something was wrong'), { status: 500, statusText: 'Server internal error' });

        expect(httpRequest.request.method).toBe('POST');
        expect(httpRequest.request.headers.get('Authorization')).toBeNull();
    });
});
