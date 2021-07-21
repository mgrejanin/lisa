// modules
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// akita
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { PicpayKeycloakConfig, PicpayKeycloakModule } from '@picpay/keycloak';

// libs
import { CoreDataAccessConfig, CoreDataAccessModule } from '@picpay/angular/shared/core/data-access';

// interceptors
import {
    CoreNotificationsModule,
    ErrNotificationInterceptor,
    NotificationsService,
} from '@picpay/angular/shared/core/notifications';
import { CommonLayoutsModule } from '@picpay/ui/layouts';

// environment
import { environment } from '../environments/environment';

// components
import { AppComponent } from './app.component';

// configs
import { layoutConfig } from './app.layout.config';
import { AppRoutingModule } from './app.routing.module';

const coreConfig: CoreDataAccessConfig = {
    apiUrl: environment.authUrl,
};

const keycloakConfig: PicpayKeycloakConfig = {
    clientId: environment.clientId,
    realm: environment.realm,
    url: environment.keycloakUrl,
    onLoad: 'login-required',
    notAllowedRouteRedirectTo: '/',
};

@NgModule({
    declarations: [AppComponent],
    imports: [
        environment.production ? [] : AkitaNgDevtools,
        AppRoutingModule,
        CoreDataAccessModule.forRoot(coreConfig),
        PicpayKeycloakModule.forRoot(keycloakConfig),
        BrowserAnimationsModule,
        BrowserModule,
        CommonLayoutsModule.forRoot(layoutConfig),
        CoreNotificationsModule,
        HttpClientModule,
        DesignSystemAngularModule.forRoot(),
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ErrNotificationInterceptor, multi: true },
        NotificationsService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
