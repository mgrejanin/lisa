import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { UiComponentsModule } from '@picpay/ui/components';

import { OpsDashVariablesRoutingModule } from './ops-dash-variables-routing.module';
import { OpsDashSharedModule } from '@picpay/ops-dash/shared';

import { VariablesCreateComponent } from './components/variables-create/variables-create.component';
import { VariablesDeleteComponent } from './components/variables-delete/variables-delete.component';
import { VariablesUpdateComponent } from './components/variables-update/variables-update.component';
import { VariablesHomeComponent } from './pages/variables/variables.component';
import { getPaginatorIntl } from './pages/paginator-intl';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OpsDashVariablesInterceptor } from './data-access/variables.interceptor';
import { VariablesService } from './data-access/variables/variables.service';
import { ErrNotificationInterceptor, NotificationsService } from '@picpay/angular/shared/core/notifications';
import { KeycloakBearerInterceptor } from 'keycloak-angular';

@NgModule({
    declarations: [
        VariablesHomeComponent,
        VariablesCreateComponent,
        VariablesUpdateComponent,
        VariablesDeleteComponent,
    ],
    imports: [
        CommonModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatDialogModule,
        MatSidenavModule,
        UiComponentsModule,
        MatTabsModule,
        MatTooltipModule,
        MatListModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        OpsDashVariablesRoutingModule,
        ReactiveFormsModule,
        MatMenuModule,
        DesignSystemAngularModule,
        OpsDashSharedModule,
        HttpClientModule,
    ],
    providers: [
        VariablesService,
        { provide: MatPaginatorIntl, useValue: getPaginatorIntl() },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: OpsDashVariablesInterceptor,
            multi: true,
        },
        { provide: HTTP_INTERCEPTORS, useClass: ErrNotificationInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: KeycloakBearerInterceptor, multi: true },
        NotificationsService,
    ],
})
export class OpsDashVariablesModule {}
