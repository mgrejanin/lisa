import { Account } from './account.model';

export interface InfoWithDrawal {
    primary_bank_account?: Account;
    automatic_bank_account?: boolean;
    future_releases?: number;
    balance_available?: number;
    blocked_balance: number;
    withdraw_fee: number;
    available_for_withdrawal?: number;
    has_seller_account: boolean;
    last_withdrawal?: {
        date: Date;
        status: string;
    };
}
