import { InjectionToken } from '@angular/core';

import { CoreDataAccessConfig } from '@picpay/angular/shared/core/data-access';

export interface SellerAccessConfig extends CoreDataAccessConfig {
    foreignUrl?: string;
    apiUrlSellerDash?: string;
}

export const SellerAccessConfigService = new InjectionToken<SellerAccessConfig>('SellerAccessConfig');
