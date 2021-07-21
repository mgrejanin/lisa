import { TransactionStore } from './transaction-store.model';

export interface TransactionTable {
    image: string;
    transaction_date: string;
    consumer: string;
    id: number;
    seller: string;
    status: string;
    status_id: string;
    price: number;
    details: {
        username: string;
        cpf_cnpj: string;
        transaction_date: string;
        id_transaction: number;
        seller: string;
        id_seller: number;
        operator: string;
        price: number;
    };
    store_details?: TransactionStore;
    checkout: boolean;
}
