import { CurrencyPipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { MockComponent, MockModule } from 'ng-mocks';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { SellerPanelAuthService, SellerPanelAuthServiceMock } from '@picpay/seller-panel/auth';
import { ExtractService, ExtractServiceMock, ReportFormat } from '@picpay/seller-panel/services';
import { DownloadReportsComponent, HeaderComponent } from '@picpay/seller-panel/shared';
import { ResumeFutureReleasesComponent } from '../../components/resume-future-releases/resume-future-releases.component';

import { MatDialogMock } from '@picpay/angular/shared/helpers';

import { ExtractComponent } from './extract.component';

import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';

import { RouterTestingModule } from '@angular/router/testing';

import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { TableExtractComponent } from '../../components/table-extract/table-extract.component';

describe('ExtractComponent', () => {
    let component: ExtractComponent;
    let fixture: ComponentFixture<ExtractComponent>;
    let matDialog: MatDialog;
    let authService: SellerPanelAuthService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MockModule(MatIconModule),
                MockModule(MatTableModule),
                MockModule(MatChipsModule),
                MockModule(DesignSystemAngularModule),
                HttpClientTestingModule,
                RouterTestingModule,
            ],
            declarations: [
                ExtractComponent,
                MockComponent(HeaderComponent),
                MockComponent(TableExtractComponent),
                MockComponent(ResumeFutureReleasesComponent),
            ],
            providers: [
                CurrencyPipe,
                {
                    provide: MatDialog,
                    useClass: MatDialogMock,
                },
                { provide: SellerPanelAuthService, useClass: SellerPanelAuthServiceMock },
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'auth.com' }),
                    },
                },
                { provide: ExtractService, useClass: ExtractServiceMock },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ExtractComponent);
        component = fixture.componentInstance;

        matDialog = TestBed.inject(MatDialog);
        authService = TestBed.inject(SellerPanelAuthService);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should openDownloadReports function', () => {
        const matDialogSpy = spyOn(matDialog, 'open').and.callThrough();
        const openDownloadReportsSpy = spyOn(component, 'openDownloadReports').and.callThrough();

        component.openDownloadReports();

        expect(openDownloadReportsSpy).toHaveBeenCalled();
        expect(matDialogSpy).toHaveBeenCalledWith(DownloadReportsComponent, {
            panelClass: ['o-modal-reset', 'full-screen-modal'],
            width: '560px',
            data: {
                format_type: ReportFormat.PDF,
                filters: component.currentFiltersExtract,
            },
        });
    });

    it('should have onLogout function', () => {
        const logoutSpy = spyOn(authService, 'logout');

        component.onLogout();

        expect(logoutSpy).toHaveBeenCalled();
    });
});
