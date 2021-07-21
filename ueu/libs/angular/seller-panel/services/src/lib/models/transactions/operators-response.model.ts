import { TransactionsOperators } from './transaction-operators.model';

export interface OperatorsResponse {
    meta: {
        code: number;
    };
    data: {
        list: TransactionsOperators[];
    };
}
