import { SellerListTransaction } from './transaction-list.model';

export interface TransactionResponse {
    total: number;
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: number;
    to: number;
    data: SellerListTransaction[];
}
