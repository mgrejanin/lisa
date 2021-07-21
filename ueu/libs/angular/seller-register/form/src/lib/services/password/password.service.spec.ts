import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

import { PasswordService } from './password.service';

describe('PasswordService', () => {
    let passwordService: PasswordService;
    let httpMock: HttpTestingController;
    let configService: CoreDataAccessService;

    const mockData = {
        user_password: 'PicPay@123456',
        user_password_confirmation: 'PicPay@123456',
        terms: true,
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
                PasswordService,
            ],
            imports: [HttpClientTestingModule],
        });
        passwordService = TestBed.inject(PasswordService);
        configService = TestBed.inject(CoreDataAccessService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(passwordService).toBeTruthy();
    });

    it('shoud call postPassword() function and return a POST method', (done: jest.DoneCallback) => {
        const expectedUrl = `${configService.getConfig().apiUrl}create/user-password`;

        passwordService.postPassword(mockData).subscribe(() => done());

        const request = httpMock.expectOne(expectedUrl);
        request.flush(mockData);
        expect(request.request.method).toBe('POST');

        httpMock.verify();
    });

    it('should call postPassword() function and return an error', (done: jest.DoneCallback) => {
        const expectedUrl = `${configService.getConfig().apiUrl}create/user-password`;

        passwordService.postPassword(mockData).subscribe(
            () => done(),
            () => done(),
        );

        const request = httpMock.expectOne(expectedUrl);
        request.error(new ErrorEvent('Not found'), { status: 404, statusText: 'Not found' });
        expect(request.request.method).toBe('POST');
    });
});
