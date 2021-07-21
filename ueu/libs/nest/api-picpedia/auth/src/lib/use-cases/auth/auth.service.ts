import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { stringify } from 'querystring';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { HttpException, HttpService, Injectable } from '@nestjs/common';

import { failedDependencyError, unauthorizedError } from '../../constants/auth.errors';
import { UserInfoRequestErrorDTO, UserInfoViewModel } from '../../entities';

@Injectable()
export class AuthService {
    constructor(private http: HttpService) {}

    getUserInfo(accessToken: string): Observable<UserInfoViewModel> {
        if (!accessToken) {
            const { msg, status } = unauthorizedError;
            throw new HttpException(msg, status);
        }

        const userInfoEndpoint = process.env.AUTH_ENDPOINT;
        const clientID = process.env.CLIENT_ID;
        const clientSecret = process.env.CLIENT_SECRET;

        if (!(userInfoEndpoint && clientID && clientSecret)) {
            const { msg, status } = failedDependencyError;
            throw new HttpException(msg, status);
        }

        const requestBody = stringify({
            token: `Bearer ${accessToken}`,
            client_id: clientID,
            client_secret: clientSecret,
        });

        const requestConfig: AxiosRequestConfig = {
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        };

        return this.http.post<UserInfoViewModel>(userInfoEndpoint, requestBody, requestConfig).pipe(
            map(axiosResponse => this.handleGetUserInfoResponse(axiosResponse)),
            catchError(({ response: { data, status } }: AxiosError<UserInfoRequestErrorDTO>) => {
                throw new HttpException(data.error_description, status);
            }),
        );
    }

    private handleGetUserInfoResponse(response: AxiosResponse<UserInfoViewModel>): UserInfoViewModel {
        const { data: userInfoViewModel } = response;

        return userInfoViewModel;
    }
}
