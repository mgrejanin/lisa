import { FeatureAuditing } from '../../models';
import { FeaturesQuery } from './features.query';
import { FeaturesStore } from './features.store';

describe('FeaturesQuery', () => {
    let store: FeaturesStore;
    let query: FeaturesQuery;

    beforeEach(() => {
        store = new FeaturesStore();
        query = new FeaturesQuery(store);
    });

    it('should create an instance', () => {
        expect(query).toBeTruthy();
    });

    it('should have activeFeature$ observable', () => {
        expect(query.activeFeature$).toBeDefined();
    });

    it('should have activeCommits$ observable', () => {
        expect(query.activeCommits$).toBeDefined();
    });

    it('should have applications$ observable', () => {
        expect(query.applications$).toBeDefined();
    });

    it('should have features$ observable', () => {
        expect(query.features$).toBeDefined();
    });

    it('should have isLoading$ observable', () => {
        expect(query.isLoading$).toBeDefined();
    });

    it('should have activeCommits$ in the correct order', (done: jest.DoneCallback) => {
        const mockCommits = [
            new FeatureAuditing('mockId', 'mockMessage', 'mockDate', 1, 'mockTime', null),
            new FeatureAuditing('mockId', 'mockMessage', 'mockDate', 2, 'mockTime', null),
            new FeatureAuditing('mockId', 'mockMessage', 'mockDate', 3, 'mockTime', null),
            new FeatureAuditing('mockId', 'mockMessage', 'mockDate', 4, 'mockTime', null),
            new FeatureAuditing('mockId', 'mockMessage', 'mockDate', 5, 'mockTime', null),
            new FeatureAuditing('mockId', 'mockMessage', 'mockDate', 6, 'mockTime', null),
            new FeatureAuditing('mockId', 'mockMessage', 'mockDate', 7, 'mockTime', null),
        ];

        store.updateActiveCommits(mockCommits);

        query.activeCommits$.subscribe(commits => {
            let expectedCommitVersion = 7;

            commits.forEach(commit => {
                expect(commit.version).toEqual(expectedCommitVersion);
                expectedCommitVersion -= 1;
            });

            done();
        });
    });

    it('should also have activeCommits$ in the correct order', (done: jest.DoneCallback) => {
        const mockCommits = [
            new FeatureAuditing('mockId', 'mockMessage', 'mockDate', 2, 'mockTime', null),
            new FeatureAuditing('mockId', 'mockMessage', 'mockDate', 4, 'mockTime', null),
            new FeatureAuditing('mockId', 'mockMessage', 'mockDate', 5, 'mockTime', null),
            new FeatureAuditing('mockId', 'mockMessage', 'mockDate', 1, 'mockTime', null),
            new FeatureAuditing('mockId', 'mockMessage', 'mockDate', 6, 'mockTime', null),
            new FeatureAuditing('mockId', 'mockMessage', 'mockDate', 3, 'mockTime', null),
            new FeatureAuditing('mockId', 'mockMessage', 'mockDate', 7, 'mockTime', null),
        ];

        store.updateActiveCommits(mockCommits);

        query.activeCommits$.subscribe(commits => {
            let expectedCommitVersion = 7;

            commits.forEach(commit => {
                expect(commit.version).toEqual(expectedCommitVersion);
                expectedCommitVersion -= 1;
            });

            done();
        });
    });

    it('should return empty activeCommit$', (done: jest.DoneCallback) => {
        store.updateActiveCommits(null);

        const expectedCommits = [];

        query.activeCommits$.subscribe(commits => {
            expect(commits).toEqual(expectedCommits);
            done();
        });
    });
});
