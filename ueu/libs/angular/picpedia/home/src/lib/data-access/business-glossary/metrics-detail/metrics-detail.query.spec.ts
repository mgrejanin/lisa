import { MetricsDetailQuery } from './metrics-detail.query';
import { MetricsDetailStore } from './metrics-detail.store';

describe('MetricsDetailQuery', () => {
    let query: MetricsDetailQuery;

    beforeEach(() => {
        query = new MetricsDetailQuery(new MetricsDetailStore());
    });

    it('should create an instance', () => {
        expect(query).toBeTruthy();
    });

    it('should have isLoadingDisplay$ observable', () => {
        expect(query.isLoadingDisplay$).toBeTruthy();
    });

    it('should have titleMetricsDetail$ observable', () => {
        expect(query.titleMetricsDetail$).toBeTruthy();
    });

    it('should have descriptionMetricsDetail$ observable', () => {
        expect(query.descriptionMetricsDetail$).toBeTruthy();
    });

    it('should have ruleMetricsDetail$ observable', () => {
        expect(query.ruleMetricsDetail$).toBeTruthy();
    });

    it('should have tagsMetricsDetail$ observable', () => {
        expect(query.tagsMetricsDetail$).toBeTruthy();
    });

    it('should have stewardMetricsDetail$ observable', () => {
        expect(query.stewardMetricsDetail$).toBeTruthy();
    });

    it('should have ownerMetricsDetail$ observable', () => {
        expect(query.ownerMetricsDetail$).toBeTruthy();
    });

    it('should have usersMetricsDetail$ observable', () => {
        expect(query.usersMetricsDetail$).toBeTruthy();
    });

    it('should have badgeMetricsDetail$ observable', () => {
        expect(query.badgeMetricsDetail$).toBeTruthy();
    });
});
