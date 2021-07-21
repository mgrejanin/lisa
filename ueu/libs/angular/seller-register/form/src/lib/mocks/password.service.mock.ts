import { Observable, of } from 'rxjs';
import { APIResponse } from '../models/response.model';

const postPasswordMock: APIResponse = {
    success: true,
};

export class PasswordServiceMock {
    postPassword(): Observable<APIResponse> {
        return of(postPasswordMock);
    }
}
