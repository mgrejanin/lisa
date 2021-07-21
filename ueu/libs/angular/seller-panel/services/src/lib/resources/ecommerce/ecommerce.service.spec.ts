import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

import { EcommerceService } from './ecommerce.service';

describe('EcommerceService', () => {
    let ecommerceService: EcommerceService;
    let configService: CoreDataAccessService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [
                EcommerceService,
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'ecommerce.com' }),
                    },
                },
            ],
        });

        ecommerceService = TestBed.inject(EcommerceService);
        configService = TestBed.inject(CoreDataAccessService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(ecommerceService).toBeTruthy();
    });

    it('should have getTokens function (Success case)', (done: jest.DoneCallback) => {
        const url = `${configService.getConfig().apiUrl}/ecommerce/tokens`;

        ecommerceService.getTokens().subscribe(() => done());

        const ecommerceRequest = httpMock.expectOne(url);

        ecommerceRequest.flush({});

        expect(ecommerceRequest.request.method).toBe('GET');
    });

    it('should have getTokens function (Error case)', (done: jest.DoneCallback) => {
        const url = `${configService.getConfig().apiUrl}/ecommerce/tokens`;
        let statusCode: number;

        ecommerceService.getTokens().subscribe(
            () => {
                done();
            },
            err => {
                statusCode = err.status;
                done();
            },
        );

        const ecommerceRequest = httpMock.expectOne(url);

        ecommerceRequest.error(new ErrorEvent('unauthorized'), { status: 404, statusText: 'unauthorized' });

        expect(ecommerceRequest.request.method).toBe('GET');
        expect(statusCode).toBe(404);
    });

    it('should have generateTokens function (Success case)', (done: jest.DoneCallback) => {
        const url = `${configService.getConfig().apiUrl}/ecommerce/tokens`;

        ecommerceService.generateTokens().subscribe(() => done());

        const ecommerceRequest = httpMock.expectOne(url);

        ecommerceRequest.flush({});

        expect(ecommerceRequest.request.method).toBe('POST');
    });

    it('should have generateTokens function (Error case)', (done: jest.DoneCallback) => {
        const url = `${configService.getConfig().apiUrl}/ecommerce/tokens`;
        let statusCode: number;

        ecommerceService.generateTokens().subscribe(
            () => {
                done();
            },
            err => {
                statusCode = err.status;
                done();
            },
        );

        const ecommerceRequest = httpMock.expectOne(url);

        ecommerceRequest.error(new ErrorEvent('unauthorized'), { status: 404, statusText: 'unauthorized' });

        expect(ecommerceRequest.request.method).toBe('POST');
        expect(statusCode).toBe(404);
    });

    it('should have getPlans function (Success case)', (done: jest.DoneCallback) => {
        const url = `${configService.getConfig().apiUrl}/ecommerce/plans`;

        ecommerceService.getPlans().subscribe(() => done());

        const ecommerceRequest = httpMock.expectOne(url);

        ecommerceRequest.flush({});

        expect(ecommerceRequest.request.method).toBe('GET');
    });

    it('should have getPlans function (Error case)', (done: jest.DoneCallback) => {
        const url = `${configService.getConfig().apiUrl}/ecommerce/plans`;
        let statusCode: number;

        ecommerceService.getPlans().subscribe(
            () => {
                done();
            },
            err => {
                statusCode = err.status;
                done();
            },
        );

        const ecommerceRequest = httpMock.expectOne(url);

        ecommerceRequest.error(new ErrorEvent('unauthorized'), { status: 404, statusText: 'unauthorized' });

        expect(ecommerceRequest.request.method).toBe('GET');
        expect(statusCode).toBe(404);
    });

    it('should have setPlan function (Success case)', (done: jest.DoneCallback) => {
        const url = `${configService.getConfig().apiUrl}/user/details`;

        ecommerceService.setPlan(123).subscribe(() => done());

        const ecommerceRequest = httpMock.expectOne(url);

        ecommerceRequest.flush({});

        expect(ecommerceRequest.request.method).toBe('PATCH');
    });

    it('should have setPlan function (Error case)', (done: jest.DoneCallback) => {
        const url = `${configService.getConfig().apiUrl}/user/details`;
        let statusCode: number;

        ecommerceService.setPlan(123).subscribe(
            () => {
                done();
            },
            err => {
                statusCode = err.status;
                done();
            },
        );

        const ecommerceRequest = httpMock.expectOne(url);

        ecommerceRequest.error(new ErrorEvent('unauthorized'), { status: 404, statusText: 'unauthorized' });

        expect(ecommerceRequest.request.method).toBe('PATCH');
        expect(statusCode).toBe(404);
    });
});
