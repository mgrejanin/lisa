import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { initials, Project, ProjectsQuery, ProjectsService, slugify, UiQuery } from '@picpay/dev-portal/shared';
import { EventTracking } from '@picpay/event-tracking';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationsService, SnackbarTypes } from '@picpay/angular/shared/core/notifications';

@Component({
    selector: 'dev-portal-new-project',
    templateUrl: './new-project.component.html',
    styleUrls: ['./new-project.component.scss'],
})
export class NewProjectComponent implements OnInit {
    newProjectForm: FormGroup;
    projects$: Observable<Project[]>;
    projects: Project[];
    errors$: Observable<unknown>;
    editing: boolean;
    newProjectScreen = true;
    isMobile$: Observable<boolean>;

    constructor(
        public formBuilder: FormBuilder,
        private service: ProjectsService,
        private query: ProjectsQuery,
        private uiQuery: UiQuery,
        private router: Router,
        private notifications: NotificationsService,
    ) {
        this.isMobile$ = this.uiQuery.isMobile$;
        this.projects$ = this.query.projects$;
        this.projects = this.query.getAll();
        this.errors$ = this.query.selectError();
        this.newProjectForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(3)], this.validateProjectName.bind(this)],
            description: ['', [Validators.required, Validators.maxLength(250)]],
            image: [''],
            owner_name: [''],
            id: [0],
            favorite: [false],
        });
    }

    ngOnInit(): void {
        const project = this.query.getActive();
        if (project) {
            this.editing = true;
            this.newProjectForm.patchValue({
                id: project.id,
                name: project.name,
                description: project.description,
                image: project.image,
                owner_name: project.owner_name,
                favorite: project.favorite,
            });
        }
    }

    onSubmit(): void {
        if (this.newProjectForm.invalid) {
            return;
        }

        const project: Project = {
            id: 0,
            name: this.formRef.name.value,
            owner_name: this.formRef.owner_name.value,
            description: this.formRef.description.value,
            image: this.formRef.image.value,
            favorite: false,
            products: [],
        };

        if (!this.editing) {
            this.createProject(project);
            return;
        }

        this.editProject(project);
    }

    createProject(project: Project): void {
        this.service.createProject(project).subscribe(
            () => {
                this.trackProjectSubmit('NOVO', 'SUCESSO');
                this.notifications.openSnackbar('Projeto criado com sucesso!');
            },
            () => {
                this.trackProjectSubmit('NOVO', 'ERRO');
                this.notifications.openSnackbar('Falha ao tentar criar o projeto!', SnackbarTypes.ERROR);
            },
        );
        return;
    }

    editProject(project: Project): void {
        project = {
            ...project,
            id: this.formRef.id.value,
            favorite: this.formRef.favorite.value,
        };

        this.service.editProject(project).subscribe(
            () => {
                this.editing = false;
                this.notifications.openSnackbar('Projeto editado com sucesso!');
                this.trackProjectSubmit('EDITAR', 'SUCESSO');
            },
            () => {
                this.trackProjectSubmit('EDITAR', 'ERRO');
                this.notifications.openSnackbar('Falha ao tentar editar o projeto!', SnackbarTypes.ERROR);
            },
        );
        return;
    }

    setAvatar(newAvatar: string | Blob): void {
        this.newProjectForm.patchValue({
            image: newAvatar,
        });
    }

    getInitials(str: string): string {
        if (str) {
            return initials(str);
        }
    }

    cancel(): void {
        this.router.navigateByUrl(`/dashboard/projeto/${slugify(this.projects[0].name)}`);
    }

    validateProjectName(control: AbstractControl): Observable<boolean | { alreadyExist: boolean }> {
        const projects = this.query.getAll();
        return projects.length &&
            projects.find(
                project => slugify(project.name) === slugify(control.value) && project.id !== this.query.getActiveId(),
            )
            ? of({ alreadyExist: true })
            : of(true);
    }

    trackProjectSubmit(type: 'NOVO' | 'EDITAR', status: 'SUCESSO' | 'ERRO'): void {
        EventTracking.track('Button Clicked', {
            button_name: `BOTAO_${type === 'NOVO' ? 'CRIAR' : type}_PROJETO`,
            page_name: `STUDIO_PICPAY_${type}_PROJETO`,
            context: `${status}_FORMULARIO_${type}_PROJETO`,
        });
    }

    get formRef() {
        return this.newProjectForm.controls;
    }
}
