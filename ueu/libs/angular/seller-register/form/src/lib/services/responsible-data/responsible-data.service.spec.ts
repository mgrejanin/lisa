import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { Responsible } from '../../models/responsible-data.model';
import { PersonalAddressService } from '../personal-address/personal-address.service';

import { ResponsibleDataService } from './responsible-data.service';

describe('ResponsibleDataService', () => {
    let responsibleDataService: ResponsibleDataService;
    let httpMock: HttpTestingController;
    let configService: CoreDataAccessService;

    const mockData: Responsible = {
        user_name: 'User Test',
        user_email: 'email@test.com',
        user_cell_number: '(99) 99999-9999',
        user_birthday: '01/01/01',
        user_document: '12345678901',
        user_mother: 'Mae Teste',
        recaptcha: '',
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
                PersonalAddressService,
            ],
            imports: [HttpClientTestingModule],
        });
        responsibleDataService = TestBed.inject(ResponsibleDataService);
        configService = TestBed.inject(CoreDataAccessService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(responsibleDataService).toBeTruthy();
    });

    it('shoud call postResponsibleData() function and return a POST method', (done: jest.DoneCallback) => {
        const expectedUrl = `${configService.getConfig().apiUrl}create/user-data`;

        responsibleDataService.postResponsibleData(mockData).subscribe(() => done());

        const request = httpMock.expectOne(expectedUrl);
        request.flush(mockData);
        expect(request.request.method).toBe('POST');

        httpMock.verify();
    });

    it('should call postResponsibleData() function and return an error', (done: jest.DoneCallback) => {
        const expectedUrl = `${configService.getConfig().apiUrl}create/user-data`;

        responsibleDataService.postResponsibleData(mockData).subscribe(
            () => done(),
            () => done(),
        );

        const request = httpMock.expectOne(expectedUrl);
        request.error(new ErrorEvent('Not found'), { status: 404, statusText: 'Not found' });
        expect(request.request.method).toBe('POST');
    });
});
