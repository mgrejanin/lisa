export interface PlanResponse {
    id: string;
    fee: number;
    name: string;
    description?: string;
    days_to_withdrawal: number;
    has_grace_period?: boolean;
    grace_period?: number;
}
