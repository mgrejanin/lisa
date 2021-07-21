import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { UserPhone } from '../../models/user-phone.model';

import { CellValidationService } from './cell-validation.service';

describe('CellValidationService', () => {
    let service: CellValidationService;
    let httpMock: HttpTestingController;
    let configService: CoreDataAccessService;

    const dataMock: UserPhone = {
        reset: false,
        user_code: '0000',
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CellValidationService,
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com/' }),
                    },
                },
            ],
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(CellValidationService);
        configService = TestBed.inject(CoreDataAccessService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('shoud call postUserPhone() function and return a POST method', (done: jest.DoneCallback) => {
        const expectedUrl = `${configService.getConfig().apiUrl}create/user-phone`;

        service.postUserPhone(dataMock).subscribe(() => done());

        const request = httpMock.expectOne(expectedUrl);
        request.flush(dataMock);
        expect(request.request.method).toBe('POST');

        httpMock.verify();
    });

    it('should call postUserPhone() function and return an error', (done: jest.DoneCallback) => {
        const expectedUrl = `${configService.getConfig().apiUrl}create/user-phone`;

        service.postUserPhone(dataMock).subscribe(
            () => done(),
            () => done(),
        );

        const request = httpMock.expectOne(expectedUrl);
        request.error(new ErrorEvent('Not found'), { status: 404, statusText: 'Not found' });
        expect(request.request.method).toBe('POST');
    });
});
