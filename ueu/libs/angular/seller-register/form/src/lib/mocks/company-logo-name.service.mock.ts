import { Observable, of } from 'rxjs';
import { APIResponse } from '../models/response.model';

const postCompanyLogoNameMock: APIResponse = {
    success: true,
};

export class CompanyLogoNameServiceMock {
    postCompanyLogoName(): Observable<APIResponse> {
        return of(postCompanyLogoNameMock);
    }
}
