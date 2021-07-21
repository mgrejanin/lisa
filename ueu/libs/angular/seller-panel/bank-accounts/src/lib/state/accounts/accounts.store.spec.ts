import { AccountsStore } from './accounts.store';
import { Account } from '../../models';

const accountsMock: Account[] = [
    {
        id: 911775,
        type: {
            value: 'P',
            legal_nature: '',
        },
        operation: 'C',
        bank_id: '999',
        branch: '4234',
        branch_digit: null,
        account: '234234234234',
        account_digit: '2',
        main: false,
        document: '',
        account_error: 'erro na conta',
        bank: {
            id: '999',
            name: 'STONE PAGAMENTOS S.A',
            img_url: '/assets/icons/bank.svg',
            form_config: {
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
    {
        id: 911684,
        type: {
            value: 'Conta poupanca pessoa juridica',
            legal_nature: 'PJ',
        },
        operation: '003',
        bank_id: '104',
        branch: '3232',
        branch_digit: null,
        account: '232',
        account_digit: '3',
        main: true,
        document: '35521886000101',
        account_error: 'erro na conta',
        bank: {
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
    },
    {
        id: 911775,
        type: {
            value: 'P',
            legal_nature: '',
        },
        operation: 'C',
        bank_id: '999',
        branch: '4234',
        branch_digit: null,
        account: '234234234234',
        account_digit: '2',
        main: false,
        document: '',
        account_error: 'erro na conta',
        bank: {
            id: '999',
            name: 'STONE PAGAMENTOS S.A',
            img_url: '/assets/icons/bank.svg',
            form_config: {
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
    {
        id: 911684,
        type: {
            value: 'Conta poupanca pessoa juridica',
            legal_nature: 'PJ',
        },
        operation: '003',
        bank_id: '104',
        branch: '3232',
        branch_digit: null,
        account: '232',
        account_digit: '3',
        main: true,
        document: '35521886000101',
        account_error: 'erro na conta',
        bank: {
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
    },
];

describe('AccountsStore', () => {
    let store: AccountsStore;

    beforeEach(() => {
        store = new AccountsStore();

        store.updateAccounts([]);
    });

    it('should create an instance', () => {
        expect(store).toBeTruthy();
    });
    it('should have updateAccounts function', () => {
        const updateSpy = spyOn(store, 'update');

        store.updateAccounts(accountsMock);

        expect(updateSpy).toHaveBeenCalledWith({ accounts: accountsMock });
    });

    it('should have updateCurrentAccount function', () => {
        const updateSpy = spyOn(store, 'update');

        const currentAccountMock = store.getValue().accounts[0];

        store.updateCurrentAccount(currentAccountMock);

        expect(updateSpy).toHaveBeenCalledWith({ currentAccount: store.getValue().accounts[0] });
    });

    it('should have updatePrincipalAccountById function', () => {
        const accountIdMock = 911775;
        const updateSpy = spyOn(store, 'updateAccounts');

        store.updatePrincipalAccountById(accountIdMock);

        expect(updateSpy).toHaveBeenCalled();
    });

    it('should have removeAccountById function', () => {
        const accountIdMock = 911775;
        const updateSpy = spyOn(store, 'updateAccounts');

        store.removeAccountById(accountIdMock);

        expect(updateSpy).toHaveBeenCalled();
    });

    it('should have addAccount function', () => {
        const accountMock = accountsMock[0];
        const updateSpy = spyOn(store, 'update');

        store.addAccount(accountMock);

        expect(updateSpy).toHaveBeenCalledWith({
            accounts: [accountsMock[0], ...store.getValue().accounts],
        });
    });

    it('should have updateAccount function', () => {
        const accountMock = {
            ...accountsMock[0],
            account: '753578',
            account_digit: '3',
        };

        const updateSpy = spyOn(store, 'update');

        store.updateAccount(accountMock);

        expect(updateSpy).toHaveBeenCalled();
    });
});
