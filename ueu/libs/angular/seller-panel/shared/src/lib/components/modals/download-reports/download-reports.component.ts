import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { EventTracking } from '@picpay/event-tracking';
import { DownloadReporter, ReportFormat, ReportRequest, SellerQuery } from '@picpay/seller-panel/services';
import { getISODateByDaysAgo, resetISODateHour } from '@picpay/angular/shared/helpers';

import { dateEndValidator, dateValidator } from '../../../validators';

@Component({
    selector: 'seller-panel-download-reports',
    templateUrl: './download-reports.component.html',
    styleUrls: ['./download-reports.component.scss'],
})
export class DownloadReportsComponent {
    form: FormGroup;
    formData;
    dateMax = resetISODateHour(new Date(Date.now()).toISOString(), true);
    isHandset$: Observable<boolean>;
    organizationEmail: string;

    isHide = true;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: DownloadReporter,
        private dialogRef: MatDialogRef<DownloadReportsComponent>,
        private breakpointObserver: BreakpointObserver,
        private formBuilder: FormBuilder,
        private sellerQuery: SellerQuery,
    ) {
        this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches));
        this.organizationEmail = this.sellerQuery.getValue().organization?.email;
        this.formData = {
            format_type: data?.format_type || ReportFormat.CSV,
            date_init: data?.filters?.date_init || getISODateByDaysAgo(7, true),
            date_end: data?.filters?.date_end || this.dateMax,
        };
        this.onBuildForm();
    }

    onBuildForm(): void {
        this.form = this.formBuilder.group({
            email: ['', [Validators.email, Validators.maxLength(50)]],
            format: [this.formData.format_type, [Validators.required]],
            dateFrom: [this.formData.date_init, [Validators.required, dateValidator()]],
            dateTo: [this.formData.date_end, [Validators.required, dateValidator(), dateEndValidator('dateFrom')]],
        });
    }

    onGetReporterFilters(): DownloadReporter {
        this.data.filters.date_init = resetISODateHour(new Date(this.form.value.dateFrom).toISOString());
        this.data.filters.date_end = resetISODateHour(new Date(this.form.value.dateTo).toISOString(), true);

        return {
            format_type: this.form.get('format').value,
            ...this.data.filters,
        };
    }

    onClose(): void {
        EventTracking.track('Dialog Interacted', {
            action: 'close',
            hit_type: 'event',
            event_category: 'clicked',
            event_action: 'User clicked',
            event_label: 'Dialog Interacted',
        });
        this.dialogRef.close();
    }

    onSendToEmail(): void {
        const { email } = this.form.value;
        const filters = {
            request_type: ReportRequest.EMAIL,
            ...this.onGetReporterFilters(),
        };

        if (email) {
            filters['email'] = email;
        }

        this.dialogRef.close(filters);
    }

    onToggleEmail(): void {
        this.isHide = !this.isHide;
    }
}
