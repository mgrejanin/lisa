import { BankAccount } from './bank-account.model';
import { Bank } from './bank.model';
import { Consumer } from './consumer.model';

export interface RechargeData {
    id: string;
    id_counter: number;
    consumer_id: number;
    value: number;
    status_id: string;
    request_date: string;
    completion_date?: string;
    recharge_method_type_id: number;
    bank_id?: string;
    verified_by?: string;
    recharge_deposit_proof?: string;
    comments?: string[];
    description?: string;
    boleto_nosso_numero?: number;
    registrado_por?: number;
    value_srt: string;
    request_date_str: string;
    completion_date_str?: string;
    url?: string;
    code?: string;
    instructions?: string;
    transaction_id?: number;
    risk_allowed: boolean;
    risk_reason_number: number;
    risk_reason_description?: string;
    created_credit_seller?: string;
    created_credit_consumer?: string;
    acquirer_name?: string;
    acquirer_lr?: string;
    lock_completion?: boolean;
    pending_completion_flag?: boolean;
    set_pending_completion_flag_date?: boolean;
    total_value?: number;
    service_charge?: number;
    device_os?: string;
    app_version?: string;
    consumer: Consumer;
    bankAccount?: BankAccount;
    bank: Bank;
    recharge_method_name?: string;
    status_name: string;
}
