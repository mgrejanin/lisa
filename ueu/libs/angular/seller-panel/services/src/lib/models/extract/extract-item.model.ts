export interface ExtractItem {
    header: {
        date: string;
        balance: number;
        blocked_balance?: number;
    };
    itens: ExtractRow[];
}

export interface ExtractRow {
    title?: string;
    description?: string;
    type_item?: 'input' | 'output';
    value?: number;
    type_transaction?: string;
    status?: string;
    day?: string;
    fee?: number;
    receipt?: Receipt;
}

export interface Receipt {
    header: {
        date: Date;
        id: string;
        img_url: string;
        title: string;
    };
    body: {
        destination: {
            account: string;
            agency: string;
            cnpj: string;
            institution: string;
        };
        beneficiary: {
            cnpj: string;
        };
        description: {
            label: string;
            cnpj: string;
            total_transfer: number;
            flag_card: string;
            form_of_payment: string;
        };
    };
    banners: Banner[];
    total: number;
    type: string;
    user_id: number;
}

export interface Banner {
    label: string;
    type: string;
}
