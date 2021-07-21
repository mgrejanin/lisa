export interface CheckAccountError {
    bank_account_id: number;
    validation_issue: {
        message?: string;
        reason?: string;
        action?: {
            message?: string;
            deep_link?: string;
        };
    };
}
