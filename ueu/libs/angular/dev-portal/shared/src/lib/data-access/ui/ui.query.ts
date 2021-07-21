import { Injectable } from '@angular/core';

// akita
import { Query } from '@datorama/akita';

// store components
import { UiState, UiStore } from './ui.store';

// rxjs
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UiQuery extends Query<UiState> {
    isMobile$: Observable<boolean>;
    isSafari$: Observable<boolean>;

    constructor(protected store: UiStore) {
        super(store);

        this.isMobile$ = this.select(state => state.isMobile);
        this.isSafari$ = this.select(state => state.isSafari);
    }
}
