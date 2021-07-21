import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SellerPanelSharedModule } from '@picpay/seller-panel/shared';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';

import { GenerateCredentialsComponent } from './components/generate-credentials/generate-credentials.component';
import { CredentialsComponent } from './pages/credentials/credentials.component';
import { RouterModule } from '@angular/router';
import { SellerPanelCredentialsRoutingModule } from './seller-panel-credentials.routing.module';
import { CredentialsService } from '@picpay/seller-panel/services';
import { ClipboardModule } from '@angular/cdk/clipboard';
import {
    CoreNotificationsModule,
    ErrNotificationInterceptor,
    NotificationsService,
} from '@picpay/angular/shared/core/notifications';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SellerPanelSharedModule,
        SellerPanelCredentialsRoutingModule,
        DesignSystemAngularModule,
        ClipboardModule,
        CoreNotificationsModule,
    ],
    declarations: [GenerateCredentialsComponent, CredentialsComponent],
    providers: [
        CredentialsService,
        NotificationsService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrNotificationInterceptor,
            multi: true,
        },
    ],
})
export class SellerPanelCredentialsModule {}
