import { Account, CheckAccountError } from '../../../models';

import { Observable, of } from 'rxjs';

export class AccountsServiceMock {
    checkAccounts() {
        return of<CheckAccountError>({
            bank_account_id: 1234,
            validation_issue: {
                message: 'Message test',
                reason: 'Teste reason',
                action: {
                    message: 'Action message',
                    deep_link: 'deep-link.com',
                },
            },
        });
    }

    getAccounts(): Observable<Account[]> {
        return of<Account[]>([
            {
                id: 48,
                type: {
                    value: 'C',
                    legal_nature: 'PJ',
                },
                operation: '',
                bank_id: '999',
                branch: '00010',
                branch_digit: null,
                account: '3593590',
                account_digit: '5',
                main: false,
                document: '21089691000111',
                bank: {
                    id: '999',
                    name: 'STONE PAGAMENTOS S.A',
                    img_url: 'https://s3-sa-east-1.amazonaws.com/picpay/banks/ico_cadastro_stone.png',
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
        ]);
    }
}
