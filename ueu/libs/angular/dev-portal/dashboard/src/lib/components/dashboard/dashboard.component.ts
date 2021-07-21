import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { subscribeUntil } from '@picpay/angular/shared/helpers';
import { AuthQuery, Project, ProjectsQuery, ProjectsService, slugify } from '@picpay/dev-portal/shared';
import { combineLatest, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'dev-portal-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    readonly projects$: Observable<Project[]>;
    readonly loading$: Observable<boolean>;
    readonly errors$: Observable<unknown>;
    readonly activatedProject$: Observable<Project>;
    activatedProject: Project;
    constructor(
        public query: ProjectsQuery,
        public authQuery: AuthQuery,
        private service: ProjectsService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.projects$ = this.query.projects$;
        this.activatedProject$ = this.query.activatedProject$;
        this.loading$ = query.selectLoading();
        this.errors$ = query.selectError();
    }

    ngOnInit() {
        combineLatest([this.route.params, this.projects$])
            .pipe(
                subscribeUntil(this),
                filter(([params]) => (!this.activatedProject && !params['project'] ? true : false)),
            )
            .subscribe(([params, projects]) => {
                if (!this.router.routerState.snapshot.url.includes('/projeto/')) {
                    const firstProject = projects[0];
                    return this.setSelectedProject(firstProject);
                }
                const slug = this.router.routerState.snapshot.url.split('/').pop();
                const currentProject = projects.find(project => slugify(project.name) === (params['project'] || slug));
                this.setSelectedProject(currentProject);
            });
    }

    setSelectedProject(project: Project | null): void {
        this.activatedProject = project ? project : null;
        this.service.updateCurrentProject(this.activatedProject);
    }
}
