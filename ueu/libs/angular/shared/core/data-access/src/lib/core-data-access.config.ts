import { InjectionToken } from '@angular/core';

export interface CoreDataAccessConfig {
    apiUrl: string;
    isProd?: boolean;
    release?: string;
}

export const CoreDataAccessConfigService = new InjectionToken<CoreDataAccessConfig>('CoreDataAccessConfig');
