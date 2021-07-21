import { DashboardsDetailQuery } from './dashboards-detail.query';
import { DashboardsDetailStore } from './dashboards-detail.store';

describe('DashboardsDetailQuery', () => {
    let query: DashboardsDetailQuery;

    beforeEach(() => {
        query = new DashboardsDetailQuery(new DashboardsDetailStore());
    });

    it('should create an instance', () => {
        expect(query).toBeTruthy();
    });

    it('should have isLoadingDisplay$ observable', () => {
        expect(query.isLoadingDisplay$).toBeTruthy();
    });

    it('should have titleDashboardsDetail$ observable', () => {
        expect(query.titleDashboardsDetail$).toBeTruthy();
    });

    it('should have descriptionDashboardsDetail$ observable', () => {
        expect(query.descriptionDashboardsDetail$).toBeTruthy();
    });

    it('should have dateDashboardsDetail$ observable', () => {
        expect(query.dateDashboardsDetail$).toBeTruthy();
    });

    it('should have frequencyDashboardsDetail$ observable', () => {
        expect(query.frequencyDashboardsDetail$).toBeTruthy();
    });

    it('should have scopeDashboardsDetail$ observable', () => {
        expect(query.scopeDashboardsDetail$).toBeTruthy();
    });

    it('should have tagsDashboardsDetail$ observable', () => {
        expect(query.tagsDashboardsDetail$).toBeTruthy();
    });

    it('should have originDashboardsDetail$ observable', () => {
        expect(query.originDashboardsDetail$).toBeTruthy();
    });

    it('should have stewardDashboardsDetail$ observable', () => {
        expect(query.stewardDashboardsDetail$).toBeTruthy();
    });

    it('should have ownerDashboardsDetail$ observable', () => {
        expect(query.ownerDashboardsDetail$).toBeTruthy();
    });

    it('should have usersDashboardsDetail$ observable', () => {
        expect(query.usersDashboardsDetail$).toBeTruthy();
    });

    it('should have badgeDashboardsDetail$ observable', () => {
        expect(query.badgeDashboardsDetail$).toBeTruthy();
    });

    it('should have lookerDashboardsDetail$ observable', () => {
        expect(query.lookerDashboardsDetail$).toBeTruthy();
    });
});
