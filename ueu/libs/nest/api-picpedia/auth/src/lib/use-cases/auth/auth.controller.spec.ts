import { HttpModule } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AuthServiceMock } from '../../mocks/auth.service.mock';
import { mockUserInfo } from '../../mocks/user-info.mock';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
    let authController: AuthController;
    let authService: AuthService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [{ provide: AuthService, useClass: AuthServiceMock }],
            controllers: [AuthController],
            imports: [HttpModule],
        }).compile();

        authController = module.get(AuthController);
        authService = module.get(AuthService);
    });

    it('should be defined', () => {
        expect(authController).toBeTruthy();
    });

    it('should get mockUserInfo if pass valid accessToken and have valid required env variables values', (done: jest.DoneCallback) => {
        const authServiceSpy = jest.spyOn(authService, 'getUserInfo');

        authController.getUserInfo('mockAccessToken').subscribe(response => {
            expect(response).toBeDefined();
            expect(response).toStrictEqual(mockUserInfo);
            expect(authServiceSpy).toBeCalledTimes(1);
            done();
        });
    });
});
