import { DatePipe } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';

import { convertISOTimeToBrasilianTime, getYesterdayDate, MatDialogRefMock } from '@picpay/angular/shared/helpers';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import {
    B2PExtractProjects,
    CheckPasswordService,
    CheckPasswordServiceMock,
    ExtractService,
    ExtractServiceMock,
} from '@picpay/seller-panel/services';

import { MockComponent, MockModule, MockProvider, MockService } from 'ng-mocks';
import { of, throwError } from 'rxjs';
import { B2PProjectOptions } from '../../../mocks/b2p-download-report.mock';
import { LoadingButtonComponent } from '../../loading-button/loading-button.component';
import { B2PDownloadReportsComponent } from './b2p-download-reports.component';

describe('B2BDownloadReportsComponent', () => {
    let component: B2PDownloadReportsComponent;
    let fixture: ComponentFixture<B2PDownloadReportsComponent>;
    let element: DebugElement;
    let matDialogRef: MatDialogRef<B2PDownloadReportsComponent>;
    let checkPasswordService: CheckPasswordService;

    const setProjectsDate = (project: B2PExtractProjects, decreaseDate: boolean = false) => {
        const date = new Date();
        const newMonth = decreaseDate ? date.getMonth() - 2 : date.getMonth() + 1;
        const newDate = decreaseDate ? date.getDate() - 2 : date.getDate() + 1;

        date.setFullYear(date.getFullYear(), newMonth, newDate);
        project.ended_at = date.toISOString();
    };

    const removeTimeInISODate = (date: string): string => {
        return date.split('T').shift();
    };

    const getYesterdayDateHelperMock = jest.fn() as jest.MockedFunction<typeof getYesterdayDate>;
    const isoTimeToBrasilianTimeHelperMock = jest.fn() as jest.MockedFunction<typeof convertISOTimeToBrasilianTime>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [B2PDownloadReportsComponent, MockComponent(LoadingButtonComponent)],
            imports: [
                ReactiveFormsModule,
                MockModule(MatIconModule),
                MockModule(MatAutocompleteModule),
                MockModule(MatFormFieldModule),
                MockModule(MatDatepickerModule),
                MockModule(DesignSystemAngularModule),
            ],
            providers: [
                DatePipe,
                { provide: CheckPasswordService, useClass: CheckPasswordServiceMock },
                { provide: ExtractService, useClass: ExtractServiceMock },
                MockProvider(MatDialogRef, MockService(MatDialogRefMock)),
                MockProvider(MAT_DIALOG_DATA, MockService({})),
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(B2PDownloadReportsComponent);
        checkPasswordService = TestBed.inject(CheckPasswordService);
        matDialogRef = TestBed.inject(MatDialogRef);
        component = fixture.componentInstance;
        element = fixture.debugElement;
        component.data.projects = B2PProjectOptions;
        fixture.detectChanges();
    });

    beforeAll(() => {
        jest.useFakeTimers('modern').setSystemTime(new Date(2021, 6, 12, 19, 20).getTime());
        jest.spyOn(Date.prototype, 'toLocaleTimeString').mockImplementation(() => '12:00:00');
    });

    afterAll(() => {
        jest.useRealTimers();
        jest.restoreAllMocks();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Field errors validations - Test Suite', () => {
        it('should report form invalid when empty', () => {
            expect(component.reportForm.valid).toBeFalsy();
        });

        it('should report field invalid when empty', () => {
            expect(component.reportField.valid).toBeFalsy();
        });

        it('should report field required when empty', () => {
            const fieldError = component.reportField.errors ?? {};
            expect(fieldError['required']).toBeTruthy();
        });

        it('should display required error message in report field blur event', () => {
            const fieldError = component.reportField.errors ?? {};
            const inputField = element.query(By.css('#project')).nativeElement as HTMLInputElement;
            const errorMessageElement = element.query(By.css('.c-download-report__content--text-error'));

            inputField.dispatchEvent(new Event('blur'));

            expect(fieldError['required']).toBeTruthy();
            expect(errorMessageElement.nativeElement.textContent).toContain('Este campo é requerido!');
        });

        it('should dateTo field invalid when empty', () => {
            expect(component.dateTo.valid).toBeFalsy();
        });

        it('should dateTo field required when empty', () => {
            const fieldError = component.dateTo.errors ?? {};
            expect(fieldError['required']).toBeTruthy();
        });

        it('should dateFrom field invalid when empty', () => {
            expect(component.dateFrom.valid).toBeFalsy();
        });

        it('should dateFrom vield required when empty', () => {
            const fieldError = component.dateFrom.errors ?? {};
            expect(fieldError['required']).toBeTruthy();
        });

        it('should disable next modal button when form is invalid', () => {
            const btnNextStep = element.query(By.css('#btn-next')).nativeElement as HTMLApolloButtonElement;
            const disabledNextStepBtn = btnNextStep.getAttribute('ng-reflect-disabled');

            expect(disabledNextStepBtn).toBe('true');
        });
    });

    describe('Fields values validations - Test Suite', () => {
        it('should display default empty project/shipping message', async () => {
            component.reportField.setValue('test project');

            fixture.detectChanges();
            await fixture.whenStable();

            const matOptions = document.querySelectorAll('mat-option');
            const fieldError = component.reportField.errors ?? {};

            expect(matOptions.length).toBe(1);
            expect(matOptions.item(0).textContent).toContain('Não há nenhuma remessa ou projeto com esse nome');
            expect(fieldError['required']).toBeFalsy();
        });

        it('should display all options in project/shipping field on focus', () => {
            const inputField = element.query(By.css('#project')).nativeElement as HTMLInputElement;
            const matOptions = document.querySelectorAll('mat-option');

            inputField.dispatchEvent(new Event('input'));
            inputField.dispatchEvent(new Event('focus'));

            fixture.detectChanges();

            expect(matOptions.length).toBe(2);
            expect(matOptions.item(0).textContent).toContain('Projeto Teste01');
            expect(matOptions.item(1).textContent).toContain('Projeto Teste02');
        });

        it('should select one project/shipping', async () => {
            component.reportField.setValue('Projecto Teste02');

            fixture.detectChanges();
            await fixture.whenStable();

            const fieldError = component.reportField.errors ?? {};
            const matOptions = document.querySelectorAll('mat-option');
            const selectedOption = matOptions.item(0) as HTMLDivElement;

            selectedOption.click();

            expect(component.reportField.value).toContain('Projecto Teste02');
            expect(fieldError['required']).toBeFalsy();
        });

        it('should empty the project/shipping field when the searched value does not exist and leave the field', async () => {
            const inputField = element.query(By.css('#project')).nativeElement as HTMLInputElement;

            component.reportField.setValue('test project123123');
            inputField.dispatchEvent(new Event('blur'));

            fixture.detectChanges();
            await fixture.whenStable();

            const fieldError = component.reportField.errors ?? {};
            const errorMessageElement = element.query(By.css('.c-download-report__content--text-error'));

            expect(component.reportField.value).toBeFalsy();
            expect(component.reportField.value).toBe('');
            expect(fieldError['required']).toBeTruthy();
            expect(errorMessageElement.nativeElement.textContent).toContain('Este campo é requerido!');
        });

        it('should disable dateFrom and dateTo calendar fields when report field is invalid', () => {
            const inputField = element.query(By.css('#project')).nativeElement as HTMLInputElement;

            component.reportField.setValue('');
            inputField.dispatchEvent(new Event('input'));

            fixture.detectChanges();

            expect(component.dateFrom.errors['required']).toBeTruthy();
            expect(component.dateTo.errors['required']).toBeTruthy();
        });

        it('should enable dateFrom and dateTo calendar fields when report field is valid', async () => {
            const btnDateTo = element.query(By.css('#dateFrom')).nativeElement as HTMLButtonElement;
            const btnDateFrom = element.query(By.css('#dateTo')).nativeElement as HTMLButtonElement;

            component.reportField.setValue('Projeto Teste01');

            fixture.detectChanges();
            await fixture.whenStable();

            const isDateToButtonDisabled = btnDateTo.getAttribute('ng-reflect-disabled');
            const isDateFromButtonDisabled = btnDateFrom.getAttribute('ng-reflect-disabled');

            expect(isDateToButtonDisabled).toBe('false');
            expect(isDateFromButtonDisabled).toBe('false');
        });

        it('should enable next modal button when form is valid', () => {
            const btnNextStep = element.query(By.css('#btn-next')).nativeElement as HTMLApolloButtonElement;

            component.reportField.setValue('Projeto Teste01');
            component.dateTo.setValue(new Date().toISOString());
            component.dateFrom.setValue(new Date().toISOString());

            fixture.detectChanges();

            const disabledNextStepBtn = btnNextStep.getAttribute('ng-reflect-disabled');

            expect(disabledNextStepBtn).toBe('false');
        });

        it('should advanced to last modal step', () => {
            const PASSWORD_STEP_SUBTITLE =
                'Para garantir sua segurança, confirme sua senha antes de baixar o relatório.';
            const btnNextStep = element.query(By.css('#btn-next')).nativeElement as HTMLApolloButtonElement;

            btnNextStep.click();
            fixture.detectChanges();

            const subtitleElement = element.query(By.css('apollo-text')).nativeElement as HTMLApolloTextElement;
            expect(component.isLastModalStepp()).toBeTruthy();
            expect(component.nextButtonText).toBe('Baixar relatório');
            expect(subtitleElement.textContent).toContain(PASSWORD_STEP_SUBTITLE);
        });

        it('should download form invalid when empty', () => {
            expect(component.downloadForm.valid).toBeFalsy();
        });
    });

    describe('Project fetch - Test Suite', () => {
        it('should set default empty project list message', () => {
            component.data.projects = [];
            component.projects = [];
            component.setExtractProjects();

            fixture.detectChanges();
            expect(component.projects).toStrictEqual([component.projectEmptyMessage]);
        });

        it('should display project error message when search some project', () => {
            component.data.projects = null;
            component.projects = null;
            component.setExtractProjects();
            component.reportField.setValue('Projeto Teste02');

            fixture.detectChanges();

            const matOptions = document.querySelectorAll('mat-option');
            const matOptionElem = matOptions.item(0) as HTMLDivElement;

            expect(matOptionElem.textContent).toContain('Erro ao carregar as informações. Tente novamente mais tarde');
        });

        it('should fetch project API when blur project field out', () => {
            const extractService = TestBed.inject(ExtractService);
            const projectListSpy = jest.spyOn(component, 'projectListIsEmpty');
            const getExtractSpy = jest
                .spyOn(extractService, 'getExtractProjects')
                .mockReturnValueOnce(of(B2PProjectOptions));

            const extractProjectsSpy = jest.spyOn(component, 'setExtractProjects');
            const inputField = element.query(By.css('#project')).nativeElement as HTMLInputElement;

            component.data.projects = null;
            component.projects = null;
            component.setExtractProjects();
            component.reportField.setValue('Projeto Teste02');
            inputField.dispatchEvent(new Event('blur'));

            fixture.detectChanges();
            expect(projectListSpy).toHaveBeenCalled();
            expect(extractProjectsSpy).toHaveBeenCalledWith(B2PProjectOptions);
            expect(getExtractSpy).toHaveBeenCalled();
            expect(component.projects).toStrictEqual(B2PProjectOptions);
        });

        it('should set default project name if name is undefined/null', () => {
            const projectsWithoutName: B2PExtractProjects[] = [
                {
                    ...B2PProjectOptions[0],
                    name: null,
                },
                {
                    ...B2PProjectOptions[1],
                    name: undefined,
                },
            ];

            const result = component.projectNameMapper(projectsWithoutName);
            expect(result[0].name).toBe('Remessa - 05.04.2021 - 20:51');
            expect(result[1].name).toBe('Remessa - 10.05.2021 - 20:51');
        });
    });

    describe('Project warnings - Test Suite', () => {
        it('should display warning if project is in progress', () => {
            const matOptions = document.querySelectorAll('mat-option');
            const matOptionElem = matOptions.item(0) as HTMLDivElement;

            setProjectsDate(component.projects[0]);
            component.reportField.setValue('Projeto Teste01');
            matOptionElem.click();

            fixture.detectChanges();
            expect(component.hiddenProjectWarning).toBeFalsy();
            expect(component.warningProjectText).toBe(
                'Essa remessa está em andamento. Portanto, os dados do relatório podem mudar após a conclusão da remessa.',
            );
        });

        it('shouldnt display warning project progress feedback card', () => {
            const matOptions = document.querySelectorAll('mat-option');

            setProjectsDate(component.projects[1], true);
            component.reportField.setValue('Projeto Teste02');

            fixture.detectChanges();

            const matOptionElem = matOptions.item(0) as HTMLDivElement;
            matOptionElem.click();

            expect(component.hiddenProjectWarning).toBeTruthy();
        });

        it('should display warning project unavailable feedback card ', () => {
            const unavailableWarningSpy = jest.spyOn(component, 'setProjectUnavailableWarning');
            const projectUnavailable: B2PExtractProjects = {
                ...B2PProjectOptions[0],
                created_at: component.date.toISOString(),
            };

            component.selectProjectHandler(projectUnavailable);

            fixture.detectChanges();
            expect(unavailableWarningSpy).toHaveBeenCalled();
            expect(component.dateTo.value).toBe('');
            expect(component.dateFrom.value).toBe('');
            expect(component.warningProjectText).toBe('Ainda não há relatório disponível.');
            expect(component.hiddenProjectWarning).toBeFalsy();
            expect(component.disableCalendarButtons).toBeTruthy();
        });

        it('should display project progress warning with NULL "ended_at" value', () => {
            component.checkProjectIsInProgress(null);

            expect(component.hiddenProjectWarning).toBeFalsy();
        });

        it('should hidden projects warning if change/typed other project that not exist', () => {
            component.hiddenProjectWarning = false;
            component.findSearchedValue('projectXXXX');

            expect(component.hiddenProjectWarning).toBeTruthy();
        });

        it('should return only the project name', () => {
            const filteredProject1 = component.showFilteredValue(B2PProjectOptions[0]);
            const filteredProject2 = component.showFilteredValue(B2PProjectOptions[1]);
            const inexistentProject = component.showFilteredValue({ ...B2PProjectOptions[0], name: '' });

            expect(filteredProject1).toBe('Projeto Teste01');
            expect(filteredProject2).toBe('Projeto Teste02');
            expect(inexistentProject).toBe('');
        });
    });

    describe('Project dates - Test Suite', () => {
        it('should initial calendar date must be project "created_at" value', () => {
            const matOptions = document.querySelectorAll('mat-option');

            isoTimeToBrasilianTimeHelperMock.mockImplementation((isoDate: string) => {
                isoDate = '2021-04-05T17:51:18.722000Z';
                return isoDate;
            });

            component.reportField.setValue('Projeto Teste01');
            fixture.detectChanges();

            const matOptionElem = matOptions.item(0) as HTMLDivElement;
            matOptionElem.click();

            expect(removeTimeInISODate(component.minDate.toISOString())).toEqual(
                removeTimeInISODate(isoTimeToBrasilianTimeHelperMock(B2PProjectOptions[0].created_at)),
            );

            isoTimeToBrasilianTimeHelperMock.mockRestore();
        });

        it('should initial calendar final date must be todays date - 1', () => {
            const matOptions = document.querySelectorAll('mat-option');
            const matOptionElem = matOptions.item(0) as HTMLDivElement;
            const dateFrom = element.query(By.css('#dateFrom-input')).nativeElement as HTMLInputElement;

            component.reportField.setValue('Projeto Teste02');
            matOptionElem.click();

            fixture.detectChanges();
            const dateFromMaxDate = new Date(dateFrom.getAttribute('ng-reflect-max'));

            expect(dateFromMaxDate.getDay()).toBe(component.maxDate.getDay());
            expect(dateFromMaxDate.getDate()).toBe(component.maxDate.getDate());
            expect(dateFromMaxDate.getFullYear()).toBe(component.maxDate.getFullYear());
        });

        it('should final calendar date must be todays date - 1', async () => {
            const date = new Date();
            const matOptions = document.querySelectorAll('mat-option');

            component.reportField.setValue('Projeto Teste01');
            date.setDate(date.getDate() - 1);

            fixture.detectChanges();

            const matOptionElem = matOptions.item(0) as HTMLDivElement;
            matOptionElem.click();

            expect(component.maxDate.getDate()).toEqual(date.getDate());
            expect(component.maxDate.getMonth()).toEqual(date.getMonth());
            expect(component.maxDate.getFullYear()).toEqual(date.getFullYear());
        });

        it('should format dates to yyyy--MM-dd', () => {
            const datePipe = TestBed.inject(DatePipe);
            const dateISOString = new Date().toISOString();

            component.selectedProject = undefined;
            component.dateFrom.setValue(dateISOString);
            component.dateTo.setValue(dateISOString);
            component.setSelectedProjectData();

            fixture.detectChanges();

            const started_at = datePipe.transform(component.dateFrom.value, 'yyyy-MM-dd');
            const ended_at = datePipe.transform(component.dateTo.value, 'yyyy-MM-dd');

            expect(component.selectedProject).toStrictEqual({
                started_at: started_at,
                ended_at: ended_at,
            });
        });

        it('should set calendar dates when select one project', () => {
            const initialDatesSpy = jest.spyOn(component, 'setInitialCalendarDates');
            const projectListSpy = jest.spyOn(component, 'disableProjectListOptions');
            const projectUnavailableSpy = jest.spyOn(component, 'setProjectUnavailableWarning');

            getYesterdayDateHelperMock.mockImplementation(() => '2021-07-11T17:51:18.722000Z');
            isoTimeToBrasilianTimeHelperMock.mockImplementation((isoDate: string) => {
                isoDate = '2021-04-05T17:51:18.722000Z';
                return isoDate;
            });

            component.selectProjectHandler(B2PProjectOptions[0]);

            expect(component.disableCalendarButtons).toBeFalsy();
            expect(projectListSpy).toHaveReturnedWith(false);
            expect(initialDatesSpy).toHaveBeenCalled();
            expect(projectUnavailableSpy).not.toHaveBeenCalled();

            expect(removeTimeInISODate(component.dateFrom.value.toISOString())).toEqual(
                removeTimeInISODate(isoTimeToBrasilianTimeHelperMock(B2PProjectOptions[0].created_at)),
            );
            expect(removeTimeInISODate(component.dateTo.value.toISOString())).toBe(
                removeTimeInISODate(getYesterdayDateHelperMock()),
            );

            getYesterdayDateHelperMock.mockRestore();
            isoTimeToBrasilianTimeHelperMock.mockRestore();
        });

        it('should set final calendar date value to today - 1', () => {
            getYesterdayDateHelperMock.mockImplementation(() => '2021-07-11T17:51:18.722000Z');

            component.setCalendarMinAndMaxDate(B2PProjectOptions[0].created_at);
            component.setInitialCalendarDates();

            expect(removeTimeInISODate(component.dateTo.value.toISOString())).toBe(
                removeTimeInISODate(getYesterdayDateHelperMock()),
            );

            getYesterdayDateHelperMock.mockRestore();
        });
    });

    describe('Download report - Test Suite', () => {
        it('should download report', () => {
            const downloadReportSpy = jest.spyOn(component, 'doReportDownload');
            const btnNextStep = element.query(By.css('#btn-next')).nativeElement as HTMLApolloButtonElement;

            component.reportField.setValue('Projeto Teste01');
            component.dateTo.setValue(new Date().toISOString());
            component.dateFrom.setValue(new Date().toISOString());

            fixture.detectChanges();

            const matOptions = document.querySelectorAll('mat-option');
            const matOptionElem = matOptions.item(0) as HTMLDivElement;

            matOptionElem.click();
            btnNextStep.click();

            fixture.detectChanges();

            component.passwordField.setValue('123123123123');

            fixture.detectChanges();

            btnNextStep.click();

            expect(downloadReportSpy).toHaveBeenCalled();
            expect(component.isLoading).toBeFalsy();
        });

        it('should close modal when password is wrong', () => {
            const closeExtractSpy = jest.spyOn(component, 'closeDownloadExtractModal');
            const passwordServiceSpy = jest
                .spyOn(checkPasswordService, 'verifyPassword')
                .mockImplementation(() => throwError({}));

            expect(component.isLoading).toBeUndefined();

            component.doReportDownload();

            expect(component.isLoading).toBeFalsy();
            expect(passwordServiceSpy).toHaveBeenCalled();
            expect(closeExtractSpy).toHaveBeenCalledWith(false);
        });

        it('should close modal when password is correct', () => {
            const closeExtractSpy = jest.spyOn(component, 'closeDownloadExtractModal');
            const passwordServiceSpy = jest
                .spyOn(checkPasswordService, 'verifyPassword')
                .mockImplementation(() => of({ message: 'Autorizado' }));

            expect(component.isLoading).toBeUndefined();

            component.doReportDownload();

            expect(component.isLoading).toBeFalsy();
            expect(passwordServiceSpy).toHaveBeenCalled();
            expect(closeExtractSpy).toHaveBeenCalledWith(true);
        });

        it('should cancel modal without downloading the extract', () => {
            const matSpy = jest.spyOn(matDialogRef, 'close');
            component.onClose();

            expect(matSpy).toHaveBeenCalledWith({ downloadExtract: false });
        });
    });
});
