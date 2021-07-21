import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { MockNotificationsService, NotificationsService } from '@picpay/angular/shared/core/notifications';
import { CheckPasswordService } from './check-password.service';

describe('CheckPassword', () => {
    let checkPassword: CheckPasswordService;
    let httpMock: HttpTestingController;
    let configService: CoreDataAccessService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [
                CheckPasswordService,
                { provide: NotificationsService, useValue: new MockNotificationsService({ confirmed: true }) },
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'charge.com' }),
                    },
                },
            ],
        });

        configService = TestBed.inject(CoreDataAccessService);
        checkPassword = TestBed.inject(CheckPasswordService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(checkPassword).toBeTruthy();
    });

    it('should have verifyPassword function', (done: jest.DoneCallback) => {
        const expectedUrl = `${configService.getConfig().apiUrl}/user/verifyPassword`;
        const expectedBody = {
            password: 'new-password',
        };

        checkPassword
            .verifyPassword({
                password: 'new-password',
            })
            .subscribe(
                () => done(),
                () => done(),
            );

        const request = httpMock.expectOne(expectedUrl);
        request.flush({});

        expect(request.request.method).toBe('POST');
        expect(request.request.body).toEqual(expectedBody);

        httpMock.verify();
    });
});
