import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { RecaptchaV3Module, RECAPTCHA_LANGUAGE, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { SellerQuery } from '@picpay/seller-panel/services';
import { CoreDataAccessModule } from '@picpay/angular/shared/core/data-access';

import {
    SellerPanelRequestInterceptor,
    SellerPanelAuthGuard,
    SellerPanelSessionGuard,
} from '@picpay/seller-panel/auth';
import { PicpayIfRolesService } from '@picpay/angular/shared/directives';
import { CommonLayoutsModule } from '@picpay/ui/layouts';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { NgxZendeskWebwidgetModule } from 'ngx-zendesk-webwidget';

// configs
import { SellerAccessConfig } from '@picpay/seller-panel/seller-access';
import { SharedTrackEventsModule } from '@picpay/angular/shared/track-events';
import { layoutConfig } from './app.layout.config';
import { environment } from '../environments/environment';
import { ZendeskConfig } from './app.zendesk.config';
import { CoreNotificationsModule } from '@picpay/angular/shared/core/notifications';

registerLocaleData(localePt, 'pt');

const coreConfig: SellerAccessConfig = {
    apiUrl: environment.apiUrl,
    foreignUrl: environment.foreignUrl,
    apiUrlSellerDash: environment.apiUrlSellerDash,
};
@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        RecaptchaV3Module,
        DesignSystemAngularModule.forRoot(),
        CoreDataAccessModule.forRoot(coreConfig),
        CommonLayoutsModule.forRoot(layoutConfig),
        SharedTrackEventsModule.forRoot(),
        NgxZendeskWebwidgetModule.forRoot(ZendeskConfig),
        environment.production ? [] : AkitaNgDevtools,
        CoreNotificationsModule,
    ],
    providers: [
        SellerPanelAuthGuard,
        SellerPanelSessionGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: SellerPanelRequestInterceptor,
            multi: true,
        },
        {
            provide: LOCALE_ID,
            useValue: 'pt',
        },
        { provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.reCaptchaKey },
        {
            provide: RECAPTCHA_LANGUAGE,
            useValue: 'pt-BR',
        },
        { provide: PicpayIfRolesService, useClass: SellerQuery },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
