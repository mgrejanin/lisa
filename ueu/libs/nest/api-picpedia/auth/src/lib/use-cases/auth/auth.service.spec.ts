import mockedEnv, { RestoreFn } from 'mocked-env';

import { HttpException, HttpModule } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { failedDependencyError, unauthorizedError } from '../../constants/auth.errors';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    let authService: AuthService;
    let restoreEnvVariablesValue: RestoreFn;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [AuthService],
            imports: [HttpModule],
        }).compile();

        authService = module.get(AuthService);
    });

    afterAll(() => restoreEnvVariablesValue());

    it('should be defined', () => {
        expect(authService).toBeTruthy();
    });

    it('should get a observable if pass valid accessToken and have valid required env variables values', () => {
        restoreEnvVariablesValue = mockedEnv({
            AUTH_ENDPOINT: 'mockEndpoint',
            CLIENT_ID: 'mockId',
            CLIENT_SECRET: 'mockSecret',
        });

        expect(authService.getUserInfo('mockAccessToken')).toBeTruthy();
    });

    it('should throw Unauthorized HttpException if pass invalid accessToken', () => {
        const { msg, status } = unauthorizedError;
        expect(() => {
            authService.getUserInfo('');
        }).toThrow(new HttpException(msg, status));
    });

    it('should throw FailedDependency HttpException if some required env variable are null', () => {
        const { msg, status } = failedDependencyError;
        restoreEnvVariablesValue = mockedEnv({
            AUTH_ENDPOINT: undefined,
            CLIENT_ID: 'mockId',
            CLIENT_SECRET: 'mockSecret',
        });

        expect(() => {
            authService.getUserInfo('mockAccessToken');
        }).toThrow(new HttpException(msg, status));

        restoreEnvVariablesValue = mockedEnv({
            AUTH_ENDPOINT: 'mockEndpoint',
            CLIENT_ID: undefined,
            CLIENT_SECRET: 'mockSecret',
        });

        expect(() => {
            authService.getUserInfo('mockAccessToken');
        }).toThrow(new HttpException(msg, status));

        restoreEnvVariablesValue = mockedEnv({
            AUTH_ENDPOINT: 'mockEndpoint',
            CLIENT_ID: 'mockId',
            CLIENT_SECRET: undefined,
        });

        expect(() => {
            authService.getUserInfo('mockAccessToken');
        }).toThrow(new HttpException(msg, status));
    });
});
