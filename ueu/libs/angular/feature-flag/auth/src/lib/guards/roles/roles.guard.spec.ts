import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

// Data access
import { AuthQuery, AuthQueryMock, AuthService, AuthServiceMock } from '../../data-access/auth';

// mocks
import { mockUser } from '../../data-access/auth/mocks/auth-user.mock';
import { FeatureFlagPermissions } from '../../models';

// utils
import { createMockActivatedRoute } from '../../utils/testing';

// guard
import { RolesGuard } from './roles.guard';

describe('RolesGuard', () => {
    let guard: RolesGuard;
    let authService: AuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [
                { provide: AuthQuery, useValue: new AuthQueryMock(true) },
                { provide: AuthService, useValue: new AuthServiceMock(false) },
            ],
        });
        guard = TestBed.inject(RolesGuard);
        authService = TestBed.inject(AuthService);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    // Access allowed test scenarios
    describe('Access Allowed', () => {
        it('Route data is set | has squadId | has user roles)', (done: jest.DoneCallback) => {
            const router = TestBed.inject<Router>(Router);
            const routerSpy = spyOn(router, 'navigate').and.callFake(() => {
                return {};
            });
            const squadId = 'FeatureManagement';
            const next = createMockActivatedRoute({ squadId }) as ActivatedRouteSnapshot;

            const mockDataRoles: FeatureFlagPermissions = {
                availableToAdmin: false,
                availableToEditor: false,
                availableToSquadAdmin: ['MockSquadId'],
                availableToSquadEditor: ['MockSquadId'],
            };

            const expectedDataRoles: FeatureFlagPermissions = {
                ...mockDataRoles,
            };

            expectedDataRoles.availableToSquadAdmin.push(squadId);
            expectedDataRoles.availableToSquadEditor.push(squadId);

            next.data = {
                roles: mockDataRoles,
            };

            const hasPermissionResponse = true;

            const hasPermissionsSpy = spyOn(authService, 'hasPermissions').and.returnValue(hasPermissionResponse);

            const res$ = guard.canActivate(next);

            res$.subscribe(value => {
                expect(value).toEqual(hasPermissionResponse);
                expect(hasPermissionsSpy).toHaveBeenCalledWith(mockUser.roles, expectedDataRoles);
                expect(routerSpy).not.toHaveBeenCalled();
                done();
            });
        });

        it('Route data is set | has user roles | squadId is not set', (done: jest.DoneCallback) => {
            const router = TestBed.inject<Router>(Router);
            const routerSpy = spyOn(router, 'navigate').and.callFake(() => {
                return {};
            });

            const next = createMockActivatedRoute(null) as ActivatedRouteSnapshot;

            const mockDataRoles: FeatureFlagPermissions = {
                availableToAdmin: false,
                availableToEditor: false,
                availableToSquadAdmin: ['MockSquadId'],
                availableToSquadEditor: ['MockSquadId'],
            };

            const expectedDataRoles: FeatureFlagPermissions = {
                ...mockDataRoles,
            };

            next.data = {
                roles: mockDataRoles,
            };

            const hasPermissionResponse = true;
            const hasPermissionsSpy = spyOn(authService, 'hasPermissions').and.returnValue(hasPermissionResponse);
            const res$ = guard.canActivate(next);

            res$.subscribe(value => {
                expect(value).toEqual(hasPermissionResponse);
                expect(hasPermissionsSpy).toHaveBeenCalledWith(mockUser.roles, expectedDataRoles);
                expect(routerSpy).not.toHaveBeenCalled();
                done();
            });
        });
    });

    // Access denied test scenarios
    describe('Access Denied', () => {
        it('Hasnt the needed roles (route data is not set)', (done: jest.DoneCallback) => {
            const router = TestBed.inject<Router>(Router);
            const routerSpy = spyOn(router, 'navigate').and.callFake(() => {
                return {};
            });
            const next = createMockActivatedRoute(null) as ActivatedRouteSnapshot;
            next.data = null;
            const hasPermissionsSpy = spyOn(authService, 'hasPermissions');
            const res$ = guard.canActivate(next);

            res$.subscribe(value => {
                expect(value).toEqual(false);
                expect(hasPermissionsSpy).not.toHaveBeenCalled();
                expect(routerSpy).toHaveBeenCalled();
                done();
            });
        });

        it('Hasnt the needed roles (route data is set)', (done: jest.DoneCallback) => {
            const next = createMockActivatedRoute({ squadId: 'MockSquadId' }) as ActivatedRouteSnapshot;
            const mockDataRoles: FeatureFlagPermissions = {
                availableToAdmin: false,
                availableToEditor: false,
                availableToSquadAdmin: ['MockSquadId'],
                isAvailableToSquadAdmin: true,
                availableToSquadEditor: ['MockSquadId'],
                isAvailableToSquadEditor: true,
            };
            const router = TestBed.inject<Router>(Router);
            const routerSpy = spyOn(router, 'navigate').and.callFake(() => {
                return {};
            });

            next.data = {
                roles: mockDataRoles,
            };

            const hasPermissionsSpy = spyOn(authService, 'hasPermissions').and.returnValue(false);
            const res$ = guard.canActivate(next);

            res$.subscribe(value => {
                expect(value).toEqual(false);
                expect(hasPermissionsSpy).toHaveBeenCalledWith(mockUser.roles, mockDataRoles);
                expect(routerSpy).toHaveBeenCalled();
                done();
            });
        });

        it('Route data and param ok | route permissions incorrect)', (done: jest.DoneCallback) => {
            const next = createMockActivatedRoute({ squadId: 'MockSquadId' }) as ActivatedRouteSnapshot;
            const mockDataRoles: FeatureFlagPermissions = {
                availableToAdmin: false,
                availableToEditor: false,
                availableToSquadAdmin: ['FakeSquadId'],
                availableToSquadEditor: ['FakeSquadId'],
                isAvailableToSquadAdmin: true,
                isAvailableToSquadEditor: true,
            };
            const router = TestBed.inject<Router>(Router);
            const routerSpy = spyOn(router, 'navigate').and.callFake(() => {
                return {};
            });

            next.data = {
                roles: mockDataRoles,
            };

            const hasPermissionsSpy = spyOn(authService, 'hasPermissions').and.returnValue(false);
            const res$ = guard.canActivate(next);

            res$.subscribe(value => {
                expect(value).toEqual(false);
                expect(hasPermissionsSpy).toHaveBeenCalledWith(mockUser.roles, mockDataRoles);
                expect(routerSpy).toHaveBeenCalled();
                done();
            });
        });

        it('SquadId is set, route data is not set)', (done: jest.DoneCallback) => {
            const router = TestBed.inject<Router>(Router);
            const routerSpy = spyOn(router, 'navigate').and.callFake(() => {
                return {};
            });

            const next = createMockActivatedRoute({ squadId: 'MockSquadId' }) as ActivatedRouteSnapshot;
            next.data = null;

            const hasPermissionsSpy = spyOn(authService, 'hasPermissions').and.returnValue(false);
            const res$ = guard.canActivate(next);

            res$.subscribe(value => {
                expect(value).toEqual(false);
                expect(hasPermissionsSpy).not.toHaveBeenCalled();
                expect(routerSpy).toHaveBeenCalled();
                done();
            });
        });
    });
});
