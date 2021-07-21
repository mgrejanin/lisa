import { Bank } from './bank.model';

export interface Account {
    id?: number;
    bank?: Bank;
    bank_id?: string;
    branch?: string;
    branch_digit?: string;
    account?: string;
    account_digit?: string;
    document?: string;
    type?: AccountType;
    operation?: string;
    main?: boolean;
    account_error?: string;
}

export interface AccountType {
    label?: string;
    value: string;
    legal_nature: string;
}
