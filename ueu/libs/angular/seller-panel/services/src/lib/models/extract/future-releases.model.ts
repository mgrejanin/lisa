export interface FutureReleasesList {
    list?: FutureRelease[];
    has_receivables: boolean;
}

export interface FutureRelease {
    label?: string;
    balance?: {
        label?: string;
        value?: string;
    };
    list?: FutureReleaseItem[];
}

export interface FutureReleaseItem {
    id?: number;
    name?: string;
    value?: string;
}
