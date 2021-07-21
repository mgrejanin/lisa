export interface Bank {
    id?: string;
    name?: string;
    img_url?: string;
    form_config?: BankConfig;
}

export interface BankConfig {
    account_limit?: number;
    account_digit_limit?: number;
    account_digit_type?: string;
    account_types?: BankAccountType[];
    branch_limit?: number;
    branch_digit_limit?: number;
    branch_digit_type?: string;
    branch_digit_enabled?: boolean;
    send_operation?: string;
    type?: string;
}

export interface BankAccountType {
    label: string;
    value: string;
    legal_nature?: string; // PJ || PF
}
