export interface SellerOnboard {
    current_step?: number;
    finished_at?: {
        date?: string;
        timezone_type?: number;
        timezone?: string;
    };
}
