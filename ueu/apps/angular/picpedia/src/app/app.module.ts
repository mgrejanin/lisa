import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { CoreDataAccessConfig, CoreDataAccessModule } from '@picpay/angular/shared/core/data-access';
import { CommonLayoutsModule } from '@picpay/ui/layouts';
import { PicpayKeycloakConfig, PicpayKeycloakModule } from '@picpay/keycloak';
import {
    CoreNotificationsModule,
    ErrNotificationInterceptor,
    NotificationsService,
} from '@picpay/angular/shared/core/notifications';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { layoutConfig } from './app.layout.config';
import { AppRoutingModule } from './app.routing.module';

const coreConfig: CoreDataAccessConfig = {
    apiUrl: environment.apiUrl,
    isProd: environment.production,
};

const keycloakConfig: PicpayKeycloakConfig = {
    clientId: environment.clientId,
    realm: environment.realm,
    url: environment.keycloakUrl,
    onLoad: 'login-required',
    notAllowedRouteRedirectTo: '/error/not-authorized',
};

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        CommonLayoutsModule.forRoot(layoutConfig),
        CoreDataAccessModule.forRoot(coreConfig),
        PicpayKeycloakModule.forRoot(keycloakConfig),
        DesignSystemAngularModule.forRoot(),
        HttpClientModule,
        CoreNotificationsModule,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ErrNotificationInterceptor, multi: true },
        NotificationsService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
