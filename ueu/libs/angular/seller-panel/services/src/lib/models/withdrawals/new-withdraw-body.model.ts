export interface NewWithdraw {
    ip: string;
    bankAccountId: number;
    value: number;
    confirm?: boolean;
}
