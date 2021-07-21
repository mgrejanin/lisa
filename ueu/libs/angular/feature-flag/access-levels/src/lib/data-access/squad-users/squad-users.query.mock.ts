// rxjs
import { Observable, of } from 'rxjs';

// interfaces
import { RolesUser, User } from '../../models';

export class SquadUsersQueryMock {
    readonly filter$: Observable<string> = of('mockFilter');

    readonly roles$: Observable<RolesUser[]> = of([
        {
            id: 'mockRole',
            name: 'Mock Role',
        },
    ]);

    readonly activeSquadId$: Observable<string> = of('mockId');

    readonly filteredUser$: Observable<User[]> = of([]);
}
