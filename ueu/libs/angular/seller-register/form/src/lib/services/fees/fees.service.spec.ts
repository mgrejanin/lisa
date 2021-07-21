import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { DataFees } from '../../models/fees-response.model';

import { FeesService } from './fees.service';

describe('FeesService', () => {
    let feesService: FeesService;
    let httpMock: HttpTestingController;
    let configService: CoreDataAccessService;

    const mockData: DataFees = {
        company_fees: 1,
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                FeesService,
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com/' }),
                    },
                },
            ],
            imports: [HttpClientTestingModule],
        });
        feesService = TestBed.inject(FeesService);
        configService = TestBed.inject(CoreDataAccessService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(feesService).toBeTruthy();
    });

    it('shoud call getFees() function and return a GET method', () => {
        const expectedUrl = `${configService.getConfig().apiUrl}account/receipt-fees`;

        const mockData = [
            { id: 1, day: '1', percentage: 4.89, percentage_str: '4,89%' },
            { id: 32, day: '2', percentage: 4.71, percentage_str: '4,71%' },
            { id: 33, day: '3', percentage: 4.62, percentage_str: '4,62%' },
        ];

        feesService.getFees().subscribe(response => {
            expect(response).not.toBe(null);
            expect(response).toEqual(mockData);
        });

        const request = httpMock.expectOne(expectedUrl);
        request.flush(mockData);
        expect(request.request.method).toBe('GET');

        httpMock.verify();
    });

    it('should call getFees() function and return an error', (done: jest.DoneCallback) => {
        const expectedUrl = `${configService.getConfig().apiUrl}account/receipt-fees`;

        feesService.getFees().subscribe(
            () => done(),
            () => done(),
        );

        const request = httpMock.expectOne(expectedUrl);
        request.error(new ErrorEvent('Not found'), { status: 404, statusText: 'Not found' });
        expect(request.request.method).toBe('GET');
    });

    it('shoud call postFees() function and return a POST method', (done: jest.DoneCallback) => {
        const expectedUrl = `${configService.getConfig().apiUrl}company/create/company-fees`;

        feesService.postFees(mockData).subscribe(() => done());

        const request = httpMock.expectOne(expectedUrl);
        request.flush(mockData);
        expect(request.request.method).toBe('POST');

        httpMock.verify();
    });

    it('should call postFees() function and return an error', (done: jest.DoneCallback) => {
        const expectedUrl = `${configService.getConfig().apiUrl}company/create/company-fees`;

        feesService.postFees(mockData).subscribe(
            () => done(),
            () => done(),
        );

        const request = httpMock.expectOne(expectedUrl);
        request.error(new ErrorEvent('Not found'), { status: 404, statusText: 'Not found' });
        expect(request.request.method).toBe('POST');
    });
});
