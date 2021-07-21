import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { MockNotificationsService, NotificationsService } from '@picpay/angular/shared/core/notifications';

import { ChargeService } from './charge.service';

describe('ChargeService', () => {
    let chargeService: ChargeService;
    let httpMock: HttpTestingController;
    let configService: CoreDataAccessService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [
                ChargeService,
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
        chargeService = TestBed.inject(ChargeService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(chargeService).toBeTruthy();
    });

    it('should have getChargeTransacton function (Success case)', (done: jest.DoneCallback) => {
        const url = `${configService.getConfig().apiUrl}/transactions/ppcode`;
        const payload = {
            value: 0,
            fixed_value: true,
            token_biz: 'Hzx413nJJJ718snZVrqewwWW',
        };

        chargeService.getChargeTransaction(payload).subscribe(() => done());

        const chargeRequest = httpMock.expectOne(url);

        chargeRequest.flush({});

        expect(chargeRequest.request.method).toBe('POST');
    });

    it('should have getChargeTransacton function (Error case)', (done: jest.DoneCallback) => {
        const url = `${configService.getConfig().apiUrl}/transactions/ppcode`;
        const payload = {
            value: 0,
            fixed_value: true,
            token_biz: 'Hzx413nJJJ718snZVrqewwWW',
        };
        let statusCode: number;

        chargeService.getChargeTransaction(payload).subscribe(
            () => {
                done();
            },
            err => {
                statusCode = err.status;
                done();
            },
        );

        const chargeRequest = httpMock.expectOne(url);

        chargeRequest.error(new ErrorEvent('bad request'), { status: 404, statusText: 'bad request' });

        expect(chargeRequest.request.method).toBe('POST');
        expect(statusCode).toBe(404);
    });

    it('should have downloadQrCode function (Success case)', (done: jest.DoneCallback) => {
        const url = `${configService.getConfig().apiUrl}/user/download-ppcode`;
        const token_biz = 'Hzx413nJJJ718snZVrqewwWW';

        chargeService.downloadQrCode(token_biz).subscribe(() => done());

        const chargeRequest = httpMock.expectOne(url);

        chargeRequest.flush(new ArrayBuffer(999));

        expect(chargeRequest.request.method).toBe('POST');
    });

    it('should have downloadQrCode function (Error case)', (done: jest.DoneCallback) => {
        const url = `${configService.getConfig().apiUrl}/user/download-ppcode`;
        const token_biz = 'Hzx413nJJJ718snZVrqewwWW';
        let statusCode: number;

        chargeService.downloadQrCode(token_biz).subscribe(
            () => {
                done();
            },
            err => {
                statusCode = err.status;
                done();
            },
        );

        const chargeRequest = httpMock.expectOne(url);

        chargeRequest.error(new ErrorEvent('bad request'), { status: 404, statusText: 'bad request' });

        expect(chargeRequest.request.method).toBe('POST');
        expect(statusCode).toBe(404);
    });
});
