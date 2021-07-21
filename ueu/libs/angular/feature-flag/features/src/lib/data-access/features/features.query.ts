import { Injectable } from '@angular/core';

// akita
import { Query } from '@datorama/akita';

// store components
import { FeaturesState, FeaturesStore } from './features.store';

// rxjs
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// interfaces
import { Application, ClientGroup, Feature, FeatureAuditing, Squad } from '../../models';

@Injectable({ providedIn: 'root' })
export class FeaturesQuery extends Query<FeaturesState> {
    activeFeature$: Observable<Feature>;
    activeCommits$: Observable<FeatureAuditing[]>;
    applications$: Observable<Application[]>;
    features$: Observable<Feature[]>;
    isLoading$: Observable<boolean>;
    squads$: Observable<Squad[]>;
    clientGroups$: Observable<ClientGroup[]>;

    constructor(protected store: FeaturesStore) {
        super(store);

        this.activeFeature$ = this.select('activeFeature');
        this.activeCommits$ = this.select('activeCommits').pipe(
            map(activeCommits => {
                const commits = activeCommits || [];
                return [...commits.sort((a, b) => (a.version > b.version ? -1 : 1))];
            }),
        );
        this.applications$ = this.select('applications');
        this.features$ = this.select('features');
        this.isLoading$ = this.select('isLoading');
        this.squads$ = this.select('squads');
        this.clientGroups$ = this.select('clientGroups');
    }
}
