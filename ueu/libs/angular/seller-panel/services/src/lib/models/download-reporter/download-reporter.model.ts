import { ReportFormat } from './report-format.enum';
import { ReportRequest } from './report-request.enum';
import { TransactionFilters } from '../transactions/transaction-filters.model';

export interface DownloadReporter {
    format_type?: ReportFormat;
    request_type?: ReportRequest;
    filters?: TransactionFilters;
}
