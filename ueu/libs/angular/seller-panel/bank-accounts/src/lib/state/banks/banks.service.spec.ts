import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BanksService } from './banks.service';
import { BanksStore } from './banks.store';

import { SellerAccessConfig } from '@picpay/seller-panel/seller-access';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { Bank } from '../../models';

describe('BanksService', () => {
    let banksService: BanksService;
    let banksStore: BanksStore;
    let banksMock: Bank[];
    let selectedBankMock: Bank;

    let configService: CoreDataAccessService<SellerAccessConfig>;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                BanksService,
                BanksStore,
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com' }),
                    },
                },
            ],
            imports: [HttpClientTestingModule, RouterTestingModule],
        });

        banksService = TestBed.inject(BanksService);
        banksStore = TestBed.inject(BanksStore);

        banksMock = [
            {
                id: '104',
                name: 'CAIXA ECONOMICA FEDERAL',
                img_url: '/assets/icons/bank.svg',
                form_config: {
                    account_limit: 12,
                    account_types: [
                        {
                            label: 'Conta corrente pessoa física - 001',
                            value: '001',
                            legal_nature: 'PF',
                        },
                        {
                            label: 'Conta corrente pessoa jurídica - 003',
                            value: '003',
                            legal_nature: 'PJ',
                        },
                        {
                            label: 'Conta poupança pessoa física - 013',
                            value: '013',
                            legal_nature: 'PF',
                        },
                        {
                            label: 'Conta poupança pessoa jurídica - 022',
                            value: '022',
                            legal_nature: 'PJ',
                        },
                        {
                            label: 'Conta Caixa Fácil - 023',
                            value: '023',
                            legal_nature: 'PF',
                        },
                    ],
                    branch_limit: 4,
                },
            },
            {
                id: '001',
                name: 'BANCO DO BRASIL',
                img_url: 'https://s3-sa-east-1.amazonaws.com/picpay/banks/ico_cadastro_bb.png',
                form_config: {
                    type: 'banco_do_brasil',
                    branch_limit: 4,
                    account_limit: 6,
                    branch_digit_limit: 1,
                    branch_digit_type: 'alpha',
                    account_digit_type: 'alpha',
                    branch_digit_enabled: true,
                    account_types: [
                        {
                            label: 'Conta corrente pessoa física - 001',
                            value: '001',
                            legal_nature: 'PF',
                        },
                        {
                            label: 'Conta corrente pessoa jurídica - 003',
                            value: '003',
                            legal_nature: 'PJ',
                        },
                        {
                            label: 'Conta poupança pessoa física - 013',
                            value: '013',
                            legal_nature: 'PF',
                        },
                        {
                            label: 'Conta poupança pessoa jurídica - 022',
                            value: '022',
                            legal_nature: 'PJ',
                        },
                        {
                            label: 'Conta Caixa Fácil - 023',
                            value: '023',
                            legal_nature: 'PF',
                        },
                    ],
                },
            },
        ];
        selectedBankMock = banksMock[0];

        banksStore.update({ banks: banksMock });
        banksStore.updateSelectedBank(selectedBankMock);

        configService = TestBed.inject(CoreDataAccessService);

        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(banksService).toBeDefined();
    });

    it('should have setSelectedBank function', () => {
        const storeSpy = spyOn(banksStore, 'update');

        banksService.setSelectedBank(selectedBankMock);

        expect(storeSpy).toHaveBeenCalledWith({
            selectedBank: {
                id: '104',
                name: 'CAIXA ECONOMICA FEDERAL',
                img_url: '/assets/icons/bank.svg',
                form_config: {
                    account_limit: 12,
                    account_types: [
                        {
                            label: 'Conta corrente pessoa física - 001',
                            value: '001',
                            legal_nature: 'PF',
                        },
                        {
                            label: 'Conta corrente pessoa jurídica - 003',
                            value: '003',
                            legal_nature: 'PJ',
                        },
                        {
                            label: 'Conta poupança pessoa física - 013',
                            value: '013',
                            legal_nature: 'PF',
                        },
                        {
                            label: 'Conta poupança pessoa jurídica - 022',
                            value: '022',
                            legal_nature: 'PJ',
                        },
                        {
                            label: 'Conta Caixa Fácil - 023',
                            value: '023',
                            legal_nature: 'PF',
                        },
                    ],
                    branch_limit: 4,
                },
            },
        });
    });

    it('should have clearSelectedBank function', () => {
        const storeSpy = spyOn(banksStore, 'update');

        banksService.clearSelectedBank();

        expect(storeSpy).toHaveBeenCalledWith({ selectedBank: {} });
    });

    it('should have getBankByQuery function', () => {
        expect(banksService.getBankByQuery('104')).toEqual({
            id: '104',
            name: 'CAIXA ECONOMICA FEDERAL',
            img_url: '/assets/icons/bank.svg',
            form_config: {
                account_limit: 12,
                account_types: [
                    {
                        label: 'Conta corrente pessoa física - 001',
                        value: '001',
                        legal_nature: 'PF',
                    },
                    {
                        label: 'Conta corrente pessoa jurídica - 003',
                        value: '003',
                        legal_nature: 'PJ',
                    },
                    {
                        label: 'Conta poupança pessoa física - 013',
                        value: '013',
                        legal_nature: 'PF',
                    },
                    {
                        label: 'Conta poupança pessoa jurídica - 022',
                        value: '022',
                        legal_nature: 'PJ',
                    },
                    {
                        label: 'Conta Caixa Fácil - 023',
                        value: '023',
                        legal_nature: 'PF',
                    },
                ],
                branch_limit: 4,
            },
        });
    });

    it('should have getBanks function (Success case)', (done: jest.DoneCallback) => {
        const expectedUrl = `${configService.getConfig().apiUrl}/v2/banks?search=&preferred=1`;

        banksService.getBanks().subscribe(() => done());

        const request = httpMock.expectOne(expectedUrl);
        request.flush(null);

        expect(request.request.method).toBe('GET');
    });

    it('should have getBanks function (Error case)', (done: jest.DoneCallback) => {
        const expectedUrl = `${configService.getConfig().apiUrl}/v2/banks?search=&preferred=1`;
        let statusCode: number;
        banksService.getBanks().subscribe(
            () => done(),
            err => {
                done();
                statusCode = err.status;
            },
        );

        const requestBanks = httpMock.expectOne(expectedUrl);
        requestBanks.error(new ErrorEvent('Internal server error'), {
            status: 500,
            statusText: 'Internal server error',
        });

        expect(requestBanks.request.method).toBe('GET');
        expect(statusCode).toBe(500);
    });

    it('should have clearBanksStore function', () => {
        const resetSpy = spyOn(banksStore, 'reset');

        banksService.clearBanksStore();

        expect(resetSpy).toHaveBeenCalled();
    });
});
