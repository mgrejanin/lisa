import { Inject, Injectable } from '@angular/core';

import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { WINDOW } from '@picpay/angular/shared/helpers';

import { SellerAccessConfig } from '../../config';

@Injectable({
    providedIn: 'root',
})
export class ChangePanelService {
    constructor(
        protected config: CoreDataAccessService<SellerAccessConfig>,
        @Inject(WINDOW) private windowToken: Window,
    ) {}

    getForeignPanelUrl(): string {
        const isLocalHost = this.windowToken.location.hostname === 'localhost';
        const prodUrl = `${this.config.getConfig().foreignUrl}`;
        const localOldPanel = 'http://localhost:4200/';

        return isLocalHost ? localOldPanel : prodUrl;
    }
}
