import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Account } from '../../models/account.model';
import { SellerAccessConfig } from '@picpay/seller-panel/seller-access';
import { SellerStore } from '@picpay/seller-panel/services';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { MockNotificationsService, NotificationsService } from '@picpay/angular/shared/core/notifications';

import { AccountsService } from './accounts.service';
import { AccountsStore } from './accounts.store';

describe('AccountsService', () => {
    let accountsService: AccountsService;
    let accountsStore: AccountsStore;
    let sellerStore: SellerStore;

    let configService: CoreDataAccessService<SellerAccessConfig>;
    let notificationService: NotificationsService;

    let httpMock: HttpTestingController;

    const bankAccountMock: Account = {
        id: 911653,
        type: {
            value: 'P',
            legal_nature: 'PJ',
        },
        operation: 'Tes',
        bank_id: '123',
        branch: '0000',
        branch_digit: '00',
        account: '000000',
        account_digit: '00',
        main: true,
        bank: {
            id: '123',
            name: 'SCFI AGIPLAN',
            img_url: null,
            form_config: {
                account_digit_limit: 1,
                account_digit_type: 'number',
                account_limit: 12,
                branch_digit_enabled: false,
                branch_digit_limit: 1,
                branch_digit_type: 'number',
                branch_limit: 4,
            },
        },
        account_error: 'conta com erro',
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AccountsService,
                AccountsStore,
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com' }),
                    },
                },
                {
                    provide: NotificationsService,
                    useValue: new MockNotificationsService({ confirmed: true }),
                },
            ],
            imports: [HttpClientTestingModule, RouterTestingModule],
        });

        accountsService = TestBed.inject(AccountsService);
        accountsStore = TestBed.inject(AccountsStore);

        configService = TestBed.inject(CoreDataAccessService);
        notificationService = TestBed.inject(NotificationsService);

        httpMock = TestBed.inject(HttpTestingController);
        sellerStore = TestBed.inject(SellerStore);

        sellerStore.update({ organization: { id: 1, cpfCnpj: '0000000000000' } });
    });

    it('should be created', () => {
        expect(accountsService).toBeDefined();
    });

    it('should have clearAccountsStore function', () => {
        const storeSpy = spyOn(accountsStore, 'reset');
        accountsService.clearAccountsStore();

        expect(storeSpy).toHaveBeenCalled();
    });

    it('should have setCurrentAccount function', () => {
        const storeSpy = spyOn(accountsStore, 'update');

        accountsService.setCurrentAccount({});

        expect(storeSpy).toHaveBeenCalledWith({ currentAccount: {} });
    });

    it('should have clearCurrentAccount function', () => {
        const storeSpy = spyOn(accountsStore, 'update');

        accountsService.clearCurrentAccount();

        expect(storeSpy).toHaveBeenCalled();
    });

    it('should have a setAccountAsPrincipal function', () => {
        const accountIdMock = 911775;
        const expectedUrl = `${configService.getConfig().apiUrl}/banks/accounts/isprimary/${accountIdMock}`;
        accountsService.setAccountAsPrincipal(accountIdMock).subscribe();

        const requestAccount = httpMock.expectOne(expectedUrl);

        requestAccount.flush(null);

        expect(requestAccount.request.method).toBe('PUT');
    });

    it('should have toggleError function', () => {
        const accountsStoreSpy = spyOn(accountsStore, 'update');

        accountsService.toggleError(true);

        expect(accountsStoreSpy).toHaveBeenCalledWith({ hasError: true });
    });

    it('should have addAccount function', () => {
        const addAccountSpy = spyOn(accountsStore, 'addAccount');
        const updatePrincipalAccountByIdSpy = spyOn(accountsStore, 'updatePrincipalAccountById');

        accountsService.addAccount(bankAccountMock);

        expect(addAccountSpy).toHaveBeenCalledWith(bankAccountMock);
        expect(updatePrincipalAccountByIdSpy).toHaveBeenCalledWith(bankAccountMock.id);
    });

    it('should have updateAccount function', () => {
        const updateAccountSpy = spyOn(accountsStore, 'updateAccount');
        const updatePrincipalAccountByIdSpy = spyOn(accountsStore, 'updatePrincipalAccountById');

        accountsService.updateAccount(bankAccountMock);

        expect(updateAccountSpy).toHaveBeenCalledWith(bankAccountMock);
        expect(updatePrincipalAccountByIdSpy).toHaveBeenCalledWith(bankAccountMock.id);
    });

    it('should have a getAccounts function (Success case)', (done: jest.DoneCallback) => {
        const expectedUrl = `${configService.getConfig().apiUrl}/v2/banks/accounts`;
        const accountsStoreSpy = spyOn(accountsStore, 'update');

        accountsService.getAccounts().subscribe(() => {
            done();
            expect(accountsStoreSpy).toHaveBeenCalledWith({ isLoading: false, isError: false });
        });

        const requestAccount = httpMock.expectOne(expectedUrl);

        requestAccount.flush({
            meta: {
                code: 123,
            },
            data: { id: 10 },
        });

        expect(requestAccount.request.method).toBe('GET');
    });

    it('should have a getAccounts function (Error case)', (done: jest.DoneCallback) => {
        const expectedUrl = `${configService.getConfig().apiUrl}/v2/banks/accounts`;
        const accountsStoreSpy = spyOn(accountsStore, 'update');
        let statusCode: number;

        accountsService.getAccounts().subscribe(
            () => done(),
            err => {
                statusCode = err.status;
                done();
                expect(accountsStoreSpy).toHaveBeenCalledWith({ isLoading: false, isError: true });
            },
        );

        const requestAccount = httpMock.expectOne(expectedUrl);

        requestAccount.error(new ErrorEvent('Internal server error'), {
            status: 500,
            statusText: 'Internal server error',
        });

        expect(requestAccount.request.method).toBe('GET');
        expect(statusCode).toBe(500);
    });

    it('should have a createAccount function (Success case)', () => {
        const expectedUrl = `${configService.getConfig().apiUrl}/v2/banks/accounts`;

        accountsService.createAccount({}).subscribe();

        const requestAccount = httpMock.expectOne(expectedUrl);
        requestAccount.flush(null);

        expect(requestAccount.request.method).toBe('POST');
    });

    it('should have a createAccount function (Error case)', (done: jest.DoneCallback) => {
        const expectedUrl = `${configService.getConfig().apiUrl}/v2/banks/accounts`;
        const accountsStoreSpy = spyOn(accountsStore, 'update');
        let statusCode: number;

        accountsService.createAccount({}).subscribe(
            () => done(),
            err => {
                statusCode = err.status;
                done();
                expect(accountsStoreSpy).toHaveBeenCalledWith({ isLoading: false, isError: true });
            },
        );

        const requestAccount = httpMock.expectOne(expectedUrl);

        requestAccount.error(new ErrorEvent('Internal server error'), {
            status: 500,
            statusText: 'Internal server error',
        });

        expect(requestAccount.request.method).toBe('POST');
        expect(statusCode).toBe(500);
    });

    it('should have a editAccount function (Success case)', () => {
        const accountIdMock = 911775;
        const expectedUrl = `${configService.getConfig().apiUrl}/v2/banks/accounts/${accountIdMock}`;

        accountsService.editAccount(accountIdMock, {}).subscribe();

        const request = httpMock.expectOne(expectedUrl);
        request.flush(null);

        expect(request.request.method).toBe('PUT');
    });

    it('should have a editAccount function (Error case)', (done: jest.DoneCallback) => {
        const accountIdMock = 911775;
        const expectedUrl = `${configService.getConfig().apiUrl}/v2/banks/accounts/${accountIdMock}`;
        const accountsStoreSpy = spyOn(accountsStore, 'update');
        let statusCode: number;

        accountsService.editAccount(accountIdMock, {}).subscribe(
            () => done(),
            err => {
                statusCode = err.status;
                done();
                expect(accountsStoreSpy).toHaveBeenCalledWith({ isLoading: false, isError: true });
            },
        );

        const requestAccount = httpMock.expectOne(expectedUrl);

        requestAccount.error(new ErrorEvent('Internal server error'), {
            status: 500,
            statusText: 'Internal server error',
        });

        expect(requestAccount.request.method).toBe('PUT');
        expect(statusCode).toBe(500);
    });

    it('should have a removeAccount function (Success case)', (done: jest.DoneCallback) => {
        const accountIdMock = 10;
        const expectedUrl = `${configService.getConfig().apiUrl}/v2/banks/accounts/${accountIdMock}`;
        const removeAccountByIdSpy = spyOn(accountsStore, 'removeAccountById');
        const notificationServiceSpy = spyOn(notificationService, 'openSnackbar');
        const accountsStoreSpy = spyOn(accountsStore, 'update');

        accountsService.removeAccount(accountIdMock).subscribe(() => {
            done();

            expect(removeAccountByIdSpy).toHaveBeenCalledWith(10);
            expect(notificationServiceSpy).toHaveBeenCalledWith('Excluir conta', 'A conta foi excluída com sucesso!');
            expect(accountsStoreSpy).toHaveBeenCalledWith({ isLoading: false, isError: false });
        });

        const requestAccount = httpMock.expectOne(expectedUrl);

        requestAccount.flush({
            meta: {
                code: 123,
            },
            data: { id: 10 },
        });

        expect(requestAccount.request.method).toBe('DELETE');
    });

    it('should have a removeAccount function (Error case)', (done: jest.DoneCallback) => {
        const accountIdMock = 10;
        const expectedUrl = `${configService.getConfig().apiUrl}/v2/banks/accounts/${accountIdMock}`;
        const accountsStoreSpy = spyOn(accountsStore, 'update');
        let statusCode: number;

        accountsService.removeAccount(accountIdMock).subscribe(
            () => done(),
            err => {
                statusCode = err.status;
                done();
                expect(accountsStoreSpy).toHaveBeenCalledWith({ isLoading: false, isError: true });
            },
        );

        const requestAccount = httpMock.expectOne(expectedUrl);

        requestAccount.error(new ErrorEvent('Internal server error'), {
            status: 500,
            statusText: 'Internal server error',
        });

        expect(requestAccount.request.method).toBe('DELETE');
        expect(statusCode).toBe(500);
    });

    it('should have a checkAccount function (Success case)', (done: jest.DoneCallback) => {
        const expectedUrl = `${configService.getConfig().apiUrl}/banks/accounts/check`;

        accountsService.checkAccounts().subscribe(() => done());

        const requestAccount = httpMock.expectOne(expectedUrl);
        requestAccount.flush(null);

        expect(requestAccount.request.method).toBe('GET');
    });

    it('should have a checkAccount function (Error case)', (done: jest.DoneCallback) => {
        const expectedUrl = `${configService.getConfig().apiUrl}/banks/accounts/check`;
        let statusCode: number;

        accountsService.checkAccounts().subscribe(
            () => done(),
            err => {
                done();
                statusCode = err.status;
            },
        );

        const requestAccount = httpMock.expectOne(expectedUrl);
        requestAccount.error(new ErrorEvent('Internal server error'), {
            status: 500,
            statusText: 'Internal server error',
        });

        expect(requestAccount.request.method).toBe('GET');
        expect(statusCode).toBe(500);
    });

    it('should have a checkLockAccounts function (Success case)', (done: jest.DoneCallback) => {
        const expectedUrl = `${configService.getConfig().apiUrl}/bank-residence/check-lock/0000000000000`;

        accountsService.checkLockAccounts().subscribe(() => done());

        const request = httpMock.expectOne(expectedUrl);
        request.flush({
            lock_is_enabled: true,
        });

        expect(request.request.method).toBe('GET');
    });

    it('should have a checkLockAccounts function (Error case)', (done: jest.DoneCallback) => {
        const expectedUrl = `${configService.getConfig().apiUrl}/bank-residence/check-lock/0000000000000`;
        let statusCode: number;

        accountsService.checkLockAccounts().subscribe(
            () => {
                done();
            },
            err => {
                done();
                statusCode = err.status;
            },
        );

        const request = httpMock.expectOne(expectedUrl);
        request.error(new ErrorEvent('Not Found'), {
            status: 404,
            statusText: 'Not Found',
        });

        expect(request.request.method).toBe('GET');
        expect(statusCode).toBe(404);
    });

    it('should have a unlockAccounts function (Success case)', (done: jest.DoneCallback) => {
        const expectedUrl = `${configService.getConfig().apiUrl}/bank-residence/residence-unlock/0000000000000`;

        accountsService.unlockAccounts().subscribe(() => done());

        const request = httpMock.expectOne(expectedUrl);
        request.flush({
            success: true,
        });

        expect(request.request.method).toBe('POST');
    });

    it('should have a unlockAccounts function (Error case)', (done: jest.DoneCallback) => {
        const expectedUrl = `${configService.getConfig().apiUrl}/bank-residence/residence-unlock/0000000000000`;
        let statusCode: number;

        accountsService.unlockAccounts().subscribe(
            () => {
                done();
            },
            err => {
                done();
                statusCode = err.status;
            },
        );

        const request = httpMock.expectOne(expectedUrl);
        request.error(new ErrorEvent('Bad Request'), {
            status: 400,
            statusText: 'Bad Request',
        });

        expect(request.request.method).toBe('POST');
        expect(statusCode).toBe(400);
    });
});
