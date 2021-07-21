import { Observable, of } from 'rxjs';

export class CheckPasswordServiceMock {
    verifyPassword(body: { password: string }): Observable<{ message: string }> {
        return of({ message: 'success' });
    }
}
