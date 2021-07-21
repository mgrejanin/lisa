// rxjs
import { Observable, of } from 'rxjs';

// interfaces
import { Squad } from '../../models';

export class SquadsQueryMock {
    readonly filter$: Observable<string>;
    readonly filteredSquads$: Observable<Squad[]>;
    readonly squads$: Observable<Squad[]>;

    constructor() {
        this.filter$ = of('mockFilter');
        this.filteredSquads$ = of(null);
        this.squads$ = of([
            {
                id: 'mockSquad',
                name: 'Mock Squad',
            },
        ]);
    }
}
