interface ValueRecord {
    [key: string]: Record<string, string> & string;
}
export interface APIResponse {
    detail?: ValueRecord;
    message?: string;
    redirect?: ValueRecord;
    status?: string;
    success: boolean;
}
