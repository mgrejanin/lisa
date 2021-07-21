import { Injectable } from '@angular/core';
import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Project } from '../../models';

export interface ProjectsState extends EntityState<Project, number>, ActiveState {}
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'projects' })
export class ProjectsStore extends EntityStore<ProjectsState> {
    constructor() {
        super();
    }
}
