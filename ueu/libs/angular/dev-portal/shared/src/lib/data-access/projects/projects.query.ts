import { Injectable } from '@angular/core';

// akita
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { Project } from '../../models';

// store components
import { ProjectsState, ProjectsStore } from './projects.store';

@Injectable({ providedIn: 'root' })
export class ProjectsQuery extends QueryEntity<ProjectsState> {
    readonly projects$: Observable<Project[]>;
    readonly activatedProject$: Observable<Project>;

    constructor(protected store: ProjectsStore) {
        super(store);
        this.projects$ = this.selectAll();
        this.activatedProject$ = this.selectActive();
    }
}
