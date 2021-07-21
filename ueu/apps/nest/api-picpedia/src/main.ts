import * as express from 'express';
import { readFileSync } from 'fs';
import * as http from 'http';
import * as https from 'https';

import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

function implementSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
        .setBasePath('api')
        .setTitle('BFF Picpedia')
        .setDescription('Bem vindo ao Backend for frontend do Picpedia.')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);

    const customOptions: SwaggerCustomOptions = {
        swaggerOptions: {
            persistAuthorization: true,
        },
        customSiteTitle: 'BFF Picpedia',
    };

    SwaggerModule.setup('', app, document, customOptions);
}

async function initApp(app: INestApplication, server: express.Express) {
    const httpPort = process.env.HTTP_PORT;
    const httpsPort = process.env.HTTPS_PORT;
    const httpsOptions = {
        key: readFileSync(`${__dirname}/assets/secrets/httpsserver.key`),
        cert: readFileSync(`${__dirname}/assets/secrets/httpsserver.crt`),
    };

    await app.init();

    http.createServer(server).listen(httpPort, () => {
        Logger.log('Listening at http://localhost:' + httpPort);
    });
    https.createServer(httpsOptions, server).listen(httpsPort, () => {
        Logger.log('Listening HTTPS at https://localhost:' + httpsPort);
    });
}

async function bootstrap() {
    const server = express();

    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    app.setGlobalPrefix('api');

    implementSwagger(app);
    await initApp(app, server);
}

bootstrap();
