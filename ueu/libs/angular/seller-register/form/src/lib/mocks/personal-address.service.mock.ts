import { Observable, of } from 'rxjs';
import { APIResponse } from '../models/response.model';

const postPersonalAddressMock: APIResponse = {
    success: true,
};

export class PersonalAddressServiceMock {
    postPersonalAddress(): Observable<APIResponse> {
        return of(postPersonalAddressMock);
    }
}
