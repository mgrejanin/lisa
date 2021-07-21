// angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// akita
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

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
import { CommonLayoutsModule } from '@picpay/ui/layouts';

// keycloak
import { PicpayKeycloakConfig, PicpayKeycloakModule } from '@picpay/keycloak';

// configs
import { layoutConfig } from './app.layout.config';

// interceptors
import {
    CoreNotificationsModule,
    ErrNotificationInterceptor,
    NotificationsService,
} from '@picpay/angular/shared/core/notifications';

const coreConfig: CoreDataAccessConfig = {
    apiUrl: environment.apiUrl,
    isProd: environment.production,
};

const keycloakConfig: PicpayKeycloakConfig = {
    clientId: environment.keycloakClientId,
    realm: environment.keycloakRealm,
    url: environment.keycloakUrl,
    onLoad: 'login-required',
    notAllowedRouteRedirectTo: '401',
    loadUserProfileAtStartUp: true,
};

@NgModule({
    declarations: [AppComponent],
    imports: [
        environment.production ? [] : AkitaNgDevtools,
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        CommonLayoutsModule.forRoot(layoutConfig),
        CoreDataAccessModule.forRoot(coreConfig),
        CoreNotificationsModule,
        PicpayKeycloakModule.forRoot(keycloakConfig),
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
