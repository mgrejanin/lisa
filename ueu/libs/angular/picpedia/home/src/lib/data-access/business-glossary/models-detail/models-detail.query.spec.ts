import { ModelsDetailQuery } from './models-detail.query';
import { ModelsDetailStore } from './models-detail.store';

describe('ModelsDetailQuery', () => {
    let query: ModelsDetailQuery;

    beforeEach(() => {
        query = new ModelsDetailQuery(new ModelsDetailStore());
    });

    it('should create an instance', () => {
        expect(query).toBeTruthy();
    });

    it('should have isLoadingDisplay$ observable', () => {
        expect(query.isLoadingDisplay$).toBeTruthy();
    });

    it('should have titleModelsDetail$ observable', () => {
        expect(query.titleModelsDetail$).toBeTruthy();
    });

    it('should have descriptionModelsDetail$ observable', () => {
        expect(query.descriptionModelsDetail$).toBeTruthy();
    });

    it('should have resultModelsDetail$ observable', () => {
        expect(query.resultModelsDetail$).toBeTruthy();
    });

    it('should have projectModelsDetail$ observable', () => {
        expect(query.projectModelsDetail$).toBeTruthy();
    });

    it('should have timesIaModelsDetail$ observable', () => {
        expect(query.timesIaModelsDetail$).toBeTruthy();
    });

    it('should have timeImpactedModelsDetail$ observable', () => {
        expect(query.timeImpactedModelsDetail$).toBeTruthy();
    });

    it('should have tagsModelsDetail$ observable', () => {
        expect(query.tagsModelsDetail$).toBeTruthy();
    });

    it('should have stewardModelsDetail$ observable', () => {
        expect(query.stewardModelsDetail$).toBeTruthy();
    });

    it('should have ownerModelsDetail$ observable', () => {
        expect(query.ownerModelsDetail$).toBeTruthy();
    });

    it('should have usersModelsDetail$ observable', () => {
        expect(query.usersModelsDetail$).toBeTruthy();
    });

    it('should have badgeModelsDetail$ observable', () => {
        expect(query.badgeModelsDetail$).toBeTruthy();
    });
});
