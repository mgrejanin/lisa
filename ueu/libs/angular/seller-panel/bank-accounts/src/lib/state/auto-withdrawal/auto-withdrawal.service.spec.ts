import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SellerAccessConfig } from '@picpay/seller-panel/seller-access';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { AutoWithdrawalService } from './auto-withdrawal.service';
import { AutoWithdrawalStore } from './auto-withdrawal.store';
import { InfoWithDrawal } from '../../models';

describe('AutoWithdrawalService', () => {
    let autoWithdrawalService: AutoWithdrawalService;
    let autoWithdrawalStore: AutoWithdrawalStore;
    let configService: CoreDataAccessService<SellerAccessConfig>;
    let httpMock: HttpTestingController;

    const body = {
        ip: '127.0.0.1',
        bankAccountId: 27,
        value: 10.0,
        confirm: true,
    };

    const responseInfoMock: InfoWithDrawal = {
        primary_bank_account: {
            id: 49,
            type: {
                value: 'C',
                legal_nature: 'PJ',
            },
            operation: '',
            bank_id: '756',
            branch: '345357',
            branch_digit: null,
            account: '4467810',
            account_digit: '12',
            main: true,
            document: '21089691000111',
            bank: {
                id: '756',
                name: 'BANCO COOPERATIVO DO BRASIL',
                img_url: 'https://s3-sa-east-1.amazonaws.com/picpay/banks/ico_cadastro_sicoob.png',
                form_config: {
                    account_limit: null,
                    branch_limit: null,
                    branch_digit_enabled: null,
                    branch_digit_type: null,
                    account_digit_type: null,
                    account_types: [
                        {
                            label: 'Conta corrente pessoa física',
                            value: 'C',
                            legal_nature: 'PF',
                        },
                        {
                            label: 'Conta corrente pessoa jurídica',
                            value: 'C',
                            legal_nature: 'PJ',
                        },
                        {
                            label: 'Conta poupança pessoa física',
                            value: 'P',
                            legal_nature: 'PF',
                        },
                        {
                            label: 'Conta poupança pessoa jurídica',
                            value: 'P',
                            legal_nature: 'PJ',
                        },
                    ],
                },
            },
        },
        automatic_bank_account: true,
        future_releases: 1154.48,
        balance_available: 10900,
        blocked_balance: 0,
        withdraw_fee: 0,
        available_for_withdrawal: 10900,
        has_seller_account: true,
        last_withdrawal: null,
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule],
            providers: [
                AutoWithdrawalService,
                AutoWithdrawalStore,
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'withdrawals.com' }),
                    },
                },
            ],
        });

        autoWithdrawalService = TestBed.inject(AutoWithdrawalService);
        autoWithdrawalStore = TestBed.inject(AutoWithdrawalStore);
        configService = TestBed.inject(CoreDataAccessService);

        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(autoWithdrawalService).toBeTruthy();
    });

    it('should validate request getWithdrawalInfo (success)', () => {
        const expectedUrl = `${configService.getConfig().apiUrl}/v2/withdrawals/informations`;
        const storeUpdateSpy = spyOn(autoWithdrawalStore, 'update');

        autoWithdrawalService.getWithdrawalInfo();

        const withdrawalsRequest = httpMock.expectOne(expectedUrl);

        withdrawalsRequest.flush(responseInfoMock);

        expect(storeUpdateSpy.calls.count()).toBe(2);
        expect(storeUpdateSpy.calls.argsFor(0)).toEqual([{ isLoading: true, isError: false }]);
        expect(storeUpdateSpy.calls.argsFor(1)).toEqual([{ infoWithdrawal: responseInfoMock, isLoading: false }]);
        expect(withdrawalsRequest.request.method).toBe('GET');
        expect(withdrawalsRequest.request.url).toEqual('withdrawals.com/v2/withdrawals/informations');
        expect(withdrawalsRequest.request.responseType).toBe('json');
    });

    it('should validate request getWithdrawalInfo (error)', () => {
        const expectedUrl = `${configService.getConfig().apiUrl}/v2/withdrawals/informations`;
        const storeUpdateSpy = spyOn(autoWithdrawalStore, 'update');

        autoWithdrawalService.getWithdrawalInfo();

        const withdrawalsRequest = httpMock.expectOne(expectedUrl);

        const mockError = new ErrorEvent('mock', {});
        withdrawalsRequest.error(mockError);

        expect(storeUpdateSpy.calls.count()).toBe(2);
        expect(storeUpdateSpy.calls.argsFor(0)).toEqual([{ isLoading: true, isError: false }]);
        expect(storeUpdateSpy.calls.argsFor(1)).toEqual([{ isLoading: false, isError: true }]);
        expect(withdrawalsRequest.request.method).toBe('GET');
        expect(withdrawalsRequest.request.url).toEqual('withdrawals.com/v2/withdrawals/informations');
        expect(withdrawalsRequest.request.responseType).toBe('json');
    });

    it('should validate request newWithdrawal (success)', () => {
        const expectedUrl = `${configService.getConfig().apiUrl}/withdrawals`;

        autoWithdrawalService.newWithdrawal(body).subscribe();

        const withdrawalsRequest = httpMock.expectOne(expectedUrl);

        withdrawalsRequest.flush({});

        expect(withdrawalsRequest.request.method).toBe('POST');
        expect(withdrawalsRequest.request.url).toEqual('withdrawals.com/withdrawals');
        expect(withdrawalsRequest.request.responseType).toBe('json');
    });

    it('should validate request newWithdrawal (error)', () => {
        const expectedUrl = `${configService.getConfig().apiUrl}/withdrawals`;
        const storeUpdateSpy = spyOn(autoWithdrawalStore, 'update');

        autoWithdrawalService.newWithdrawal(body).subscribe();

        const withdrawalsRequest = httpMock.expectOne(expectedUrl);

        const mockError = new ErrorEvent('mock', {});
        withdrawalsRequest.error(mockError);

        expect(storeUpdateSpy.calls.count()).toBe(2);
        expect(storeUpdateSpy.calls.argsFor(0)).toEqual([{ isLoading: true, isError: false }]);
        expect(storeUpdateSpy.calls.argsFor(1)).toEqual([{ isLoading: false, isError: true }]);
        expect(withdrawalsRequest.request.method).toBe('POST');
        expect(withdrawalsRequest.request.url).toEqual('withdrawals.com/withdrawals');
        expect(withdrawalsRequest.request.responseType).toBe('json');
    });

    it('should have updateCheck function', () => {
        const storeSpy = spyOn(autoWithdrawalStore, 'update').and.callThrough();

        autoWithdrawalService.updateCheck(true);

        expect(storeSpy).toHaveBeenCalledTimes(1);
    });
});
