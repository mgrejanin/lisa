export interface FeesResponse {
    data: {
        max_percentage: string;
        min_percentage: string;
        default_day: number;
        list: Fees[];
    };
}

export interface Fees {
    id: number;
    day: string;
    percentage: number;
    percentage_str: string;
}

export interface DataFees {
    company_fees: number;
}
