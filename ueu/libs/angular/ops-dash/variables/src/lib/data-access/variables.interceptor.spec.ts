import { TestBed } from '@angular/core/testing';

import { OpsDashVariablesInterceptor } from './variables.interceptor';

import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('OpsDashVariablesInterceptor', () => {
    let interceptor: OpsDashVariablesInterceptor;
    let http: HttpClient;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                OpsDashVariablesInterceptor,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: OpsDashVariablesInterceptor,
                    multi: true,
                },
            ],
        });

        interceptor = TestBed.inject(OpsDashVariablesInterceptor);
        http = TestBed.inject(HttpClient);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(interceptor).toBeTruthy();
    });

    it('should add Content-Type to the request', (done: jest.DoneCallback) => {
        http.get('/testEndpoint').subscribe(() => {
            done();
        });

        const request = httpMock.expectOne('/testEndpoint');
        request.flush({});

        expect(request.request.headers.get('Content-Type')).toBe('application/json');
        httpMock.verify();
    });

    it('should add X-Stage to the request', (done: jest.DoneCallback) => {
        http.get('/testEndpoint').subscribe(() => {
            done();
        });

        const request = httpMock.expectOne('/testEndpoint');
        request.flush({});

        expect(request.request.headers.get('X-Stage')).toBe('qa');
        httpMock.verify();
    });
});
