import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { EventTracking } from '@picpay/event-tracking';
import { DownloadReporter } from '@picpay/seller-panel/services';
import { MatDialogRefMock, MatDialogMock, resetISODateHour } from '@picpay/angular/shared/helpers';
import { TransactionsService, TransactionsServiceMock } from '@picpay/seller-panel/services';

import { MockComponents, MockModule } from 'ng-mocks';

import { DownloadReportsComponent } from './download-reports.component';
import { ValidationMessagesComponent } from '../../validation-messages/validation-messages.component';

describe('DownloadReportsComponent', () => {
    let component: DownloadReportsComponent;
    let fixture: ComponentFixture<DownloadReportsComponent>;
    let dialogRef: MatDialogRef<DownloadReportsComponent>;
    let data: DownloadReporter = {};

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                ReactiveFormsModule,
                MatButtonToggleModule,
                MockModule(DesignSystemAngularModule),
                MockModule(MatIconModule),
                MockModule(MatFormFieldModule),
                MockModule(MatDatepickerModule),
            ],
            declarations: [DownloadReportsComponent, MockComponents(ValidationMessagesComponent)],
            providers: [
                { provide: TransactionsService, useClass: TransactionsServiceMock },
                { provide: MatDialog, useClass: MatDialogMock },
                { provide: MatDialogRef, useClass: MatDialogRefMock },
                { provide: MAT_DIALOG_DATA, useValue: data },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DownloadReportsComponent);
        component = fixture.componentInstance;

        dialogRef = TestBed.inject(MatDialogRef);

        data = {
            filters: {
                date_init: resetISODateHour(new Date(component.form.value.dateFrom).toISOString()),
                date_end: resetISODateHour(new Date(component.form.value.dateTo).toISOString(), true),
            },
        };

        component.organizationEmail = 'testing@testmail.com';

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have onGetReporterFilters function', () => {
        component.onGetReporterFilters();

        expect(component.data.filters.date_init).toBeDefined();
        expect(component.data.filters.date_end).toBeDefined();
    });

    it('should have onClose function', () => {
        const dialogRefSpy = spyOn(dialogRef, 'close');
        const evtTracking = spyOn(EventTracking, 'track');

        component.onClose();

        expect(dialogRefSpy).toHaveBeenCalledTimes(1);
        expect(evtTracking).toHaveBeenCalledWith('Dialog Interacted', {
            action: 'close',
            hit_type: 'event',
            event_category: 'clicked',
            event_action: 'User clicked',
            event_label: 'Dialog Interacted',
        });
    });

    it('should have onSendToEmail function (without email)', () => {
        const dialogRefSpy = spyOn(dialogRef, 'close');

        component.onSendToEmail();

        expect(dialogRefSpy).toHaveBeenCalledWith({
            request_type: 'EMAIL',
            format_type: 'CSV',
            date_init: data.filters.date_init,
            date_end: data.filters.date_end,
        });
    });

    it('should have onSendToEmail function (with email)', () => {
        const dialogRefSpy = spyOn(dialogRef, 'close');

        component.form.patchValue({ email: 'test@test.com' });
        component.onSendToEmail();

        expect(dialogRefSpy).toHaveBeenCalledWith({
            request_type: 'EMAIL',
            format_type: 'CSV',
            email: component.form.value.email,
            date_init: data.filters.date_init,
            date_end: data.filters.date_end,
        });
    });

    it('should have onToggle function', () => {
        expect(component.isHide).toBe(true);

        component.onToggleEmail();

        expect(component.isHide).toBe(false);
    });
});
