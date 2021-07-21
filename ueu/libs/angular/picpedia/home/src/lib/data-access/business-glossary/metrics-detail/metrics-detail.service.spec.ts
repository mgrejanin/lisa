import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

import { mockBussinessGlossaryMetricsDetail } from '../mocks/business-glossary.mock';
import { MetricsDetailService } from './metrics-detail.service';
import { MetricsDetailStore } from './metrics-detail.store';

describe('MetricsDetailService', () => {
    let service: MetricsDetailService;
    let store: MetricsDetailStore;
    let configService: CoreDataAccessService;
    let apiUrl: string;
    let httpMock: HttpTestingController;
    let router: Router;

    beforeEach(() => {
        const httpErrorResponseStub = () => ({
            error: { message: {} },
            status: {},
            message: {},
        });

        TestBed.configureTestingModule({
            providers: [
                MetricsDetailService,
                MetricsDetailStore,
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'testApiUrl' }),
                    },
                },
                { provide: HttpErrorResponse, useFactory: httpErrorResponseStub },
            ],
            imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
        });

        configService = TestBed.inject(CoreDataAccessService);
        service = TestBed.inject(MetricsDetailService);
        store = TestBed.inject(MetricsDetailStore);
        apiUrl = configService.getConfig().apiUrl;
        httpMock = TestBed.inject(HttpTestingController);
        router = TestBed.inject(Router);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
        expect(store).toBeTruthy();
    });

    it('should have getMetricsDetail function', () => {
        const idMock = 1;
        const expectedUrl = `${apiUrl}/${idMock}`;

        service.getMetricsDetail(idMock);

        const request = httpMock.expectOne(expectedUrl);
        request.flush(mockBussinessGlossaryMetricsDetail);

        expect(request.request.method).toBe('GET');
    });

    it('should have getMetricsDetail 404 error response', () => {
        const idMock = 1;
        const expectedUrl = `${apiUrl}/${idMock}`;
        const routerSpy = spyOn(router, 'navigateByUrl');

        service.getMetricsDetail(idMock);

        const request = httpMock.expectOne(expectedUrl);
        request.error(new ErrorEvent('Error'), { status: 404, statusText: 'unauthorized' });

        expect(routerSpy).toHaveBeenCalledWith('/404/not-found');
        expect(request.request.method).toBe('GET');
    });

    it('should have getMetricsDetail 401 error response', () => {
        const idMock = 1;
        const expectedUrl = `${apiUrl}/${idMock}`;
        service.getMetricsDetail(idMock);

        const request = httpMock.expectOne(expectedUrl);
        request.error(new ErrorEvent('Error'), { status: 401, statusText: 'unauthorized' });

        expect(request.request.method).toBe('GET');
    });
});
