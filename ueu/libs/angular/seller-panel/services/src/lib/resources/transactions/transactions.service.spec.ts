import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { MockNotificationsService, NotificationsService } from '@picpay/angular/shared/core/notifications';
import { SellerAccessConfig } from '../../config/seller-access.config';

import { ReportFormat, ReportRequest } from '../../models';

import { TransactionsService } from './transactions.service';

describe('TransactionsService', () => {
    let transactionsService: TransactionsService;
    let configService: CoreDataAccessService<SellerAccessConfig>;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [
                TransactionsService,
                { provide: NotificationsService, useValue: new MockNotificationsService({ confirmed: true }) },
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'transactions.com' }),
                    },
                },
            ],
        });

        transactionsService = TestBed.inject(TransactionsService);
        configService = TestBed.inject(CoreDataAccessService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(transactionsService).toBeTruthy();
    });

    it('should have getTransactions funcion (Success case) with transactions', () => {
        const url = `${
            configService.getConfig().apiUrlSellerDash
        }/v1/transactions?sort=transaction_date&page=0&page_size=12`;

        transactionsService.getTransactions().subscribe();

        const transactionsRequest = httpMock.expectOne(url);

        transactionsRequest.flush({
            total: 1,
            data: [
                {
                    id: 123,
                    image: '/assets/images/avatar.svg',
                    date: '2021-02-05T16:40:40',
                    consumer: 'fulano',
                    seller: 'Unidade indisponível',
                    status: 'Completada',
                    status_id: 'check_circle_outline',
                    price: 2345,
                    details: {
                        username: 'fulano',
                        cpf_cnpj: '-',
                        date: '2021-02-05T16:40:40',
                        id_transaction: 123,
                        seller: 'Unidade indisponível',
                        id_seller: '-',
                        operator: '-',
                        price: 2345,
                    },
                    store_details: {},
                },
            ],
        });

        expect(transactionsRequest.request.method).toBe('GET');
    });

    it('should have getExternLinkTransactions funcion (Success case) with transactions', () => {
        const url = `${configService.getConfig().apiUrl}/v2/transactions/payment-checkout?page=0&page_size=12`;

        transactionsService.getExternLinkTransactions().subscribe();

        const transactionsRequest = httpMock.expectOne(url);

        transactionsRequest.flush({
            total: 1,
            data: [
                {
                    checkout: true,
                    consumer: 'felipe',
                    id: 546,
                    image: '/assets/images/avatar.svg',
                    price: 1.43,
                    seller: 'itambé',
                    status: 'Cancelada',
                    status_id: 'error_outline',
                    details: {
                        id_seller: 123,
                        id_transaction: 546,
                        username: 'ciclano',
                        transaction_date: {
                            date: '2021-04-29 16:32:45.000000',
                            timezone: 'America/Sao_Paulo',
                            timezone_type: 3,
                        },
                    },
                },
            ],
        });

        expect(transactionsRequest.request.method).toBe('GET');
    });

    it('should have getTransactions funcion (Success case) empty', () => {
        const url = `${
            configService.getConfig().apiUrlSellerDash
        }/v1/transactions?sort=transaction_date&page=0&page_size=12`;

        transactionsService.getTransactions().subscribe();

        const transactionsRequest = httpMock.expectOne(url);

        transactionsRequest.flush({
            total: 0,
            data: [],
        });

        expect(transactionsRequest.request.method).toBe('GET');
    });

    it('should have getTransactions funcion (Success case) no data', () => {
        const url = `${
            configService.getConfig().apiUrlSellerDash
        }/v1/transactions?sort=transaction_date&page=0&page_size=12`;

        transactionsService.getTransactions().subscribe();

        const transactionsRequest = httpMock.expectOne(url);

        transactionsRequest.flush({});

        expect(transactionsRequest.request.method).toBe('GET');
    });

    it('should have getTransactions funcion (Error case)', (done: jest.DoneCallback) => {
        const url = `${
            configService.getConfig().apiUrlSellerDash
        }/v1/transactions?sort=transaction_date&page=0&page_size=12`;
        let statusCode: number;

        transactionsService.getTransactions().subscribe(
            () => {
                done();
            },
            err => {
                statusCode = err.status;
                done();
            },
        );

        const transactionsRequest = httpMock.expectOne(url);

        transactionsRequest.error(new ErrorEvent('unauthorized'), { status: 404, statusText: 'bad request' });

        expect(transactionsRequest.request.method).toBe('GET');
        expect(statusCode).toBe(404);
    });

    it('should have cancelTransaction funcion (Success case)', (done: jest.DoneCallback) => {
        const url = `${configService.getConfig().apiUrl}/transactions/cancel`;

        transactionsService.cancelTransaction(123, 'myp@ssw0rd').subscribe(() => done());

        const transactionsRequest = httpMock.expectOne(url);

        transactionsRequest.flush({});

        expect(transactionsRequest.request.method).toBe('POST');
    });

    it('should have cancelTransaction external link funcion (Success case)', (done: jest.DoneCallback) => {
        const url = `${configService.getConfig().apiUrl}/v2/transactions/payment-checkout/cancel/123`;

        transactionsService.cancelExternalLinkTransaction(123, 'myp@ssw0rd').subscribe(() => done());

        const transactionsRequest = httpMock.expectOne(url);

        transactionsRequest.flush({});

        expect(transactionsRequest.request.method).toBe('POST');
    });

    it('should have cancelTransaction funcion (Error case)', (done: jest.DoneCallback) => {
        const url = `${configService.getConfig().apiUrl}/transactions/cancel`;
        let statusCode: number;

        transactionsService.cancelTransaction(123, 'myp@ssw0rd').subscribe(
            () => {
                done();
            },
            err => {
                statusCode = err.status;
                done();
            },
        );

        const transactionsRequest = httpMock.expectOne(url);

        transactionsRequest.error(new ErrorEvent('unauthorized'), { status: 404, statusText: 'bad request' });

        expect(transactionsRequest.request.method).toBe('POST');
        expect(statusCode).toBe(404);
    });

    it('should have exportTransactions funcion (Success case)', () => {
        const url = `${
            configService.getConfig().apiUrlSellerDash
        }/v1/reports/transactions?request_type=EMAIL&format_type=PDF`;

        transactionsService
            .exportTransactions({ request_type: ReportRequest.EMAIL, format_type: ReportFormat.PDF })
            .subscribe();

        const transactionsRequest = httpMock.expectOne(url);

        transactionsRequest.flush({ message: 'O download está sendo processado e será enviado por email.' });

        expect(transactionsRequest.request.method).toBe('GET');
    });

    it('should have exportTransactions funcion (Error case)', (done: jest.DoneCallback) => {
        const url = `${configService.getConfig().apiUrlSellerDash}/v1/reports/transactions`;
        let statusCode: number;
        transactionsService.exportTransactions().subscribe(
            () => {
                done();
            },
            err => {
                statusCode = err.status;
                done();
            },
        );

        const transactionsRequest = httpMock.expectOne(url);

        transactionsRequest.error(new ErrorEvent('unauthorized'), { status: 404, statusText: 'bad request' });

        expect(transactionsRequest.request.method).toBe('GET');
        expect(statusCode).toBe(404);
    });
});
