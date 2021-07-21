import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { DevPortalDataAccessConfig, UiQuery } from '@picpay/dev-portal/shared';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

@Component({
    selector: 'dev-portal-open-banking',
    templateUrl: './open-banking.component.html',
    styleUrls: ['./open-banking.component.scss'],
})
export class OpenBankingComponent implements OnInit {
    isMobile$: Observable<boolean>;
    private isProduction = false;

    constructor(
        private uiQuery: UiQuery,
        private config: CoreDataAccessService<DevPortalDataAccessConfig>,
        private router: Router,
    ) {}

    ngOnInit() {
        this.isMobile$ = this.uiQuery.isMobile$;
        this.isProduction = this.config.getConfig().isProd;
    }

    handleRedirect(): void {
        const internalDoc = '/docs/pix';
        const externalDoc =
            'https://openbanking-brasil.github.io/areadesenvolvedor/#em-revisao-pix-criar-iniciacao-de-pagamento';

        this.isProduction ? window.open(externalDoc) : this.router.navigate([internalDoc]);
    }
}
