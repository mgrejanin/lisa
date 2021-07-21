// angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// akita
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

// recaptcha
import { RecaptchaV3Module, RECAPTCHA_LANGUAGE, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';

// environment
import { environment } from '../environments/environment';

// components
import { AppComponent } from './app.component';

// modules
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app.routing.module';

// libs
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { CoreDataAccessConfig, CoreDataAccessModule } from '@picpay/angular/shared/core/data-access';
import { SharedTrackEventsModule } from '@picpay/angular/shared/track-events';

// interceptors
import {
    CoreNotificationsModule,
    ErrNotificationInterceptor,
    NotificationsService,
} from '@picpay/angular/shared/core/notifications';

import { RequestInterceptor } from '@picpay/seller-register/config';

const coreConfig: CoreDataAccessConfig = {
    apiUrl: environment.apiUrl,
    // QAOrigin: environment.QAOrigin,
    isProd: environment.production,
};

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        RecaptchaV3Module,
        CoreDataAccessModule.forRoot(coreConfig),
        DesignSystemAngularModule.forRoot(),
        CoreNotificationsModule,
        SharedTrackEventsModule.forRoot(),

        environment.production ? [] : AkitaNgDevtools,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrNotificationInterceptor, multi: true },
        { provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptchaKey },
        {
            provide: RECAPTCHA_LANGUAGE,
            useValue: 'pt-BR',
        },

        NotificationsService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
