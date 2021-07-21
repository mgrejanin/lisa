import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { ProjectsService } from '../data-access/projects/projects.service';

@Injectable({ providedIn: 'root' })
export class ProjectResolver implements Resolve<void> {
    constructor(private service: ProjectsService) {}

    resolve(): void {
        return this.service.getProjects();
    }
}
