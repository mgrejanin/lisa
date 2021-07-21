import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { ExtractService, SellerService, SidenavService } from '@picpay/seller-panel/services';
import { SellerPanelSharedModule } from '@picpay/seller-panel/shared';

import { ExtractContainerComponent } from './containers/extract-container/extract-container.component';
import { ExtractComponent } from './pages/extract/extract.component';
import { FutureReleasesComponent } from './pages/future-releases/future-releases.component';
import { ResumeFutureReleasesComponent } from './components/resume-future-releases/resume-future-releases.component';
import { SellerPanelExtractRoutingModule } from './seller-panel-extract.routing.module';
import { TableExtractComponent } from './components/table-extract/table-extract.component';
import { TableFutureReleasesComponent } from './components/table-future-releases/table-future-releases.component';
import { ExtractDetailsComponent } from './components/extract-details/extract-details.component';

import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: 'left',
    allowNegative: false,
    decimal: ',',
    precision: 2,
    prefix: 'R$ ',
    suffix: '',
    thousands: '.',
};

@NgModule({
    entryComponents: [],
    imports: [
        CommonModule,
        SellerPanelSharedModule,
        SellerPanelExtractRoutingModule,
        DesignSystemAngularModule,
        CurrencyMaskModule,
    ],
    declarations: [
        ExtractContainerComponent,
        ExtractComponent,
        TableExtractComponent,
        FutureReleasesComponent,
        TableFutureReleasesComponent,
        ResumeFutureReleasesComponent,
        ExtractDetailsComponent,
    ],
    providers: [
        ExtractService,
        CurrencyPipe,
        SellerService,
        SidenavService,
        { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    ],
    exports: [
        ResumeFutureReleasesComponent,
    ],
})
export class SellerPanelExtractModule {}
