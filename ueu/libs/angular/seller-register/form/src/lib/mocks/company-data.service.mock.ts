import { Observable, of } from 'rxjs';
import { APIResponse } from '../models/response.model';

const postCompanyDataMock: APIResponse = {
    success: true,
};

export class CompanyDataServiceMock {
    postCompanyData(): Observable<APIResponse> {
        return of(postCompanyDataMock);
    }
}
