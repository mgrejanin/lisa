import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

// data-access
import { AuthQuery, AuthQueryMock, AuthService, AuthServiceMock } from '../../data-access';

// guard
import { ProfileGuard } from './profile.guard';

describe('ProfileGuard', () => {
    let guard: ProfileGuard;
    let authService: AuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [
                { provide: AuthQuery, useValue: new AuthQueryMock(true) },
                { provide: AuthService, useValue: new AuthServiceMock(false) },
            ],
        });
    });

    it('should be created', () => {
        guard = TestBed.inject(ProfileGuard);

        expect(guard).toBeTruthy();
    });

    it('should call getProfiles when user is null', (done: jest.DoneCallback) => {
        guard = TestBed.inject(ProfileGuard);
        authService = TestBed.inject(AuthService);

        const serviceSpy = spyOn(authService, 'getProfile').and.returnValue(of({}));

        const res$ = guard.canActivate();

        res$.subscribe(value => {
            expect(value).toBeTruthy();
            expect(serviceSpy).toHaveBeenCalled();
            done();
        });
    });

    it('should return true when user is not null', (done: jest.DoneCallback) => {
        TestBed.overrideProvider(AuthQuery, { useValue: { user$: of(true) } });

        guard = TestBed.inject(ProfileGuard);
        authService = TestBed.inject(AuthService);

        const serviceSpy = spyOn(authService, 'getProfile').and.returnValue(of({}));

        const res$ = guard.canLoad();

        res$.subscribe(value => {
            expect(value).toBeTruthy();
            expect(serviceSpy).not.toHaveBeenCalled();
            done();
        });
    });
});
