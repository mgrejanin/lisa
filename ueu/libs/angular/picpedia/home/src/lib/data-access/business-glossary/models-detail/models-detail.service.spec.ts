import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

import { mockBussinessGlossaryModelsDetail } from '../mocks/business-glossary.mock';
import { ModelsDetailService } from './models-detail.service';
import { ModelsDetailStore } from './models-detail.store';

describe('ModelsDetailService', () => {
    let service: ModelsDetailService;
    let store: ModelsDetailStore;
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
                ModelsDetailService,
                ModelsDetailStore,
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
        service = TestBed.inject(ModelsDetailService);
        store = TestBed.inject(ModelsDetailStore);
        apiUrl = configService.getConfig().apiUrl;
        httpMock = TestBed.inject(HttpTestingController);
        router = TestBed.inject(Router);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
        expect(store).toBeTruthy();
    });

    it('should have getModelsDetail function', () => {
        const idMock = 'mock';
        const expectedUrl = `${apiUrl}/${idMock}`;

        service.getModelsDetail(idMock);

        const request = httpMock.expectOne(expectedUrl);
        request.flush(mockBussinessGlossaryModelsDetail);

        expect(request.request.method).toBe('GET');
    });

    it('should have getModelsDetail 404 error response', () => {
        const idMock = 'mock';
        const expectedUrl = `${apiUrl}/${idMock}`;
        const routerSpy = spyOn(router, 'navigateByUrl');

        service.getModelsDetail(idMock);

        const request = httpMock.expectOne(expectedUrl);
        request.error(new ErrorEvent('Error'), { status: 404, statusText: 'unauthorized' });

        expect(routerSpy).toHaveBeenCalledWith('/404/not-found');
        expect(request.request.method).toBe('GET');
    });

    it('should have getModelsDetail 401 error response', () => {
        const idMock = 'mock';
        const expectedUrl = `${apiUrl}/${idMock}`;
        service.getModelsDetail(idMock);

        const request = httpMock.expectOne(expectedUrl);
        request.error(new ErrorEvent('Error'), { status: 401, statusText: 'unauthorized' });

        expect(request.request.method).toBe('GET');
    });
});
