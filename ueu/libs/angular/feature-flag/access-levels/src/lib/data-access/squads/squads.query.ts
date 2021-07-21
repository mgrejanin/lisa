import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';

// akita
import { QueryEntity } from '@datorama/akita';

// store components
import { AccessLevelsState, SquadsStore } from './squads.store';

// interfaces
import { Squad } from '../../models';

// rxjs
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SquadsQuery extends QueryEntity<AccessLevelsState, Squad> {
    readonly filter$: Observable<string>;
    readonly filteredSquads$: Observable<Squad[]>;
    readonly squads$: Observable<Squad[]>;

    constructor(protected store: SquadsStore) {
        super(store);

        this.filter$ = this.select('filter');

        // TODO: Find a way to include this on the coverage
        /* istanbul ignore next */
        this.filteredSquads$ = this.filter$.pipe(
            switchMap(filter =>
                this.selectAll({
                    filterBy: entity =>
                        filter === 'ALL' ? true : entity.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1,
                }),
            ),
        );

        this.squads$ = this.selectAll();
    }
}
