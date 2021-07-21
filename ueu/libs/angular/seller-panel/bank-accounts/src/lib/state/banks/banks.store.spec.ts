import { BanksStore } from './banks.store';
import { Bank } from '../../models';

describe('BanksStore', () => {
    let store: BanksStore;

    beforeEach(() => {
        store = new BanksStore();
    });

    it('should create an instance', () => {
        expect(store).toBeTruthy();
    });

    it('should have updateSelectedBank function', () => {
        const updateSpy = spyOn(store, 'update');

        const selectedBankMock: Bank = {
            id: '104',
            name: 'CAIXA ECONOMICA FEDERAL',
            img_url: 'https://s3-sa-east-1.amazonaws.com/picpay/banks/ico_cadastro_caixa.png',
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
        };

        store.updateSelectedBank(selectedBankMock);

        expect(updateSpy).toHaveBeenCalledWith({ selectedBank: selectedBankMock });
    });
});
