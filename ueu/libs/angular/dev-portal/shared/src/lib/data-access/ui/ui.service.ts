import { Injectable, OnDestroy } from '@angular/core';

import { BreakpointObserver } from '@angular/cdk/layout';
import { Subject } from 'rxjs';

import { UiStore } from './ui.store';

@Injectable({
    providedIn: 'root',
})
export class UiService implements OnDestroy {
    private readonly unsubscribe$: Subject<void>;

    constructor(private breakpointObserver: BreakpointObserver, private store: UiStore) {
        this.unsubscribe$ = new Subject();
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    detectMobile(): void {
        this.breakpointObserver.observe('(max-width: 768px)').subscribe(result => {
            this.store.updateIsMobile(result.matches);
        });
    }
}
