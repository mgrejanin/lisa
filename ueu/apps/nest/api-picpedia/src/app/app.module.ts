import { Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { AuthModule } from '@picpay/api-picpedia/auth';
import { GetDashboardsModule } from '@picpay/api-picpedia/business-glossary';

const environmentConfig: ConfigModuleOptions = { isGlobal: true };

@Module({
    imports: [ConfigModule.forRoot(environmentConfig), AuthModule, GetDashboardsModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
