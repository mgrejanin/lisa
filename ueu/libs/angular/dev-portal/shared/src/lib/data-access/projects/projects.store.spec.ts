import { ProjectsStore } from './projects.store';

describe('ProjectsStore', () => {
    let store: ProjectsStore;

    beforeEach(() => {
        store = new ProjectsStore();
    });

    it('should create an instance', () => {
        expect(store).toBeTruthy();
    });
});
