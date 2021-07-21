// @angular
import { TestBed } from '@angular/core/testing';

// data access
import { AuthQuery, AuthQueryMock, AuthService, AuthServiceMock } from '../../data-access';

// mocks
import { mockUser } from '../../data-access/auth/mocks/auth-user.mock';

// guard
import { AnyAdminGuard } from './any-admin.guard';

describe('AnyAdminGuard', () => {
    let guard: AnyAdminGuard;
    let authService: AuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: AuthQuery, useValue: new AuthQueryMock(true) },
                { provide: AuthService, useValue: new AuthServiceMock(false) },
            ],
        });
        guard = TestBed.inject(AnyAdminGuard);
        authService = TestBed.inject(AuthService);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    it('should be able to activate route if the user is admin', (done: jest.DoneCallback) => {
        const isAdminResponse = true;
        const isAdminSpy = spyOn(authService, 'isAdmin').and.returnValue(isAdminResponse);
        const res$ = guard.canActivate();

        res$.subscribe(value => {
            expect(value).toEqual(isAdminResponse);
            expect(isAdminSpy).toHaveBeenCalledWith(mockUser.roles);

            done();
        });
    });

    it('should be able to load route children if the user is admin', (done: jest.DoneCallback) => {
        const isAdminResponse = true;
        const isAdminSpy = spyOn(authService, 'isAdmin').and.returnValue(isAdminResponse);
        const res$ = guard.canLoad();

        res$.subscribe(value => {
            expect(value).toEqual(isAdminResponse);
            expect(isAdminSpy).toHaveBeenCalledWith(mockUser.roles);

            done();
        });
    });
});
