import { TestBed } from '@angular/core/testing';

// modules
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DevPortalInterceptor } from './dev-portal.interceptor';
import { environment } from '../../environments/environment';

describe('DevPortalInterceptor', () => {
    let interceptor: DevPortalInterceptor;
    let http: HttpClient;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                DevPortalInterceptor,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: DevPortalInterceptor,
                    multi: true,
                },
            ],
        });

        interceptor = TestBed.inject(DevPortalInterceptor);
        http = TestBed.inject(HttpClient);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(interceptor).toBeTruthy();
    });

    it('should add token bearer to the request', (done: jest.DoneCallback) => {
        http.get('/testEndpoint').subscribe(() => {
            done();
        });

        const request = httpMock.expectOne('/testEndpoint');

        request.flush({});

        expect(request.request.headers.get('Api-Key')).toBe(environment.apiKey);
        httpMock.verify();
    });
});
