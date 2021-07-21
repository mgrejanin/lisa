import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// data-access
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

// rxjs
import { Subject } from 'rxjs';
import { switchMap, take, takeUntil } from 'rxjs/operators';

// store components
import { SquadUsersQuery } from './squad-users.query';
import { SquadUsersStore } from './squad-users.store';

// interfaces
import { AddRoleUser, RemoveRoleUser, Role, UpdateRoleUser, User } from '../../models';

// @picpay
import { subscribeUntil, Unsubscriber } from '@picpay/angular/shared/helpers';

// akita
import { applyTransaction } from '@datorama/akita';
import { NotificationsService } from '@picpay/angular/shared/core/notifications';
@Injectable({
    providedIn: 'root',
})
export class SquadUsersService {
    @Unsubscriber() private readonly unsubscribe$: Subject<void>;
    @Unsubscriber() private readonly rolesUnsubscribe$: Subject<void>;

    constructor(
        private config: CoreDataAccessService,
        private http: HttpClient,
        private squadUsersStore: SquadUsersStore,
        private squadUsersQuery: SquadUsersQuery,
        private notifications: NotificationsService,
    ) {
        this.unsubscribe$ = new Subject();
        this.rolesUnsubscribe$ = new Subject();
    }

    /*
        This function fetchs the squad users and
        saves them on the store. Also updates activeSquadId for
        squad user role manipulation later.
    */
    getUsers(squadId: string): void {
        this.unsubscribe$.next();

        const url = `${this.config.getConfig().apiUrl}/flags/squads/${squadId}/users`;

        this.http
            .get(url)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((users: User[]) => {
                applyTransaction(() => {
                    this.squadUsersStore.set(users);
                    this.squadUsersStore.update({ activeSquadId: squadId });
                });
            });
    }

    getRoles(): void {
        const url = `${this.config.getConfig().apiUrl}/flags/users/roles/squad`;

        this.http
            .get(url)
            .pipe(takeUntil(this.rolesUnsubscribe$))
            .subscribe((roles: Role[]) => {
                this.squadUsersStore.update({ roles });
            });
    }

    clearStore(): void {
        this.squadUsersStore.reset();
    }

    /* Role manipulation */
    removeUserRole(userId: string, role: string): void {
        const url = `${this.config.getConfig().apiUrl}/flags/users/remove-role`;

        const payload: RemoveRoleUser = {
            id: userId,
            role,
            squad: '',
        };

        this.squadUsersQuery.activeSquadId$
            .pipe(
                switchMap(activeSquadId =>
                    this.http.post(url, {
                        ...payload,
                        squad: activeSquadId,
                    }),
                ),
                take(1),
                subscribeUntil(this),
            )
            .subscribe(() => {
                /*
                    Since removing an squad user role equals to
                    removing them from the squad, i just remove them
                    from the listing after a sucessful response from
                    the backend.
                */
                this.squadUsersStore.remove(userId);
                this.notifications.openSnackbar('Usuário removido');
            });
    }

    addUserRole(userId: string, role: string): void {
        const url = `${this.config.getConfig().apiUrl}/flags/users/add-role`;

        const payload: AddRoleUser = {
            role,
            id: userId,
            squad: '',
        };

        this.squadUsersQuery.activeSquadId$
            .pipe(
                switchMap(activeSquadId =>
                    this.http.post(url, {
                        ...payload,
                        squad: activeSquadId,
                    }),
                ),
                take(1),
                subscribeUntil(this),
            )
            .subscribe((user: User) => {
                /*
                    Since adding an squad user role equals to
                    adding them to the squad, i just add them
                    to the listing after a sucessful response from
                    the backend.
                */

                this.squadUsersStore.add(user);
                this.notifications.openSnackbar('Usuário adicionado');
            });
    }

    updateUserRole(userId: string, role: string, previousRole: string): void {
        this.unsubscribe$.next();

        const payload: UpdateRoleUser = {
            id: userId,
            role,
            squad: '',
        };

        const url = `${this.config.getConfig().apiUrl}/flags/users/update-role`;

        this.squadUsersQuery.activeSquadId$
            .pipe(
                switchMap(activeSquadId =>
                    this.http.post(url, {
                        ...payload,
                        squad: activeSquadId,
                    }),
                ),
                take(1),
                subscribeUntil(this),
            )
            .subscribe(
                (response: { role: string }) => {
                    this.squadUsersStore.update(userId, { role: response.role });
                    this.notifications.openSnackbar('Acesso do usuário editado');
                },
                () => {
                    this.squadUsersStore.update(userId, { role: previousRole });
                },
            );
    }

    /* Filter */
    updateFilter(filter: string): void {
        this.squadUsersStore.update({
            filter,
        });
    }
}
