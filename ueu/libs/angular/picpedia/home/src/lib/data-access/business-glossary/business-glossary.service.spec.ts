import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

import { mockBussinessGlossary } from './mocks/business-glossary.mock';
import { BusinessGlossaryService } from './business-glossary.service';
import { BusinessGlossaryStore } from './business-glossary.store';

describe('BusinessGlossaryService', () => {
    let service: BusinessGlossaryService;
    let store: BusinessGlossaryStore;
    let configService: CoreDataAccessService;
    let apiUrl: string;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        const httpErrorResponseStub = () => ({
            error: { message: {} },
            status: {},
            message: {},
        });

        TestBed.configureTestingModule({
            providers: [
                BusinessGlossaryService,
                BusinessGlossaryStore,
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'testApiUrl' }),
                    },
                },
                { provide: HttpErrorResponse, useFactory: httpErrorResponseStub },
            ],
            imports: [HttpClientTestingModule],
        });

        configService = TestBed.inject(CoreDataAccessService);
        service = TestBed.inject(BusinessGlossaryService);
        store = TestBed.inject(BusinessGlossaryStore);
        apiUrl = configService.getConfig().apiUrl;
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
        expect(store).toBeTruthy();
    });

    it('should have getDashboardsCards function', () => {
        const expectedUrl = `${apiUrl}/dashboards`;
        service.getDashboardsCards();

        const request = httpMock.expectOne(expectedUrl);
        request.flush(mockBussinessGlossary);

        expect(request.request.method).toBe('GET');
    });

    it('should have getDashboardsListItem function', () => {
        const idMock = 'mock';
        const expectedUrl = `${apiUrl}/dashboards/${idMock}`;

        service.getDashboardsListItem(idMock);

        const request = httpMock.expectOne(expectedUrl);
        request.flush(mockBussinessGlossary);

        expect(request.request.method).toBe('GET');
    });

    it('should have getDashboardsList function', () => {
        const expectedUrl = `${apiUrl}/dashboards`;
        service.getDashboardsList();

        const request = httpMock.expectOne(expectedUrl);
        request.flush(mockBussinessGlossary);

        expect(request.request.method).toBe('GET');
    });

    it('should have updateDashboardsListFavorite function', () => {
        const dataMock = true;
        const idMock = 1;
        const expectedUrl = `${apiUrl}/dashboards/${idMock}`;

        service.updateDashboardsListFavorite(dataMock, idMock);

        const request = httpMock.expectOne(expectedUrl);
        request.flush(mockBussinessGlossary);

        expect(request.request.method).toBe('PUT');
    });

    it('should have getMetricsCards function', () => {
        const expectedUrl = `${apiUrl}/dashboards`;
        service.getMetricsCards();

        const request = httpMock.expectOne(expectedUrl);
        request.flush(mockBussinessGlossary);

        expect(request.request.method).toBe('GET');
    });

    it('should have getMetricsListItem function', () => {
        const idMock = 'mock';
        const expectedUrl = `${apiUrl}/dashboards/${idMock}`;

        service.getMetricsListItem(idMock);

        const request = httpMock.expectOne(expectedUrl);
        request.flush(mockBussinessGlossary);

        expect(request.request.method).toBe('GET');
    });

    it('should have getMetricsList function', () => {
        const expectedUrl = `${apiUrl}/dashboards`;
        service.getMetricsList();

        const request = httpMock.expectOne(expectedUrl);
        request.flush(mockBussinessGlossary);

        expect(request.request.method).toBe('GET');
    });

    it('should have getModelsCards function', () => {
        const expectedUrl = `${apiUrl}/dashboards`;
        service.getModelsCards();

        const request = httpMock.expectOne(expectedUrl);
        request.flush(mockBussinessGlossary);

        expect(request.request.method).toBe('GET');
    });

    it('should have getModelsListItem function', () => {
        const idMock = 'mock';
        const expectedUrl = `${apiUrl}/dashboards/${idMock}`;

        service.getModelsListItem(idMock);

        const request = httpMock.expectOne(expectedUrl);
        request.flush(mockBussinessGlossary);

        expect(request.request.method).toBe('GET');
    });

    it('should have getModelsList function', () => {
        const expectedUrl = `${apiUrl}/dashboards`;
        service.getModelsList();

        const request = httpMock.expectOne(expectedUrl);
        request.flush(mockBussinessGlossary);

        expect(request.request.method).toBe('GET');
    });
});
