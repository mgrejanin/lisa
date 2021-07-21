import { InjectionToken } from '@angular/core';

import { CoreDataAccessConfig } from '@picpay/angular/shared/core/data-access';

export interface DevPortalDataAccessConfig extends CoreDataAccessConfig {
    apiKey?: string;
    studioUrl?: string;
}

export const DevPortalDataAccessConfigService = new InjectionToken<DevPortalDataAccessConfig>(
    'DevPortalDataAccessConfig',
);
