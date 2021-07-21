import { SellerUser } from '@picpay/seller-panel/helpers';

import { StoresResponse } from './stores-response.model';
import { TransactionsOperators } from './transaction-operators.model';
import { TransactionStatusIDName } from './transaction-status-name.enum';

export interface TransactionFilters {
    email?: string;
    ids?: string;
    q?: string;
    date_init?: string;
    date_end?: string;
    type?: SellerUser;
    sort?: string;
    page?: number;
    page_size?: number;
    search?: string;
    period?: number;
    consumer_id?: string;
    operator_ids?: TransactionsOperators[];
    store_ids?: StoresResponse[];
    status?: TransactionStatusIDName;
    value_transaction_init?: string;
    value_transaction_end?: string;
    value_seller_init?: string;
    value_seller_end?: string;
    release_date_init?: string;
    release_date_end?: string;
    date_range?: number;
}
