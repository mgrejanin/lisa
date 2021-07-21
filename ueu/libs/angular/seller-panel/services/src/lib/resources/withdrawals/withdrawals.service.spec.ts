import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

import { WithdrawalsService } from './withdrawals.service';

describe('WithdrawalsService', () => {
    let withdrawalsService: WithdrawalsService;
    let configService: CoreDataAccessService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule],
            providers: [
                WithdrawalsService,
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'withdrawals.com' }),
                    },
                },
            ],
        });

        withdrawalsService = TestBed.inject(WithdrawalsService);
        configService = TestBed.inject(CoreDataAccessService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(withdrawalsService).toBeTruthy();
    });

    it('should have autoWithdrawal function (Success case)', (done: jest.DoneCallback) => {
        const url = `${configService.getConfig().apiUrl}/v2/withdrawals/change`;

        withdrawalsService.autoWithdrawal(true).subscribe(() => done());

        const withdrawalsRequest = httpMock.expectOne(url);

        withdrawalsRequest.flush({});

        expect(withdrawalsRequest.request.method).toBe('POST');
        expect(withdrawalsRequest.request.body).toEqual({ auto_withdraw: true });
        expect(withdrawalsRequest.request.responseType).toBe('json');
    });

    it('should have autoWithdrawal function (Error case)', (done: jest.DoneCallback) => {
        const url = `${configService.getConfig().apiUrl}/v2/withdrawals/change`;
        let statusCode: number;

        withdrawalsService.autoWithdrawal(true).subscribe(
            () => {
                done();
            },
            err => {
                statusCode = err.status;
                done();
            },
        );

        const withdrawalsRequest = httpMock.expectOne(url);

        withdrawalsRequest.error(new ErrorEvent('unauthorized'), { status: 404, statusText: 'unauthorized' });

        expect(withdrawalsRequest.request.method).toBe('POST');
        expect(statusCode).toBe(404);
    });
});
