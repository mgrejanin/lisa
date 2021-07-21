import { Observable, of } from 'rxjs';

import { HttpService, Injectable } from '@nestjs/common';

import { UserInfoViewModel } from '../entities/auth/view-models/user-info.vm';
import { mockUserInfo } from './user-info.mock';

@Injectable()
export class AuthServiceMock {
    constructor() {}

    getUserInfo(accessToken: string): Observable<UserInfoViewModel> {
        return of(mockUserInfo);
    }
}
