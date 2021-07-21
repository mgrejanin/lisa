import { ExtractItem } from './extract-item.model';
import { ExtractPagination } from './extract-pagination.model';

export interface Extract {
    extract: ExtractItem[];
    pagination?: ExtractPagination;
    show_receivables_onboarding?: boolean;
    future_releases?: {
        date: string;
        value: number;
    };
}
