import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

import { mockBussinessGlossaryDetail } from '../mocks/business-glossary.mock';
import { DashboardsDetailService } from './dashboards-detail.service';
import { DashboardsDetailStore } from './dashboards-detail.store';

describe('DashboardsDetailService', () => {
    let service: DashboardsDetailService;
    let store: DashboardsDetailStore;
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
                DashboardsDetailService,
                DashboardsDetailStore,
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
        service = TestBed.inject(DashboardsDetailService);
        store = TestBed.inject(DashboardsDetailStore);
        apiUrl = configService.getConfig().apiUrl;
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
        expect(store).toBeTruthy();
    });

    it('should have getDashboardsDetail function', () => {
        const idMock = 'mock';
        const expectedUrl = `${apiUrl}/dashboards/${idMock}`;

        service.getDashboardsDetail(idMock);

        const request = httpMock.expectOne(expectedUrl);
        request.flush(mockBussinessGlossaryDetail);

        expect(request.request.method).toBe('GET');
    });
});
