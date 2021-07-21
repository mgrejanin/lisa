import { Inject, Injectable } from '@angular/core';

// config interface & service
import { CommonLayoutsConfig, CommonLayoutsConfigService } from './common-layouts.config';

@Injectable({
    providedIn: 'root',
})
export class CommonLayoutsService {
    private layoutsConfig: CommonLayoutsConfig;

    constructor(@Inject(CommonLayoutsConfigService) private config) {
        this.layoutsConfig = this.config;
    }

    getConfig(): CommonLayoutsConfig {
        return this.layoutsConfig;
    }
}
