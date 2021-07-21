import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

import { CompanyDataService } from './company-data.service';

describe('BusinessDataService', () => {
    let companyDataService: CompanyDataService;
    let httpMock: HttpTestingController;
    let configService: CoreDataAccessService;

    const mockData = {
        company_cnpj: '22.896.431/0001-10',
        company_social: 'Picpay Serviços S.A',
        company_type: 'Outros',
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com/' }),
                    },
                },
                CompanyDataService,
            ],
            imports: [HttpClientTestingModule],
        });
        companyDataService = TestBed.inject(CompanyDataService);
        configService = TestBed.inject(CoreDataAccessService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(companyDataService).toBeTruthy();
    });

    it('shoud call postCompanyData() function and return a POST method', (done: jest.DoneCallback) => {
        const expectedUrl = `${configService.getConfig().apiUrl}create/company-data`;

        companyDataService.postCompanyData(mockData).subscribe(() => done());

        const request = httpMock.expectOne(expectedUrl);
        request.flush(mockData);
        expect(request.request.method).toBe('POST');

        httpMock.verify();
    });

    it('should call postCompanyData() function and return an error', (done: jest.DoneCallback) => {
        const expectedUrl = `${configService.getConfig().apiUrl}create/company-data`;

        companyDataService.postCompanyData(mockData).subscribe(
            () => done(),
            () => done(),
        );

        const request = httpMock.expectOne(expectedUrl);
        request.error(new ErrorEvent('Not found'), { status: 404, statusText: 'Not found' });
        expect(request.request.method).toBe('POST');
    });
});
