import { ProjectsQuery } from './projects.query';
import { ProjectsStore } from './projects.store';

describe('ProjectsQuery', () => {
    let query: ProjectsQuery;

    beforeEach(() => {
        query = new ProjectsQuery(new ProjectsStore());
    });

    it('should create an instance', () => {
        expect(query).toBeTruthy();
    });
});
