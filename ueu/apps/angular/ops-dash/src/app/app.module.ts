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
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app.routing.module';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { PicpayKeycloakConfig, PicpayKeycloakModule } from '@picpay/keycloak';
import { CommonLayoutsModule } from '@picpay/ui/layouts';

// configs
import { layoutConfig } from './app.layout.config';
import { CoreDataAccessModule, CoreDataAccessConfig } from '@picpay/angular/shared/core/data-access';
import { CoreNotificationsModule } from '@picpay/angular/shared/core/notifications';

const coreConfig: CoreDataAccessConfig = {
    apiUrl: environment.apiUrl,
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
        environment.production ? [] : AkitaNgDevtools,
        AppRoutingModule,
        CommonLayoutsModule.forRoot(layoutConfig),
        CoreDataAccessModule.forRoot(coreConfig),
        PicpayKeycloakModule.forRoot(keycloakConfig),
        DesignSystemAngularModule.forRoot(),
        CoreNotificationsModule,
        BrowserAnimationsModule,
        BrowserModule,
        HttpClientModule,
        MatDialogModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
