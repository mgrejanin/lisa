import { ComponentPortal } from '@angular/cdk/portal';
import { Component, Input, OnInit } from '@angular/core';

import { AccountStepperComponent } from '../../containers/account-stepper/account-stepper.component';

@Component({
    selector: 'seller-panel-cdk-portal',
    templateUrl: 'cdk-portal.component.html',
    styleUrls: ['cdk-portal.component.scss'],
})
export class CdkPortalComponent implements OnInit {
    @Input() component!: ComponentPortal<AccountStepperComponent>;

    ngOnInit() {
        this.initComponent();
    }

    private initComponent() {
        this.component = new ComponentPortal(AccountStepperComponent);
    }
}
