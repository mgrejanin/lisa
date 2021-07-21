import { MatDialogConfig } from '@angular/material/dialog';
import { ReportFormat, TransactionFilters } from '@picpay/seller-panel/services';
import { B2PProjectOptions } from '@picpay/seller-panel/shared';

export const B2PDownloadReportModalConfig: MatDialogConfig = {
    panelClass: ['o-modal-reset', 'full-screen-modal'],
    width: '560px',
    disableClose: true,
    autoFocus: false,
    data: { downloadExtract: false, projects: B2PProjectOptions },
};

export const downloadReportModalConfig: MatDialogConfig = {
    panelClass: ['o-modal-reset', 'full-screen-modal'],
    width: '560px',
};

export const B2PDownloadReportModalResult = {
    downloadExtract: true,
    project: {
        project_id: B2PProjectOptions[0].project_id,
        started_at: '2021-06-01',
        ended_at: '2021-06-26',
    },
};

export const modalDataConfig = (reportFormat: ReportFormat, filters: TransactionFilters) => {
    return {
        data: {
            format_type: reportFormat,
            filters: filters,
        },
    };
};
