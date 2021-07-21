// interfaces
import { Feature, UpdateFeatureParams, FeatureType, FeatureCreate } from '../../../models';

export class FeaturesServiceMock {
    getFeature(id: string): void {}

    getFeatures(): void {}

    createFeature(feature: FeatureCreate): void {}

    updateFeature(id: string, params: UpdateFeatureParams): void {}

    deleteFeature(id: string): void {}

    setActiveFeature(feature: Feature): void {}

    getCommits(id: string): void {}

    getApplications(): void {}

    getSquads(): void {}

    getClientGroups(application: string): void {}

    getTypeName(type: FeatureType): string {
        return 'typeName';
    }
}
