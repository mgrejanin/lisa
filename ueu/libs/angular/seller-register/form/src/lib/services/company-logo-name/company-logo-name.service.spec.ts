import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

import { CompanyLogoNameService } from './company-logo-name.service';

describe('CompanyLogoNameService', () => {
    let service: CompanyLogoNameService;
    let httpMock: HttpTestingController;
    let configService: CoreDataAccessService;

    const validMockImage: File = new File([''], 'test-file.jpg', { lastModified: null, type: 'image/jpeg' });
    Object.defineProperty(validMockImage, 'size', { value: 921600 });
    Object.defineProperty(validMockImage, 'data', { value: 'imageData' });

    const mockData = {
        company_logo: validMockImage,
        company_display: 'Empresa Teste LTDA',
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
                CompanyLogoNameService,
            ],
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(CompanyLogoNameService);
        configService = TestBed.inject(CoreDataAccessService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('shoud call postCompanyLogoName() function and return a POST method', (done: jest.DoneCallback) => {
        const expectedUrl = `${configService.getConfig().apiUrl}company/create/company-config`;

        service.postCompanyLogoName(mockData).subscribe(() => done());

        const request = httpMock.expectOne(expectedUrl);
        request.flush(mockData);
        expect(request.request.method).toBe('POST');

        httpMock.verify();
    });

    it('should call postCompanyLogoName() function and return an error', (done: jest.DoneCallback) => {
        const expectedUrl = `${configService.getConfig().apiUrl}company/create/company-config`;

        service.postCompanyLogoName(mockData).subscribe(
            () => done(),
            () => done(),
        );

        const request = httpMock.expectOne(expectedUrl);
        request.error(new ErrorEvent('Not found'), { status: 404, statusText: 'Not found' });
        expect(request.request.method).toBe('POST');
    });
});
