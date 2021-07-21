import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

import { PersonalAddressService } from './personal-address.service';

describe('PersonalAddressService', () => {
    let personalAddressService: PersonalAddressService;
    let httpMock: HttpTestingController;
    let configService: CoreDataAccessService;

    const mockData = {
        user_address_code: '05317-020',
        user_address_street: 'Avenida Manuel Bandeira',
        user_address_complement: 'Bloco B',
        user_address_number: '291',
        user_address_neighbourhood: 'Vila Leopoldina',
        user_address_city: 'São Paulo',
        user_address_state: 'SP',
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
        personalAddressService = TestBed.inject(PersonalAddressService);
        configService = TestBed.inject(CoreDataAccessService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(personalAddressService).toBeTruthy();
    });

    it('shoud call postPersonalAddress() function and return a POST method', (done: jest.DoneCallback) => {
        const expectedUrl = `${configService.getConfig().apiUrl}create/user-address`;

        personalAddressService.postPersonalAddress(mockData).subscribe(() => done());

        const request = httpMock.expectOne(expectedUrl);
        request.flush(mockData);
        expect(request.request.method).toBe('POST');

        httpMock.verify();
    });

    it('should call postPersonalAddress() function and return an error', (done: jest.DoneCallback) => {
        const expectedUrl = `${configService.getConfig().apiUrl}create/user-address`;

        personalAddressService.postPersonalAddress(mockData).subscribe(
            () => done(),
            () => done(),
        );

        const request = httpMock.expectOne(expectedUrl);
        request.error(new ErrorEvent('Not found'), { status: 404, statusText: 'Not found' });
        expect(request.request.method).toBe('POST');
    });
});
