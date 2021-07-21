import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError, filter, finalize, pluck, startWith, tap } from 'rxjs/operators';

import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { NotificationsService, SnackbarTypes } from '@picpay/angular/shared/core/notifications';

import { DevPortalDataAccessConfig } from '../dev-portal-data-access.config';
import { Project } from '../../models';
import { ProjectsStore } from './projects.store';
import { slugify } from '../../utils/slugify';
import { subscribeUntil } from '@picpay/angular/shared/helpers';

@Injectable({
    providedIn: 'root',
})
export class ProjectsService {
    constructor(
        private http: HttpClient,
        private config: CoreDataAccessService<DevPortalDataAccessConfig>,
        private store: ProjectsStore,
        private router: Router,
        private notifications: NotificationsService,
    ) {}

    getProjects(): void {
        this.http
            .get(`${this.config.getConfig().apiUrl}/internal/user/v1/projects`)
            .pipe(
                subscribeUntil(this),
                pluck('data'),
                startWith(this.store.setLoading(true)),
                tap((projects: Project[]) => this.store.set(projects)),
                catchError(error => throwError(error)),
                finalize(() => this.store.setLoading(false)),
            )
            .subscribe({
                error: error => {
                    this.store.setError(error);
                    this.notifications.openSnackbar(`Falha ao tentar carregar os projetos`, SnackbarTypes.ERROR);
                },
            });
    }

    createProject(project: Project): Observable<Project> {
        return this.http.post(`${this.config.getConfig().apiUrl}/internal/user/v1/projects/create`, project).pipe(
            subscribeUntil(this),
            startWith(this.store.setLoading(true)),
            pluck('data'),
            tap((project: Project) => {
                this.store.add(project);
                this.updateCurrentProject(project);
            }),
            catchError(error => throwError(error)),
            finalize(() => this.store.setLoading(false)),
        );
    }

    editProject(project: Project): Observable<Project> {
        return this.http
            .post(`${this.config.getConfig().apiUrl}/internal/user/v1/projects/${project.id}/edit`, project)
            .pipe(
                subscribeUntil(this),
                startWith(this.store.setLoading(true)),
                pluck('data'),
                filter(response => !!response),
                tap((response: Project) => {
                    this.store.update(response.id, response);
                    this.updateCurrentProject(response);
                }),
                catchError(error => throwError(error)),
                finalize(() => this.store.setLoading(false)),
            );
    }

    deleteProject(project: Project): void {
        this.http
            .post(`${this.config.getConfig().apiUrl}/internal/user/v1/projects/${project.id}/delete`, project)
            .pipe(
                subscribeUntil(this),
                startWith(this.store.setLoading(true)),
                filter(response => !!response),
                tap(() => {
                    this.store.remove(project.id);
                    this.updateCurrentProject(null);
                }),
                catchError(error => throwError(error)),
                finalize(() => this.store.setLoading(false)),
            )
            .subscribe(
                () => {
                    this.notifications.openSnackbar('Projeto excluído com sucesso');
                },
                error => {
                    this.store.setError(error);
                    this.notifications.openSnackbar('Falha ao tentar excluir o projeto', SnackbarTypes.ERROR);
                },
            );
    }

    favoriteProject(idProject: Project['id'], favorite: Project['favorite']): void {
        this.http
            .post(`${this.config.getConfig().apiUrl}/internal/user/v1/projects/${idProject}/favorite`, {
                favorite,
            })
            .pipe(
                subscribeUntil(this),
                startWith(this.store.setLoading(true)),
                pluck('data'),
                tap(project => {
                    this.store.update(idProject, project);
                }),
                catchError(error => throwError(error)),
            )
            .subscribe(
                () => {
                    this.notifications.openSnackbar('Projeto adicionado aos favoritos');
                },
                error => {
                    this.store.setError(error);
                    this.notifications.openSnackbar(
                        'Falha ao tentar adicionar o projeto aos favoritos',
                        SnackbarTypes.ERROR,
                    );
                },
            );
    }

    updateCurrentProject(project: Project | null): void {
        if (project) {
            this.store.setActive(project.id);
            this.router.navigateByUrl(`/dashboard/projeto/${slugify(project.name)}`);
        } else {
            this.store.setActive(null);
            this.router.navigateByUrl(`/dashboard/novo-projeto`);
        }
    }
}
