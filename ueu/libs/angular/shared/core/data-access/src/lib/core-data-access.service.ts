import { Inject, Injectable } from '@angular/core';
import { CoreDataAccessConfig, CoreDataAccessConfigService } from './core-data-access.config';

@Injectable({
    providedIn: 'root',
})
export class CoreDataAccessService<T = CoreDataAccessConfig> {
    private dataAccessConfig: T;

    constructor(@Inject(CoreDataAccessConfigService) private config) {
        this.dataAccessConfig = this.config;
    }

    getConfig(): T {
        return this.dataAccessConfig;
    }
}
