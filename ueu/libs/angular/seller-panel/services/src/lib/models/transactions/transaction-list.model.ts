import { Consumer } from './consumer.model';
import { SellerTransaction } from './transaction-seller.model';
import { TransactionStore } from './transaction-store.model';
import { Details } from './transactions-details.model';

export interface SellerListTransaction {
    id: number;
    consumer?: Consumer;
    operator?: string;
    reference_id?: string;
    release_date: string | Date;
    score_clearsale?: number;
    score_siftscience?: number;
    seller: SellerTransaction;
    seller_id: number;
    status_id: string;
    status: string;
    transaction_date: string | Date;
    transaction_refund?: number;
    type?: number;
    type_name?: string;
    value_credit_card?: number;
    value_fee?: number;
    value_fee_percent?: number;
    value_seller?: number;
    value_transaction?: number;
    store?: TransactionStore;
    checkout?: boolean;
    details?: Details;
    consumer_name?: string;
}
