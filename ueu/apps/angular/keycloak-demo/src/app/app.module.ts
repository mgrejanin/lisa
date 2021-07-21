// angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// environment
import { environment } from '../environments/environment';

// components
import { AppComponent } from './app.component';

// modules
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app.routing.module';

// libs
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { PicpayKeycloakConfig, PicpayKeycloakModule, PicpayKeycloakService } from '@picpay/keycloak';
import { CoreDataAccessConfig, CoreDataAccessModule } from '@picpay/angular/shared/core/data-access';

// interceptors
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { layoutConfig } from '@picpay/keycloak-demo/home';
import {
    CoreNotificationsModule,
    ErrNotificationInterceptor,
    NotificationsService,
} from '@picpay/angular/shared/core/notifications';
import { PicpayIfRolesService } from '@picpay/angular/shared/directives';
import { CommonLayoutsModule } from '@picpay/ui/layouts';

const keycloakConfig: PicpayKeycloakConfig = {
    clientId: environment.keycloakClientId,
    realm: environment.keycloakRealm,
    url: environment.keycloakUrl,
    onLoad: 'login-required',
    notAllowedRouteRedirectTo: 'error/not-authorized',
    loadUserProfileAtStartUp: true,
};

const coreConfig: CoreDataAccessConfig = {
    apiUrl: environment.apiUrl,
    isProd: environment.production,
};

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        CoreDataAccessModule.forRoot(coreConfig),
        DesignSystemAngularModule.forRoot(),
        CoreNotificationsModule,
        PicpayKeycloakModule.forRoot(keycloakConfig),
        CommonLayoutsModule.forRoot(layoutConfig),
    ],
    exports: [DesignSystemAngularModule],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ErrNotificationInterceptor, multi: true },
        { provide: PicpayIfRolesService, useClass: PicpayKeycloakService },
        NotificationsService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
