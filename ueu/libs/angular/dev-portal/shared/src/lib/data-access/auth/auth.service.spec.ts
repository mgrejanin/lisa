import { TestBed } from '@angular/core/testing';

// store components
import { AuthService } from './auth.service';
import { AuthStore } from './auth.store';

describe('AuthService', () => {
    let authService: AuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthService, AuthStore],
        });

        authService = TestBed.inject(AuthService);
    });

    it('should be created', () => {
        expect(authService).toBeDefined();
    });
});
