export interface RechargeUpdate {
    data: {
        bank_id?: string;
        bank_statement_id?: number;
        comments?: string[];
        consumer_id?: number;
        created_automatically?: boolean;
        id_counter?: number;
        lock_completion?: boolean;
        recharge_method_type_id?: number;
        request_date?: string;
        status_id?: string;
        updated_at?: string;
        value?: number;
        _id?: string;
    };
}
