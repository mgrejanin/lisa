import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable()
export class SidenavService {
    opened$: Subject<boolean>;
    closed$: Subject<boolean>;
    showCloseButton$: Subject<boolean>;
    next$: Subject<void>;
    previous$: Subject<void>;
    unsubscribe$: Subject<void>;

    constructor() {
        this.opened$ = new Subject();
        this.closed$ = new Subject();
        this.showCloseButton$ = new Subject();
        this.next$ = new Subject();
        this.previous$ = new Subject();

        this.showCloseButton$.next(true);
    }

    open() {
        this.opened$.next(true);
    }

    close() {
        this.opened$.next(false);
    }

    closed() {
        this.closed$.next(true);
    }

    next() {
        this.next$.next();
    }

    previous() {
        this.previous$.next();
    }

    toggleCloseBtn(value: boolean) {
        this.showCloseButton$.next(value);
    }
}
