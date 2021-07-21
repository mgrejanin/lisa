import { FeaturesStore } from './features.store';

// interfaces
import { Application, Feature, FeatureAuditing, FeatureType } from '../../models';

describe('FeaturesStore', () => {
    let store: FeaturesStore;

    beforeEach(() => {
        store = new FeaturesStore();
    });

    it('should create an instance', () => {
        expect(store).toBeTruthy();
    });

    it('should have updateFeatures function', () => {
        const updateSpy = spyOn(store, 'update');

        const mockFeatures = [
            new Feature(
                'mockName',
                'mockDescription',
                FeatureType.BOOLEAN,
                'false',
                { name: 'mockAppName', id: 'mockAppId' },
                { name: 'mockSquadName', id: 'mockSquadId' },
                'mockId',
                [],
                [],
                'mockDate',
                'mockDate',
            ),
        ];

        store.updateFeatures(mockFeatures);

        expect(updateSpy).toHaveBeenCalledWith({ features: mockFeatures });
    });

    it('should have updateActiveFeature function', () => {
        const updateSpy = spyOn(store, 'update');

        const mockFeature = new Feature(
            'mockName',
            'mockDescription',
            FeatureType.BOOLEAN,
            'false',
            { name: 'mockAppName', id: 'mockAppId' },
            { name: 'mockSquadName', id: 'mockSquadId' },
            'mockId',
            [],
            [],
            'mockDate',
            'mockDate',
        );

        store.updateActiveFeature(mockFeature);

        expect(updateSpy).toHaveBeenCalledWith({ activeFeature: mockFeature });
    });

    it('should have updateActiveCommits function', () => {
        const updateSpy = spyOn(store, 'update');

        const mockCommits = [new FeatureAuditing('mockId', 'mockMessage', 'mockCreatedAt', 1, 'mockTime', null)];

        store.updateActiveCommits(mockCommits);

        expect(updateSpy).toHaveBeenCalledWith({ activeCommits: mockCommits });
    });

    it('should have updateApplications function', () => {
        const updateSpy = spyOn(store, 'update');

        const mockApp = new Application('mockId', 'mockName');

        store.updateApplications([mockApp]);

        expect(updateSpy).toHaveBeenCalledWith({ applications: [mockApp] });
    });

    it('should have updateSquads function', () => {
        const updateSpy = spyOn(store, 'update');

        const mockSquad = { id: 'mockId', name: 'mockName' };

        store.updateSquads([mockSquad]);

        expect(updateSpy).toHaveBeenCalledWith({ squads: [mockSquad] });
    });

    it('should have updateClientGroups function', () => {
        const updateSpy = spyOn(store, 'update');

        const mockClientGroup = { id: 'mockId', name: 'mockName', app: 'mockApp' };

        store.updateClientGroups([mockClientGroup]);

        expect(updateSpy).toHaveBeenCalledWith({ clientGroups: [mockClientGroup] });
    });
});
