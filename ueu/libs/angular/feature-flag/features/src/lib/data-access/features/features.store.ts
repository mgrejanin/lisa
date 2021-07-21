import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

// interfaces
import { Application, ClientGroup, Feature, FeatureAuditing, Squad } from '../../models';

export interface FeaturesState {
    features: Feature[];
    activeFeature: Feature;
    activeCommits: FeatureAuditing[];
    isLoading: boolean;
    applications: Application[];
    squads: Squad[];
    clientGroups: ClientGroup[];
}

export function createInitialState(): FeaturesState {
    return {
        features: [],
        activeFeature: null,
        activeCommits: null,
        isLoading: false,
        applications: [],
        squads: [],
        clientGroups: [],
    };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'features' })
export class FeaturesStore extends Store<FeaturesState> {
    constructor() {
        super(createInitialState());
    }

    updateFeatures(features: Feature[]): void {
        this.update({ features });
    }

    updateActiveFeature(feature: Feature): void {
        this.update({ activeFeature: feature });
    }

    updateActiveCommits(commits: FeatureAuditing[]): void {
        this.update({ activeCommits: commits });
    }

    updateApplications(applications: Application[]): void {
        this.update({ applications });
    }

    updateSquads(squads: Squad[]): void {
        this.update({ squads });
    }

    updateClientGroups(clientGroups: ClientGroup[]): void {
        this.update({ clientGroups });
    }
}
