import { Observable, of } from 'rxjs';

// interfaces
import { User } from '../../models';

export class UsersQueryMock {
    readonly users$: Observable<User[]>;

    constructor() {
        this.users$ = of([]);
    }
}
