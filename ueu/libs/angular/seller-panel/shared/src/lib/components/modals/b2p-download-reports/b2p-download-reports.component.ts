import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnInit,
    QueryList,
    TemplateRef,
    ViewChildren,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { B2PExtractProjects, CheckPasswordService, ExtractService } from '@picpay/seller-panel/services';
import {
    convertISOTimeToBrasilianTime,
    dateIsBiggerThan24Hours,
    formatISODate,
    getYesterdayDate,
    subscribeUntil,
} from '@picpay/angular/shared/helpers';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { dateValidator } from '../../../validators';

@Component({
    selector: 'seller-panel-b2p-download-reports',
    templateUrl: './b2p-download-reports.component.html',
    styleUrls: ['./b2p-download-reports.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class B2PDownloadReportsComponent implements OnInit, AfterViewInit {
    @ViewChildren(TemplateRef) private steppers: QueryList<TemplateRef<HTMLElement>>;

    reportForm: FormGroup;
    downloadForm: FormGroup;

    dateTo: AbstractControl;
    dateFrom: AbstractControl;
    reportField: AbstractControl;
    passwordField: AbstractControl;

    isHandset$: Observable<boolean>;

    templateStepper: TemplateRef<HTMLElement>;

    hiddenProjectWarning: boolean;
    warningProjectText: string;
    disableCalendarButtons: boolean;

    isLoading: boolean;

    nextButtonText: string;
    cancelButtonText: string;

    date: Date;
    maxDate: Date;
    minDate: Date;

    projects: B2PExtractProjects[];
    projectsList$: Observable<unknown>;

    selectedProject: Pick<B2PExtractProjects, 'project_id' | 'started_at' | 'ended_at'>;
    emptySearchMessage: Pick<B2PExtractProjects, 'name'>;
    projectErrorMessage: Pick<B2PExtractProjects, 'name'>;
    projectEmptyMessage: Pick<B2PExtractProjects, 'name'>;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: B2PDownloadReportsComponent,
        private fb: FormBuilder,
        private cd: ChangeDetectorRef,
        private dialogRef: MatDialogRef<B2PDownloadReportsComponent>,
        private breakpointObserver: BreakpointObserver,
        private extractService: ExtractService,
        private checkPasswordService: CheckPasswordService,
        private datePipe: DatePipe,
    ) {
        this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches));
        this.date = new Date();
        this.projects = [];
        this.emptySearchMessage = { name: 'Não há nenhuma remessa ou projeto com esse nome' };
        this.projectErrorMessage = { name: 'Erro ao carregar as informações. Tente novamente mais tarde' };
        this.projectEmptyMessage = { name: 'Não há projeto ou remessa' };
        this.hiddenProjectWarning = true;
    }

    ngOnInit(): void {
        this.setReportForm();
        this.setReportFields();
        this.setExtractProjects();
        this.setReportFieldWatcher();
    }

    ngAfterViewInit(): void {
        this.setFirstModalStepper();
        this.setModalButtonsText();
    }

    onClose(): void {
        this.dialogRef.close({ downloadExtract: false });
    }

    nextModalStepper(): void {
        this.nextStepModalData();
        this.setSelectedProjectData();
        this.cd.detectChanges();
    }

    isLastModalStepp(): boolean {
        return this.templateStepper === this.steppers?.last;
    }

    showFilteredValue(project: B2PExtractProjects): string {
        return project?.name ? project.name : '';
    }

    doReportDownload(): void {
        this.isLoading = true;
        this.checkPasswordService
            .verifyPassword(this.downloadForm.value)
            .pipe(subscribeUntil(this))
            .subscribe(
                () => this.closeDownloadExtractModal(true),
                () => this.closeDownloadExtractModal(false),
            );
    }

    selectProjectHandler(project: B2PExtractProjects): void {
        if (!this.disableProjectListOptions(project)) {
            this.selectedProject = { project_id: project.project_id, started_at: null, ended_at: null };

            if (dateIsBiggerThan24Hours(convertISOTimeToBrasilianTime(project.created_at))) {
                return this.setProjectUnavailableWarning();
            }

            this.hiddenProjectWarning = true;
            this.disableCalendarButtons = false;
            this.checkProjectIsInProgress(project.ended_at);
            this.setCalendarMinAndMaxDate(project.created_at);
            this.setInitialCalendarDates();

            this.cd.detectChanges();
        }
    }

    checkProjectIsInProgress(projectEndedDate: string): void {
        this.date.toISOString() <= projectEndedDate || !projectEndedDate
            ? (this.hiddenProjectWarning = false)
            : (this.hiddenProjectWarning = true);

        this.warningProjectText =
            'Essa remessa está em andamento. Portanto, os dados do relatório podem mudar após a conclusão da remessa.';
    }

    disableCalendarButton(): boolean {
        return this.disableCalendarButtons ? this.disableCalendarButtons : !this.reportField.value;
    }

    disableProjectListOptions(project: B2PExtractProjects): boolean {
        const isEmptySearch = project.name === this.emptySearchMessage.name;
        const isProjectError = project.name === this.projectErrorMessage.name;
        const isProjectEmpty = project.name === this.projectEmptyMessage.name;

        return isProjectError || isProjectEmpty || isEmptySearch;
    }

    findSearchedValue(value: string) {
        const filterValue = value.toLowerCase();
        const filteredOption = this.projects.filter(option => option?.name?.toLowerCase().indexOf(filterValue) === 0);
        const defaultMessage = this.projectListIsEmpty() ? [this.projectErrorMessage] : [this.emptySearchMessage];

        if (defaultMessage && !this.hiddenProjectWarning) {
            this.hiddenProjectWarning = !this.hiddenProjectWarning;
        }

        return filteredOption.length ? filteredOption : defaultMessage;
    }

    autoCompleteBlurHandler(event: FocusEvent): void {
        const searchedValue = (<HTMLInputElement>event.target).value;
        const searchedValueExist = this.projects.find(values => values.name === searchedValue);

        if (this.projectListIsEmpty()) {
            this.projectsList$ = this.extractService
                .getExtractProjects()
                .pipe(map(projects => this.setExtractProjects(projects)));
        }

        if (!searchedValueExist) {
            this.hiddenProjectWarning = true;
            this.disableCalendarButtons = false;
            this.reportField.setValue('');
        }
    }

    nextStepModalData(): void {
        this.templateStepper = this.steppers.last;
        this.hiddenProjectWarning = true;
        this.nextButtonText = 'Baixar relatório';
    }

    setProjectUnavailableWarning(): void {
        this.dateTo.setValue('');
        this.dateFrom.setValue('');
        this.warningProjectText = 'Ainda não há relatório disponível.';
        this.hiddenProjectWarning = false;
        this.disableCalendarButtons = true;
    }

    setSelectedProjectData(): void {
        this.selectedProject = {
            ...this.selectedProject,
            started_at: this.datePipe.transform(this.dateFrom.value, 'yyyy-MM-dd'),
            ended_at: this.datePipe.transform(this.dateTo.value, 'yyyy-MM-dd'),
        };
    }

    setExtractProjects(fetchedProjects = this.data.projects): B2PExtractProjects[] {
        if (fetchedProjects?.length) {
            this.projects = this.projectNameMapper(fetchedProjects);
        } else if (!fetchedProjects) {
            this.projects = ([this.projectErrorMessage] as unknown) as [];
        } else {
            this.projects = ([this.projectEmptyMessage] as unknown) as [];
        }

        return this.projects;
    }

    projectNameMapper(projects: B2PExtractProjects[]): B2PExtractProjects[] {
        return projects.filter(
            project => project?.name ?? (project.name = `Remessa - ${formatISODate(project.created_at, true)}`),
        );
    }

    setInitialCalendarDates(): void {
        this.dateFrom.setValue(this.minDate);
        this.dateTo.setValue(this.maxDate);
    }

    setCalendarMinAndMaxDate(create_at: string): void {
        this.minDate = new Date(convertISOTimeToBrasilianTime(create_at));
        this.maxDate = new Date(getYesterdayDate());
    }

    setModalButtonsText(): void {
        this.nextButtonText = 'Próximo';
        this.cancelButtonText = 'Cancelar';
    }

    setFirstModalStepper(): void {
        if (this.steppers) {
            this.templateStepper = this.steppers.first;
            this.cd.detectChanges();
        }
    }

    setReportFields(): void {
        this.dateTo = this.reportForm.get('dateTo');
        this.dateFrom = this.reportForm.get('dateFrom');
        this.reportField = this.reportForm.get('report');
        this.passwordField = this.downloadForm.get('password');
    }

    setReportFieldWatcher(): void {
        const EMPTY_VALUE = '';

        this.projectsList$ = this.reportField.valueChanges.pipe(
            subscribeUntil(this),
            startWith(EMPTY_VALUE),
            map(value => (typeof value === 'string' ? value : value.name)),
            map(name => (name ? this.findSearchedValue(name) : this.projects.slice())),
        );
    }

    setReportForm(): void {
        this.reportForm = this.fb.group({
            report: new FormControl('', [Validators.required]),
            dateFrom: new FormControl('', [Validators.required, dateValidator()]),
            dateTo: new FormControl('', [Validators.required, dateValidator()]),
        });

        this.downloadForm = this.fb.group({
            password: new FormControl('', [Validators.required]),
        });
    }

    projectListIsEmpty(): boolean {
        return this.projects.some(({ name }) => name === this.projectErrorMessage.name) || !this.projects?.length;
    }

    isFormValid(): boolean {
        return this.isLastModalStepp() ? !this.downloadForm.valid : !this.reportForm.valid;
    }

    closeDownloadExtractModal(downloadExtract: boolean): void {
        this.isLoading = false;
        this.dialogRef.close({ project: this.selectedProject, downloadExtract });
    }
}
