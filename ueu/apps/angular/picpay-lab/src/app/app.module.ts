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
import { LabComponentsAngularModule } from '@picpay/lab-components-angular';
import { CoreDataAccessConfig, CoreDataAccessModule } from '@picpay/angular/shared/core/data-access';

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

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        CoreDataAccessModule.forRoot(coreConfig),
        DesignSystemAngularModule.forRoot(),
        LabComponentsAngularModule.forRoot(),
        CoreNotificationsModule,

        environment.production ? [] : AkitaNgDevtools,
    ],
    exports: [DesignSystemAngularModule],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ErrNotificationInterceptor, multi: true },
        NotificationsService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
