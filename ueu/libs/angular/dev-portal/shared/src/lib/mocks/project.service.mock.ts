import { of } from 'rxjs';
import { Project } from '../models';
import { projectMock } from './project.mock';

export const createProjectMock: Project = {
    ...projectMock,
};

const favoriteProjectMock: Project = {
    ...projectMock,
    favorite: (projectMock.favorite = !projectMock.favorite),
};

export class ProjectServiceMock {
    getProjects() {
        return of([projectMock]);
    }

    createProject(_project: Project) {
        return of(createProjectMock);
    }

    editProject(_project: Project) {
        return of(createProjectMock);
    }

    deleteProject(_project: Project) {
        return of(createProjectMock);
    }

    favoriteProject(_id: Project['id'], _favorite: Project['favorite']) {
        return of(favoriteProjectMock);
    }

    updateCurrentProject(_project: Project) {
        return;
    }
}
