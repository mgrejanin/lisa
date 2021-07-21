import { Component } from '@angular/core';

import { Organization, SellerQuery } from '@picpay/seller-panel/services';
import { Observable } from 'rxjs';

@Component({
    selector: 'seller-panel-account-action-context',
    templateUrl: './account-action-context.component.html',
    styleUrls: ['./account-action-context.component.scss'],
})
export class AccountActionContextComponent {
    organizationQuery$: Observable<Organization>;

    constructor(public sellerQuery: SellerQuery) {
        this.organizationQuery$ = this.sellerQuery.organization$;
    }

    getTemplate(isPhysicalPerson: boolean, isIndividualEntrepreuner: boolean): string {
        if (isPhysicalPerson) {
            return 'physicalPerson';
        }

        if (isIndividualEntrepreuner) {
            return 'individual';
        }

        return 'legalPerson';
    }
}
