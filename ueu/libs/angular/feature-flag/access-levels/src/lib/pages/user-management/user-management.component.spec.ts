// @angular
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatOption } from '@angular/material/core';
import { MatDialog, MatDialogConfig, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelect } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FeatureFlagAuthDirectivesModule } from '@picpay/feature-flag/auth';

// modules
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { SharedModule } from '@picpay/feature-flag/shared';

//  services & mocks
import { MockNotificationsService, NotificationsService } from '@picpay/angular/shared/core/notifications';

// ng-mocks
import { MockComponents, MockModule } from 'ng-mocks';

// rxjs
import { of } from 'rxjs';

// components
import { SearchComponent } from '../../components/search/search.component';
import { UserCreateComponent } from '../../components/user-create/user-create.component';
import { UserManagementComponent } from './user-management.component';

// store components
import { SquadUsersQuery, SquadUsersService, SquadUsersServiceMock } from '../../data-access/squad-users';
import { SquadUsersQueryMock } from '../../data-access/squad-users/squad-users.query.mock';
import { SquadsQuery, SquadsQueryMock, SquadsService, SquadsServiceMock } from '../../data-access/squads';

// models
import { RolesUser, Squad, User } from '../../models';

describe('UserManagementComponent', () => {
    let component: UserManagementComponent;
    let fixture: ComponentFixture<UserManagementComponent>;
    let squadUsersService: SquadUsersService;

    const mockData = { title: 'mockTitle', message: 'mockMessage' };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                UserManagementComponent,
                MockComponents(SearchComponent, MatOption, MatSelect, UserCreateComponent),
            ],
            imports: [
                MockModule(MatIconModule),
                MockModule(MatTableModule),
                MockModule(MatFormFieldModule),
                MockModule(MatMenuModule),
                MockModule(DesignSystemAngularModule),
                MockModule(MatSidenavModule),
                MockModule(MatInputModule),
                MockModule(MatListModule),
                MockModule(DesignSystemAngularModule),
                MockModule(MatDialogModule),
                MockModule(SharedModule),
                MockModule(FeatureFlagAuthDirectivesModule),
                RouterTestingModule.withRoutes([
                    {
                        path: '',
                        data: { trackData: { eventLabel: 'MockLabel' } },
                        component: UserManagementComponent,
                    },
                    {
                        path: ':squadId',
                        data: { trackData: { eventLabel: 'MockLabel' } },
                        component: UserManagementComponent,
                    },
                ]),
            ],
            providers: [
                { provide: NotificationsService, useValue: new MockNotificationsService({ confirm: true }) },
                { provide: ActivatedRoute, useValue: { parent: {} } },
                { provide: MatSnackBar, useValue: { open: () => null } },
                { provide: SquadUsersQuery, useClass: SquadUsersQueryMock },
                { provide: SquadUsersService, useClass: SquadUsersServiceMock },
                { provide: SquadsService, useClass: SquadsServiceMock },
                { provide: SquadsQuery, useClass: SquadsQueryMock },
                { provide: MAT_DIALOG_DATA, useValue: mockData },
                { provide: MatDialogRef, useValue: { close: () => null, open: () => null } },
                RouterTestingModule,
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: of({ squadId: 'testId' }),
                    },
                },
            ],
        }).compileComponents();
    });

    describe('with valid id on url', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(UserManagementComponent);
            component = fixture.componentInstance;
            squadUsersService = TestBed.inject(SquadUsersService);
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should call getUsers and getRoles on ngOnInit', () => {
            const getUsersSpy = spyOn(squadUsersService, 'getUsers');
            const getRolesSpy = spyOn(squadUsersService, 'getRoles');

            component.ngOnInit();

            expect(getUsersSpy).toHaveBeenCalledWith('testId');
            expect(getRolesSpy).toHaveBeenCalled();
        });

        it('should call clear store onDestroy', () => {
            const clearSpy = spyOn(squadUsersService, 'clearStore');

            component.ngOnDestroy();

            expect(clearSpy).toHaveBeenCalled();
        });

        it('should have onRemoveUser function (confirm = true)', () => {
            const service = TestBed.inject(SquadUsersService);

            const notificationsService = TestBed.inject(NotificationsService);

            const mockRef = { afterClosed: () => of({ confirm: true }) };
            const notificationSpy = spyOn(notificationsService, 'openConfirmationModal').and.returnValue(mockRef);

            const removeUserSpy = spyOn(service, 'removeUserRole');
            const userId = 'userId';
            const role = 'role';

            component.onRemoveUser(userId, role);

            expect(notificationSpy).toHaveBeenCalledWith('Remover Usuário', 'Deseja realmente remover este usuário?');
            expect(removeUserSpy).toHaveBeenCalledWith(userId, role);
        });

        it('should have onRemoveUser function (confirm = false)', () => {
            const service = TestBed.inject(SquadUsersService);

            const notificationsService = TestBed.inject(NotificationsService);

            const mockRef = { afterClosed: () => of(null) };
            const notificationSpy = spyOn(notificationsService, 'openConfirmationModal').and.returnValue(mockRef);

            const removeUserSpy = spyOn(service, 'removeUserRole');
            const userId = 'userId';
            const role = 'role';

            component.onRemoveUser(userId, role);

            expect(notificationSpy).toHaveBeenCalledWith('Remover Usuário', 'Deseja realmente remover este usuário?');
            expect(removeUserSpy).not.toHaveBeenCalled();
        });

        it('should have updateUserRole function', () => {
            const spy = spyOn(squadUsersService, 'updateUserRole');

            const mockId = 'mockId';
            const mockRole = 'mockRole';
            const mockAuxRole = 'mockAuxRole';

            component.updateUserAccessRole(mockId, mockRole, mockAuxRole);
            expect(spy).toHaveBeenCalledWith(mockId, mockRole, mockAuxRole);
        });

        it('should have onAddUser function (valid return from modal)', () => {
            const dialogService = TestBed.inject(MatDialog);

            const mockConfig: MatDialogConfig = {
                panelClass: 'o-modal',
                data: {
                    title: 'Adicionar usuários',
                    message: 'Os usuários adicionados podem gerenciar todos os acessos.',
                },
            };

            const mockRole = 'mockRole';
            const mockUser = { id: 'mockId' };

            const mockRef = { afterClosed: () => of({ selectedRole: mockRole, selectedUser: mockUser }) };

            const openDialogSpy = spyOn(dialogService, 'open').and.returnValue(mockRef);
            const addUserSpy = spyOn(squadUsersService, 'addUserRole');

            fixture.detectChanges();
            component.onAddUser();

            expect(openDialogSpy).toHaveBeenCalledWith(UserCreateComponent, mockConfig);
            expect(addUserSpy).toHaveBeenCalledWith(mockUser.id, mockRole);
        });

        it('should have onAddUser function (invalid return from modal)', () => {
            const dialogService = TestBed.inject(MatDialog);

            const mockConfig: MatDialogConfig = {
                panelClass: 'o-modal',
                data: {
                    title: 'Adicionar usuários',
                    message: 'Os usuários adicionados podem gerenciar todos os acessos.',
                },
            };

            const mockRole = 'mockRole';
            const mockUser = 'mockString';

            const mockRef = { afterClosed: () => of({ selectedRole: mockRole, selectedUser: mockUser }) };

            const openDialogSpy = spyOn(dialogService, 'open').and.returnValue(mockRef);
            const addUserSpy = spyOn(squadUsersService, 'addUserRole');

            fixture.detectChanges();
            component.onAddUser();

            expect(openDialogSpy).toHaveBeenCalledWith(UserCreateComponent, mockConfig);
            expect(addUserSpy).not.toHaveBeenCalled();
        });

        it('should not call addUserRole function without correct params', () => {
            const dialogService = TestBed.inject(MatDialog);

            const mockConfig: MatDialogConfig = {
                panelClass: 'o-modal',
                data: {
                    title: 'Adicionar usuários',
                    message: 'Os usuários adicionados podem gerenciar todos os acessos.',
                },
            };

            const mockRole = 'mockRole';

            const mockRef = { afterClosed: () => of({ selectedRole: mockRole }) };

            const openDialogSpy = spyOn(dialogService, 'open').and.returnValue(mockRef);
            const addUserSpy = spyOn(squadUsersService, 'addUserRole');

            fixture.detectChanges();
            component.onAddUser();

            expect(openDialogSpy).toHaveBeenCalledWith(UserCreateComponent, mockConfig);
            expect(addUserSpy).not.toHaveBeenCalled();
        });

        it('should have roles$ observable', () => {
            expect(component.roles$).toBeDefined();
            component.roles$.subscribe(result => result.toString === null);
        });

        it('should have updateFilter function', () => {
            const service = TestBed.inject(SquadUsersService);
            const mock = 'mockValue';
            const spy = spyOn(service, 'updateFilter');

            component.updateFilter(mock);

            expect(spy).toHaveBeenCalledWith(mock);
        });

        it('should have userRole function', () => {
            const mockUser: User = {
                id: 'mockId',
                name: 'mockName',
                fullname: 'mockFullname',
                email: 'mockEmail',
                picture: 'mockPicture',
                role: 'mockRole',
            };

            const returnValue: RolesUser = component.userRole(mockUser);

            expect(returnValue.id).toEqual(mockUser.role);
        });
    });

    describe('without valid id on url', () => {
        beforeEach(() => {
            TestBed.overrideProvider(ActivatedRoute, {
                useValue: {
                    params: of(undefined),
                },
            });

            fixture = TestBed.createComponent(UserManagementComponent);
            component = fixture.componentInstance;
            squadUsersService = TestBed.inject(SquadUsersService);
            fixture.detectChanges();
        });

        it('should navigate to module root onInit', () => {
            const router = TestBed.inject(Router);

            const navigateSpy = spyOn(router, 'navigate');

            component.ngOnInit();

            expect(navigateSpy).toHaveBeenCalled();
        });
    });

    it('should have userRole function', (done: jest.DoneCallback) => {
        const routeSquadId = 'mockSquad';

        component.squadId = routeSquadId;

        const expectedSquad: Squad = { id: 'mockSquad', name: 'Mock Squad' };

        component.squad$.subscribe(squadFound => {
            expect(squadFound).toEqual(expectedSquad);
            done();
        });
    });
});
