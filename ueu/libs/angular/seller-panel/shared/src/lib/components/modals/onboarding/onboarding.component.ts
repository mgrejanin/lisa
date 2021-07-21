import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Organization, SellerQuery } from '@picpay/seller-panel/services';
import { Observable } from 'rxjs';

@Component({
    selector: 'seller-panel-onboarding',
    templateUrl: './onboarding.component.html',
    styleUrls: ['./onboarding.component.scss'],
})
export class OnboardingComponent {
    readonly userType$: Observable<Organization>;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        private dialogRef: MatDialogRef<OnboardingComponent>,
        private sellerQuery: SellerQuery,
    ) {
        this.userType$ = this.sellerQuery.organization$;
    }

    onClose(): void {
        this.dialogRef.close();
    }
}
