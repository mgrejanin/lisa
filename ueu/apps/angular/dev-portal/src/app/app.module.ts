import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// akita
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

// app related
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { environment } from '../environments/environment';

// libs
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { CoreDataAccessModule } from '@picpay/angular/shared/core/data-access';
import { SharedTrackEventsModule } from '@picpay/angular/shared/track-events';
import { CommonLayoutsModule } from '@picpay/ui/layouts';

// configs
import { layoutConfig } from './app.layout.config';
import { DevPortalInterceptor } from './interceptors/dev-portal.interceptor';

// monorepo and shared stuff
import { DevPortalSharedModule, KeycloakCallback } from '@picpay/dev-portal/shared';
import { PicpayKeycloakCallbackService, PicpayKeycloakConfig, PicpayKeycloakModule } from '@picpay/keycloak';
import { DevPortalDataAccessConfig } from '@picpay/dev-portal/data-access';

const keycloakConfig: PicpayKeycloakConfig = {
    clientId: environment.keycloak.clientId,
    realm: environment.keycloak.realm,
    url: environment.keycloak.url,
    onLoad: 'check-sso',
    withCallback: environment.keycloak.withCallback,
    notAllowedRouteRedirectTo: environment.keycloak.notAllowedRouteRedirectTo,
};

const coreConfig: DevPortalDataAccessConfig = {
    apiUrl: environment.apiUrl,
    release: environment.release,
    apiKey: environment.apiKey,
    isProd: environment.production,
    studioUrl: environment.studioUrl,
};

@NgModule({
    declarations: [AppComponent],
    imports: [
        environment.production ? [] : AkitaNgDevtools,
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        CommonLayoutsModule.forRoot(layoutConfig),
        CoreDataAccessModule.forRoot(coreConfig),
        DevPortalSharedModule.forRoot(coreConfig),
        DesignSystemAngularModule.forRoot(),
        PicpayKeycloakModule.forRoot(keycloakConfig),
        SharedTrackEventsModule.forRoot(),
        HttpClientModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: DevPortalInterceptor,
            multi: true,
        },
        {
            provide: PicpayKeycloakCallbackService,
            useClass: KeycloakCallback,
        },
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
