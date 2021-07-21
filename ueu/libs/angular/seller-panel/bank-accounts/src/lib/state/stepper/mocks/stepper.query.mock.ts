import { Observable, of } from 'rxjs';

export class StepperQueryMock {
    readonly isSelectingBank$: Observable<boolean>;
    readonly closed$: Observable<boolean>;
    readonly next$: Observable<boolean>;
    readonly previous$: Observable<boolean>;
    readonly isEdit$: Observable<boolean>;
    constructor() {
        this.isSelectingBank$ = of(false);
        this.closed$ = of(true);
        this.next$ = of(false);
        this.previous$ = of(false);
        this.isEdit$ = of(true);
    }
}
