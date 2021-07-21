import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

// services
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { MockNotificationsService, NotificationsService } from '@picpay/angular/shared/core/notifications';

// interfaces
import { Role, User } from '../../models';

// store components
import { SquadUsersQuery, SquadUsersService, SquadUsersStore } from '.';

describe('SquadUsersService', () => {
    let service: SquadUsersService;
    let store: SquadUsersStore;

    let configService: CoreDataAccessService;

    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                SquadUsersService,
                SquadUsersQuery,
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com' }),
                    },
                },
                { provide: NotificationsService, useValue: new MockNotificationsService(null) },
            ],
            imports: [HttpClientTestingModule],
        });

        service = TestBed.inject(SquadUsersService);
        store = TestBed.inject(SquadUsersStore);

        configService = TestBed.inject(CoreDataAccessService);

        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should have getSquadUsers function', () => {
        const mockSquadId = 'mockId';

        const expectedUrl = `${configService.getConfig().apiUrl}/flags/squads/${mockSquadId}/users`;

        const mockUsers: User[] = [
            {
                id: 'mockId',
                role: 'admin',
                name: 'mockName',
                fullname: 'mockName',
            },
        ];

        const setSpy = spyOn(store, 'set');
        const updateSpy = spyOn(store, 'update');

        service.getUsers(mockSquadId);
        const request = httpMock.expectOne(expectedUrl);
        request.flush(mockUsers);

        expect(setSpy).toHaveBeenLastCalledWith(mockUsers);
        expect(updateSpy).toHaveBeenLastCalledWith({ activeSquadId: mockSquadId });
    });

    it('should have getRoles function', () => {
        const expectedUrl = `${configService.getConfig().apiUrl}/flags/users/roles/squad`;

        const mockRoles: Role[] = [
            {
                id: 'mockId',
                name: 'mockName',
            },
        ];

        const updateSpy = spyOn(store, 'update');

        service.getRoles();

        const request = httpMock.expectOne(expectedUrl);
        request.flush(mockRoles);

        expect(updateSpy).toHaveBeenLastCalledWith({ roles: mockRoles });
    });

    it('should have a clearStore function', () => {
        const storeSpy = spyOn(store, 'reset');

        service.clearStore();

        expect(storeSpy).toHaveBeenCalled();
    });

    it('should have a addUserRole function', () => {
        const notifications = TestBed.inject(NotificationsService);
        const notificationsSpy = spyOn(notifications, 'openSnackbar');
        const addSpy = spyOn(store, 'add');

        const url = `${configService.getConfig().apiUrl}/flags/users/add-role`;

        const mockUser: User = {
            id: 'mockId',
            role: 'admin',
            name: 'mockName',
            fullname: 'mockName',
        };

        service.addUserRole(mockUser.id, mockUser.role);

        const requestRole = httpMock.expectOne(url);
        requestRole.flush(mockUser);

        expect(requestRole.request.method).toBe('POST');
        expect(addSpy).toHaveBeenCalledWith(mockUser);
        expect(notificationsSpy).toHaveBeenCalledWith('Usuário adicionado');
    });

    it('should have a removeUserRole function', () => {
        const notifications = TestBed.inject(NotificationsService);
        const notificationsSpy = spyOn(notifications, 'openSnackbar');
        const removeSpy = spyOn(store, 'remove');

        const url = `${configService.getConfig().apiUrl}/flags/users/remove-role`;

        const mockUser: User = {
            id: 'mockId',
            role: 'admin',
            name: 'mockName',
            fullname: 'mockName',
        };
        service.removeUserRole(mockUser.id, mockUser.role);

        const requestRole = httpMock.expectOne(url);
        requestRole.flush(mockUser);

        expect(requestRole.request.method).toBe('POST');
        expect(removeSpy).toHaveBeenCalledWith(mockUser.id);
        expect(notificationsSpy).toHaveBeenCalledWith('Usuário removido');
    });

    it('should have a updateUserRole function (success case)', () => {
        const notifications = TestBed.inject(NotificationsService);
        const notificationsSpy = spyOn(notifications, 'openSnackbar');
        const updateSpy = spyOn(store, 'update');

        const expectedUrl = `${configService.getConfig().apiUrl}/flags/users/update-role`;

        const mockUser: User = {
            id: 'mockId',
            role: 'admin',
            name: 'mockName',
            fullname: 'mockName',
        };

        const mockPreviousRole = 'mockPreviousRole';

        service.updateUserRole(mockUser.id, mockUser.role, mockPreviousRole);

        const request = httpMock.expectOne(expectedUrl);
        request.flush(mockUser);

        expect(request.request.method).toBe('POST');
        expect(updateSpy).toHaveBeenCalledWith(mockUser.id, { role: mockUser.role });
        expect(notificationsSpy).toHaveBeenCalledWith('Acesso do usuário editado');
    });

    it('should have a updateUserRole function (error case)', () => {
        const updateSpy = spyOn(store, 'update');

        const expectedUrl = `${configService.getConfig().apiUrl}/flags/users/update-role`;

        const mockUser: User = {
            id: 'mockId',
            role: 'admin',
            name: 'mockName',
            fullname: 'mockName',
        };

        const mockPreviousRole = 'mockPreviousRole';

        service.updateUserRole(mockUser.id, mockUser.role, mockPreviousRole);

        const request = httpMock.expectOne(expectedUrl);
        request.error(null);

        expect(request.request.method).toBe('POST');
        expect(updateSpy).toHaveBeenCalledWith(mockUser.id, { role: mockPreviousRole });
    });

    it('should have a updateFilter function', () => {
        const updateSpy = spyOn(store, 'update');
        const mockFilter = 'mockFilter';

        service.updateFilter(mockFilter);

        expect(updateSpy).toHaveBeenCalledTimes(1);
        expect(updateSpy).toHaveBeenCalledWith({
            filter: mockFilter,
        });
    });
});
