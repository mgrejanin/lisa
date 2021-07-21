import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'seller-panel-shipment',
    templateUrl: './shipment.component.html',
    styleUrls: ['./shipment.component.scss'],
})
export class ShipmentComponent {
    constructor(private router: Router) {}

    async backToPreviousPage() {
        await this.router.navigate(['/']);
    }
}
