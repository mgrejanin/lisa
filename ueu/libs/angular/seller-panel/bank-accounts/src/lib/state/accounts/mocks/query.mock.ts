import { Account } from '../../../models';

import { Observable, of } from 'rxjs';

export const currentAccountMock: Account = {
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
};

export class AccountsQueryMock {
    readonly isLoading$: Observable<boolean>;
    readonly hasError$: Observable<boolean>;
    readonly accounts$: Observable<Account[]>;
    readonly currentAccount$: Observable<Account>;
    readonly hasHangsAccount$: Observable<boolean>;

    constructor() {
        this.accounts$ = of([
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
            {
                id: 49,
                type: {
                    value: 'C',
                    legal_nature: 'PJ',
                },
                operation: '',
                bank_id: '333',
                branch: '33333',
                branch_digit: null,
                account: '343434',
                account_digit: '5',
                main: false,
                document: '21089691000333',
                bank: {
                    id: '333',
                    name: 'ALAKASAN S.A',
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
        this.currentAccount$ = of({
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
        });
        this.isLoading$ = of(false);
        this.hasError$ = of(false);
        this.isLoading$ = of(false);
        this.hasHangsAccount$ = of(false);
    }

    // getValue() {

    // }
}
