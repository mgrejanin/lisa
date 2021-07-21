import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

import { CoreDataAccessConfig, CoreDataAccessModule } from '@picpay/angular/shared/core/data-access';
import {
    CoreNotificationsModule,
    ErrNotificationInterceptor,
    NotificationsService,
} from '@picpay/angular/shared/core/notifications';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { PicpayKeycloakConfig, PicpayKeycloakModule } from '@picpay/keycloak';
import { CommonLayoutsModule } from '@picpay/ui/layouts';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { layoutConfig } from './app.layout.config';
import { AppRoutingModule } from './app.routing.module';

const coreConfig: CoreDataAccessConfig = {
    apiUrl: environment.apiUrl,
};

const keycloakConfig: PicpayKeycloakConfig = {
    clientId: environment.keycloakClientId,
    url: environment.keycloakUrl,
    realm: 'internal-sso',
    onLoad: 'login-required',
    notAllowedRouteRedirectTo: '401',
    loadUserProfileAtStartUp: true,
};

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        CommonLayoutsModule.forRoot(layoutConfig),
        CoreDataAccessModule.forRoot(coreConfig),
        PicpayKeycloakModule.forRoot(keycloakConfig),
        DesignSystemAngularModule.forRoot(),
        CoreNotificationsModule,
        AppRoutingModule,
        environment.production ? [] : AkitaNgDevtools,
    ],
    providers: [
        NotificationsService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrNotificationInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
