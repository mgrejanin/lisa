// @angular
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { createFeatureFlagPermissions, FeatureFlagPermissions } from '@picpay/feature-flag/auth';

// @picpay
import { NotificationsService } from '@picpay/angular/shared/core/notifications';

// rxjs
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

// component
import { UserCreateComponent } from '../../components/user-create/user-create.component';

// store components
import { SquadUsersQuery, SquadUsersService } from '../../data-access/squad-users';
import { SquadsQuery, SquadsService } from '../../data-access/squads';

// interfaces
import { RolesUser, Squad, User } from '../../models';

@Component({
    selector: 'feature-flag-user-management',
    templateUrl: './user-management.component.html',
    styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit, OnDestroy {
    readonly displayedColumns: string[];
    readonly dataSource$: Observable<MatTableDataSource<User>>;
    readonly roles$: Observable<RolesUser[]>;
    readonly squads$: Observable<Squad[]>;

    private roleSubscription: Subscription;
    private roles: RolesUser[];

    squadId: string;

    // roles
    canShow: FeatureFlagPermissions;

    constructor(
        private squadUsersService: SquadUsersService,
        private squadUsersQuery: SquadUsersQuery,
        private squadsService: SquadsService,
        private squadsQuery: SquadsQuery,
        private dialog: MatDialog,
        private modalsService: NotificationsService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        // Setting the displayed columns
        this.displayedColumns = ['name', 'email', 'role', 'action'];
        this.roles = [];
        this.roles$ = this.squadUsersQuery.roles$;
        this.squads$ = this.squadsQuery.squads$;

        this.dataSource$ = this.squadUsersQuery.filteredUser$.pipe(
            map(squadUsers => new MatTableDataSource(squadUsers)),
        );
    }

    ngOnInit(): void {
        /* Will get users based on the id of the route  */
        this.route.params.pipe(take(1)).subscribe(async params => {
            if (!params || !params.squadId) {
                await this.onReturn();

                return;
            }
            this.squadId = params.squadId;
            // roles
            this.canShow = createFeatureFlagPermissions({
                availableToAdmin: true,
                availableToSquadAdmin: [params.squadId],
            });

            // TODO: Add a endpoint to get only the squad by id
            this.squadsService.getSquads();
            this.squadUsersService.getUsers(params.squadId);
            this.squadUsersService.getRoles();
        });

        this.roleSubscription = this.roles$.subscribe(roles => (this.roles = roles));
    }

    /**
     * We call clear store on destroy to avoid showing
     * wrong squad users or roles while the next one loads.
     *
     * @memberof UserManagementComponent
     */
    ngOnDestroy(): void {
        this.roleSubscription.unsubscribe();
        this.squadUsersService.clearStore();
    }

    /**
     * Removes user from the squad / group.
     * First it prompts a confirmation modal.
     *
     * @param {string} userId
     * @param {string} role
     * @memberof UserManagementComponent
     */
    onRemoveUser(userId: string, role: string): void {
        const modalRef = this.modalsService.openConfirmationModal(
            'Remover Usuário',
            'Deseja realmente remover este usuário?',
        );

        modalRef
            .afterClosed()
            .pipe(take(1))
            .subscribe(async reason => {
                if (reason && reason.confirm) {
                    this.squadUsersService.removeUserRole(userId, role);
                }
            });
    }

    /**
     * Opens the search user modal and after the confirmations,
     * adds user to the squad / group.
     *
     * @memberof UserManagementComponent
     */
    onAddUser(): void {
        const modalRef: MatDialogRef<UserCreateComponent> = this.dialog.open(UserCreateComponent, {
            panelClass: 'o-modal',
            data: {
                title: 'Adicionar usuários',
                message: 'Os usuários adicionados podem gerenciar todos os acessos.',
            },
        });

        modalRef
            .afterClosed()
            .pipe(take(1))
            .subscribe(async reason => {
                if (reason && reason.selectedRole && reason.selectedUser?.id) {
                    const selectedRole: string = reason.selectedRole;
                    const selectedUser: User = reason.selectedUser;

                    this.squadUsersService.addUserRole(selectedUser.id, selectedRole);
                }
            });
    }

    /**
     * Updates the user role
     *
     * @param {string} id
     * @param {string} role
     * @param {string} previousRole
     * @memberof UserManagementComponent
     */
    updateUserAccessRole(id: string, role: string, previousRole: string): void {
        this.squadUsersService.updateUserRole(id, role, previousRole);
    }

    updateFilter(value: string): void {
        this.squadUsersService.updateFilter(value);
    }

    userRole(user: User): RolesUser {
        return this.roles.find(role => role.id === user.role);
    }

    /* utils */
    async onReturn(): Promise<void> {
        await this.router.navigate(['../']);
    }

    get squad$(): Observable<Squad> {
        return this.squads$.pipe(
            take(1),
            map(squads => squads.find(squad => squad.id === this.squadId)),
        );
    }
}
