import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SellerQuery } from '@picpay/seller-register/form';
import { RequestInterceptor } from './request.interceptor';
import { SellerQueryMock } from '../../mocks/seller/seller.query.mock';

describe('RequestInterceptor', () => {
    let interceptor: RequestInterceptor;
    let http: HttpClient;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                RequestInterceptor,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: RequestInterceptor,
                    multi: true,
                },
                { provide: SellerQuery, useValue: new SellerQueryMock() },
            ],
        });

        interceptor = TestBed.inject(RequestInterceptor);
        http = TestBed.inject(HttpClient);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(interceptor).toBeTruthy();
    });

    it('should add hash to the request', (done: jest.DoneCallback) => {
        http.get('/testEndpoint').subscribe(() => {
            done();
        });

        const request = httpMock.expectOne('/testEndpoint');

        request.flush({});

        expect(request.request.body).toEqual({ hash: 'testHASH' });
        httpMock.verify();
    });
});

describe('RequestInterceptor with token on SellerQuery', () => {
    let http: HttpClient;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                RequestInterceptor,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: RequestInterceptor,
                    multi: true,
                },
                { provide: SellerQuery, useValue: new SellerQueryMock('testToken') },
            ],
        });

        http = TestBed.inject(HttpClient);
        httpMock = TestBed.inject(HttpTestingController);
    });
    it('should add token to the request', (done: jest.DoneCallback) => {
        http.get('/testEndpoint').subscribe(() => {
            done();
        });

        const request = httpMock.expectOne('/testEndpoint');

        request.flush({});

        expect(request.request.headers.get('Authorization')).toEqual('Bearer testToken');
        httpMock.verify();
    });
});
