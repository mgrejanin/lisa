import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';

import { of, throwError } from 'rxjs';
import { MockComponent, MockModule } from 'ng-mocks';

import {
    ExtractService,
    ExtractServiceMock,
    ReportFormat,
    SellerQuery,
    SellerQueryB2PMock,
    SidenavService,
    downloadExtractBlobError,
    downloadExtractBlobSucess,
    RequestStatusCodeErrorResponse,
} from '@picpay/seller-panel/services';
import {
    B2PDownloadReportsComponent,
    B2PProjectOptions,
    DownloadReportsComponent,
    FeedBackComponent,
    SidenavDetailsComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
} from '@picpay/seller-panel/shared';
import {
    NotificationsService,
    MockNotificationsService,
    SnackbarTypes,
} from '@picpay/angular/shared/core/notifications';
import { ApolloSnackbar } from '@picpay/design-system-angular-components';
import { MatDialogMock, WINDOW } from '@picpay/angular/shared/helpers';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';

import { ResumeFutureReleasesComponent } from '../../components/resume-future-releases/resume-future-releases.component';
import { ExtractContainerComponent } from './extract-container.component';
import { TableExtractComponent } from '../../components/table-extract/table-extract.component';
import {
    B2PDownloadReportModalConfig,
    downloadReportModalConfig,
    modalDataConfig,
    B2PDownloadReportModalResult,
} from '../../mocks/extract-container.mock';
import { ExtractDetailsComponent } from '../../components/extract-details/extract-details.component';

describe('ExtractContainerComponent', () => {
    let component: ExtractContainerComponent;
    let fixture: ComponentFixture<ExtractContainerComponent>;
    let matDialog: MatDialog;
    let windowToken: Window;
    let extractService: ExtractService;
    let notificationService: NotificationsService;

    global.URL.createObjectURL = jest.fn();

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MockModule(MatIconModule), 
                MockModule(MatTableModule), 
                MockModule(MatChipsModule),
                MockModule(DesignSystemAngularModule),
            ],
            declarations: [
                ExtractContainerComponent,
                ApolloSnackbar,
                MockComponent(ExtractDetailsComponent),
                MockComponent(SidenavDetailsComponent),
                MockComponent(HeaderComponent),
                MockComponent(TableExtractComponent),
                MockComponent(ResumeFutureReleasesComponent),
                MockComponent(LoadingSpinnerComponent),
                MockComponent(FeedBackComponent),
            ],
            providers: [
                SidenavService,
                { provide: MatDialog, useClass: MatDialogMock },
                { provide: ExtractService, useClass: ExtractServiceMock },
                { provide: SellerQuery, useClass: SellerQueryB2PMock },
                { provide: NotificationsService, useValue: new MockNotificationsService({}) },
                { provide: Window, useValue: WINDOW },
            ],
        })
            .overrideModule(BrowserDynamicTestingModule, {
                set: { entryComponents: [ApolloSnackbar] },
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ExtractContainerComponent);
        component = fixture.componentInstance;
        matDialog = TestBed.inject(MatDialog);

        windowToken = TestBed.inject(WINDOW);
        extractService = TestBed.inject(ExtractService);
        notificationService = TestBed.inject(NotificationsService);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have getExtractItems function (Success case)', () => {
        component.getExtractItems();

        extractService.getExtract().subscribe(() => {
            expect(component.isLoading).toBe(false);
        });
    });

    it('should have getExtractItems function (Error case)', () => {
        const extractServiceSpy = spyOn(extractService, 'getExtract').and.returnValue(throwError('Mock error message'));
        const setEmptyStateDataSpy = spyOn(component, 'setEmptyStateData');

        component.getExtractItems();

        expect(extractServiceSpy).toHaveBeenCalledTimes(1);
        expect(setEmptyStateDataSpy).toHaveBeenCalledWith(true);
        expect(component.isLoading).toBe(false);
    });

    it('should have getMoreExtractItems function', () => {
        const getExtractItemsSpy = spyOn(component, 'getExtractItems');

        component.tablePagination = {
            last_date: '2020-12',
            current_page: 1,
            next_page: 2,
            per_page: 10,
        };

        component.getMoreExtractItems();

        expect(getExtractItemsSpy).toHaveBeenCalledWith(2, '2020-12');

        component.tablePagination = {
            last_date: '2020-11',
            current_page: 4,
            next_page: 1,
            per_page: 10,
        };

        component.getMoreExtractItems();

        expect(getExtractItemsSpy).toHaveBeenCalledWith(1, '2020-11');
    });

    it('should have openDownloadReports function', () => {
        const matDialogSpy = spyOn(matDialog, 'open').and.callThrough();

        component.openDownloadReports();

        expect(matDialogSpy).toHaveBeenCalledWith(DownloadReportsComponent, {
            ...downloadReportModalConfig,
            ...modalDataConfig(ReportFormat.PDF, component.currentFiltersExtract),
        });
    });

    it('should have setEmptyStateData function returns EMPTY state', () => {
        component.setEmptyStateData(true);

        expect(component.feedbackByExtractResult).toEqual({
            title: 'Opa, isso não deu certo',
            description: 'Algo aconteceu e não conseguimos carregar as informações.',
            svgPath: './assets/images/empty_extract.svg',
        });
    });

    it('should have setEmptyStateData function returns ERROR state', () => {
        component.setEmptyStateData(true);

        expect(component.feedbackByExtractResult).toEqual({
            title: 'Opa, isso não deu certo',
            description: 'Algo aconteceu e não conseguimos carregar as informações.',
            svgPath: './assets/images/empty_extract.svg',
        });
    });

    it('should have scrollToTop function', () => {
        const scrollSpy = spyOn(windowToken, 'scroll');

        component.scrollToTop();

        expect(scrollSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    });

    it('should have onScroll function', () => {
        component.onScroll();

        expect(component.scrollToTopVisible).toBe(false);
    });

    describe('B2P - Test Suite', () => {
        it('should open B2P download report modal', () => {
            const downloadReport = document.getElementById('btn-download-report');

            const matDialogSpy = jest.spyOn(matDialog, 'open');
            const b2pDownloadSpy = jest.spyOn(component, 'openB2BDownloadReports');

            component.isB2P = true;
            downloadReport.click();

            expect(b2pDownloadSpy).toHaveBeenCalled();
            expect(matDialogSpy).toHaveBeenCalledWith(B2PDownloadReportsComponent, B2PDownloadReportModalConfig);
            expect(component.disableBntExtractButton).toBeFalsy();
        });

        it('should download the CSV file', () => {
            const matDialogSpy = spyOn(matDialog, 'open').and.returnValue({
                afterClosed: () => of(B2PDownloadReportModalResult),
            });
            const b2pDownloadSpy = jest.spyOn(component, 'openB2BDownloadReports');
            const downloadMsgSpy = jest.spyOn(component, 'setDownloadReportMessages');
            const downloadCSVSpy = spyOn(component, 'downloadCSVReport');
            const notificationSpy = jest.spyOn(notificationService, 'openSnackbar');
            const downloadExtractSpy = jest.spyOn(extractService, 'downloadExtract');

            component.isB2P = true;
            component.openB2BDownloadReports();

            expect(matDialogSpy).toHaveBeenCalledWith(B2PDownloadReportsComponent, B2PDownloadReportModalConfig);
            expect(b2pDownloadSpy).toHaveBeenCalled();
            expect(downloadMsgSpy).toHaveBeenCalled();
            expect(downloadCSVSpy).toHaveBeenCalledWith(new Blob());
            expect(component.disableBntExtractButton).toBeFalsy();
            expect(notificationSpy).toHaveBeenCalledWith('Sua solicitação está sendo processada.');
            expect(downloadExtractSpy).toHaveBeenCalledWith(
                B2PDownloadReportModalResult.project.project_id,
                B2PDownloadReportModalResult.project.started_at,
                B2PDownloadReportModalResult.project.ended_at,
            );
        });

        it('shouldnt download the CSV file when close the modal', () => {
            const matDialogSpy = spyOn(matDialog, 'open').and.returnValue({
                afterClosed: () => of({ downloadExtract: false }),
            });
            const b2pDownloadSpy = jest.spyOn(component, 'openB2BDownloadReports');
            const downloadMsgSpy = jest.spyOn(component, 'setDownloadReportMessages');
            const downloadCSVSpy = spyOn(component, 'downloadCSVReport');
            const notificationSpy = jest.spyOn(notificationService, 'openSnackbar');
            const downloadExtractSpy = jest.spyOn(extractService, 'downloadExtract');

            component.isB2P = true;
            component.openB2BDownloadReports();

            expect(matDialogSpy).toHaveBeenCalled();
            expect(b2pDownloadSpy).toHaveBeenCalled();
            expect(downloadCSVSpy).not.toHaveBeenCalled();
            expect(downloadMsgSpy).not.toHaveBeenCalled();
            expect(notificationSpy).not.toHaveBeenCalled();
            expect(downloadExtractSpy).not.toHaveBeenCalled();
            expect(component.disableBntExtractButton).toBeFalsy();
        });

        it('should display a message error when CSV download fails (Internal Server Error)', () => {
            const matDialogSpy = spyOn(matDialog, 'open').and.returnValue({
                afterClosed: () => of(B2PDownloadReportModalResult),
            });
            const downloadExtractSpy = spyOn(extractService, 'downloadExtract').and.returnValue(
                throwError({ status: RequestStatusCodeErrorResponse.INTERNAL_SERVER_ERROR }),
            );
            const b2pDownloadSpy = jest.spyOn(component, 'openB2BDownloadReports');
            const downloadMsgSpy = jest.spyOn(component, 'setDownloadReportMessages');
            const downloadCSVSpy = spyOn(component, 'downloadCSVReport');
            const blobHandlerSpy = jest.spyOn(component, 'blobErrorHandler');
            const notificationSpy = jest.spyOn(notificationService, 'openSnackbar');
            const apiErrorHandlerSpy = jest.spyOn(component, 'apiErrorHandler');
            const downloadHandlerSpy = jest.spyOn(component, 'extractDownloadErrorHandler');

            component.isB2P = true;
            component.openB2BDownloadReports();

            expect(matDialogSpy).toHaveBeenCalledWith(B2PDownloadReportsComponent, B2PDownloadReportModalConfig);
            expect(downloadCSVSpy).not.toHaveBeenCalled();
            expect(blobHandlerSpy).not.toHaveBeenCalled();
            expect(b2pDownloadSpy).toHaveBeenCalled();
            expect(downloadHandlerSpy).toHaveBeenCalledWith({
                status: RequestStatusCodeErrorResponse.INTERNAL_SERVER_ERROR,
            });
            expect(downloadMsgSpy).toHaveBeenCalledWith(RequestStatusCodeErrorResponse.INTERNAL_SERVER_ERROR);
            expect(apiErrorHandlerSpy).toHaveBeenCalledWith(RequestStatusCodeErrorResponse.INTERNAL_SERVER_ERROR);
            expect(notificationSpy).toHaveBeenCalledWith(
                'Opa, houve um erro de comunicação. Tente baixar o relatório novamente.',
                SnackbarTypes.ERROR,
            );
            expect(downloadExtractSpy).toHaveBeenCalledWith(
                B2PDownloadReportModalResult.project.project_id,
                B2PDownloadReportModalResult.project.started_at,
                B2PDownloadReportModalResult.project.ended_at,
            );
            expect(component.disableBntExtractButton).toBeFalsy();
        });

        it('should display a message error when CSV download fails (Gateway Timeout Error)', () => {
            const matDialogSpy = spyOn(matDialog, 'open').and.returnValue({
                afterClosed: () => of(B2PDownloadReportModalResult),
            });
            const downloadExtractSpy = spyOn(extractService, 'downloadExtract').and.returnValue(
                throwError({ status: RequestStatusCodeErrorResponse.GATEWAY_TIMEOUT_ERROR }),
            );
            const b2pDownloadSpy = jest.spyOn(component, 'openB2BDownloadReports');
            const downloadMsgSpy = jest.spyOn(component, 'setDownloadReportMessages');
            const downloadCSVSpy = spyOn(component, 'downloadCSVReport');
            const blobHandlerSpy = jest.spyOn(component, 'blobErrorHandler');
            const notificationSpy = jest.spyOn(notificationService, 'openSnackbar');
            const apiErrorHandlerSpy = jest.spyOn(component, 'apiErrorHandler');
            const downloadHandlerSpy = jest.spyOn(component, 'extractDownloadErrorHandler');

            component.isB2P = true;
            component.openB2BDownloadReports();

            expect(matDialogSpy).toHaveBeenCalledWith(B2PDownloadReportsComponent, B2PDownloadReportModalConfig);
            expect(downloadCSVSpy).not.toHaveBeenCalled();
            expect(blobHandlerSpy).not.toHaveBeenCalled();
            expect(b2pDownloadSpy).toHaveBeenCalled();
            expect(downloadHandlerSpy).toHaveBeenCalledWith({
                status: RequestStatusCodeErrorResponse.GATEWAY_TIMEOUT_ERROR,
            });
            expect(downloadMsgSpy).toHaveBeenCalledWith(RequestStatusCodeErrorResponse.GATEWAY_TIMEOUT_ERROR);
            expect(apiErrorHandlerSpy).toHaveBeenCalledWith(RequestStatusCodeErrorResponse.GATEWAY_TIMEOUT_ERROR);
            expect(notificationSpy).toHaveBeenCalledWith(
                'Opa, houve um erro. Tente baixar o relatório novamente em alguns minutos.',
                SnackbarTypes.ERROR,
            );
            expect(downloadExtractSpy).toHaveBeenCalledWith(
                B2PDownloadReportModalResult.project.project_id,
                B2PDownloadReportModalResult.project.started_at,
                B2PDownloadReportModalResult.project.ended_at,
            );
            expect(component.disableBntExtractButton).toBeFalsy();
        });

        it('should call blobErrorHandler() when CSV download fails (Project Error)', () => {
            const matDialogSpy = spyOn(matDialog, 'open').and.returnValue({
                afterClosed: () => of(B2PDownloadReportModalResult),
            });

            const downloadExtractSpy = spyOn(extractService, 'downloadExtract').and.returnValue(
                throwError(downloadExtractBlobError),
            );
            const b2pDownloadSpy = jest.spyOn(component, 'openB2BDownloadReports');
            const downloadMsgSpy = jest.spyOn(component, 'setDownloadReportMessages');
            const downloadCSVSpy = spyOn(component, 'downloadCSVReport');
            const blobHandlerSpy = jest.spyOn(component, 'blobErrorHandler');
            const apiErrorHandlerSpy = jest.spyOn(component, 'apiErrorHandler');
            const downloadHandlerSpy = jest.spyOn(component, 'extractDownloadErrorHandler');

            spyOn(window, 'FileReader').and.returnValue({
                addEventListener: () => jest.fn(),
                readAsText: () => new FileReader(),
                onloadend: () => new FileReader(),
            });

            component.isB2P = true;
            component.openB2BDownloadReports();

            expect(matDialogSpy).toHaveBeenCalledWith(B2PDownloadReportsComponent, B2PDownloadReportModalConfig);
            expect(downloadCSVSpy).not.toHaveBeenCalled();
            expect(b2pDownloadSpy).toHaveBeenCalled();
            expect(apiErrorHandlerSpy).not.toHaveBeenCalled();
            expect(downloadMsgSpy).not.toHaveBeenCalledWith(undefined);
            expect(downloadHandlerSpy).toHaveBeenCalledWith(downloadExtractBlobError);
            expect(blobHandlerSpy).toHaveBeenCalledWith(downloadExtractBlobError);
            expect(component.disableBntExtractButton).toBeFalsy();
            expect(downloadExtractSpy).toHaveBeenCalledWith(
                B2PDownloadReportModalResult.project.project_id,
                B2PDownloadReportModalResult.project.started_at,
                B2PDownloadReportModalResult.project.ended_at,
            );

            // TODO: can't trigger loaded FileReader event
        });

        it('should download CSV by browser url', () => {
            Object.defineProperty(window, 'location', {
                value: {
                    hash: {
                        endsWith: jest.fn(),
                        includes: jest.fn(),
                    },
                    assign: jest.fn(),
                },
                writable: true,
            });

            const windowLocationSpy = jest.spyOn(window.location, 'assign');
            const blobUrl = window.URL.createObjectURL(downloadExtractBlobSucess);

            component.downloadCSVReport(downloadExtractBlobSucess);

            expect(windowLocationSpy).toHaveBeenCalledWith(blobUrl);
        });

        it('shouldnt open B2P download report modal', () => {
            const downloadReport = document.getElementById('btn-download-report');
            const matDialogSpy = jest.spyOn(matDialog, 'open');
            const b2bDownload = jest.spyOn(component, 'openB2BDownloadReports');

            component.isB2P = false;
            downloadReport.click();

            expect(b2bDownload).not.toHaveBeenCalled();
            expect(component.disableBntExtractButton).toBeFalsy();
            expect(matDialogSpy).not.toHaveBeenCalledWith(B2PDownloadReportsComponent, B2PDownloadReportModalConfig);
            expect(matDialogSpy).toHaveBeenCalledWith(DownloadReportsComponent, {
                ...downloadReportModalConfig,
                ...modalDataConfig(ReportFormat.PDF, component.currentFiltersExtract),
            });
        });

        it('should display export report button text when user is not B2P', () => {
            const btnExportButton = fixture.debugElement.query(By.css('#btn-download-report'))
                .nativeElement as HTMLButtonElement;

            component.isB2P = false;

            fixture.detectChanges();
            expect(btnExportButton.textContent).toContain('Exportar relatório');
        });

        it('should display download report button text when user is B2P', () => {
            const btnDownloadReportButton = fixture.debugElement.query(By.css('#btn-download-report'))
                .nativeElement as HTMLButtonElement;

            component.isB2P = true;

            fixture.detectChanges();
            expect(btnDownloadReportButton.textContent).toContain('Baixar relatório');
        });

        it('should get extract projects when user is B2P', () => {
            const getB2ProjectsSpy = jest.spyOn(component, 'getB2PExtractProjects');

            component.checkB2PFlag();

            fixture.detectChanges();
            expect(component.disableBntExtractButton).toBeFalsy();
            expect(getB2ProjectsSpy).toHaveBeenCalled();
            expect(component.isB2P).toBeTruthy();
            expect(component.b2pExtractProjects).toStrictEqual(B2PProjectOptions);
        });

        it('should enable download extract button if user is not B2P', () => {
            component.isB2P = false;
            expect(component.disableDownloadExtractButton()).toBeFalsy();
        });

        it('should disable download extract button if projectAPI still fetching data', () => {
            component.isB2P = true;
            component.disableBntExtractButton = true;
            expect(component.disableDownloadExtractButton()).toBeTruthy();

            component.getB2PExtractProjects();
            expect(component.disableDownloadExtractButton()).toBeFalsy();
            expect(component.disableBntExtractButton).toBeFalsy();
        });
    });
});
