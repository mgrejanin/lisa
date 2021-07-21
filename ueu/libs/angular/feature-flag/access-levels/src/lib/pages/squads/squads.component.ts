import { Component, OnDestroy, OnInit } from '@angular/core';

// rxjs
import { Observable } from 'rxjs';

// store components
import { SquadsQuery, SquadsService } from '../../data-access/squads';

// interfaces
import { Squad } from '../../models';

@Component({
    selector: 'feature-flag-squads',
    templateUrl: './squads.component.html',
    styleUrls: ['./squads.component.scss'],
})
export class SquadsComponent implements OnInit, OnDestroy {
    readonly filteredSquads$: Observable<Squad[]>;

    constructor(private accessLevelsService: SquadsService, private accessLevelsQuery: SquadsQuery) {
        this.filteredSquads$ = this.accessLevelsQuery.filteredSquads$;
    }

    ngOnInit(): void {
        this.getSquads();
    }

    ngOnDestroy(): void {
        this.clearFilter();
    }

    getSquads(): void {
        this.accessLevelsService.getSquads();
    }

    updateFilter(value: string): void {
        this.accessLevelsService.updateFilter(value);
    }

    clearFilter(): void {
        this.accessLevelsService.clearFilter();
    }
}
