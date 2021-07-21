import { Controller, Get, Headers } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get()
    @ApiBearerAuth()
    getUserInfo(@Headers('Authorization') accessToken) {
        return this.authService.getUserInfo(accessToken);
    }
}
