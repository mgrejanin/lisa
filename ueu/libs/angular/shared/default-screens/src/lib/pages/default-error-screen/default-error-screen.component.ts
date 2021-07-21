import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DefaultErrorScreenConfig } from '../../models/default-error-screen.model';

@Component({
    selector: 'picpay-default-error-screen',
    templateUrl: './default-error-screen.component.html',
    styleUrls: ['./default-error-screen.component.scss'],
})
export class DefaultErrorScreenComponent {
    receivedData: DefaultErrorScreenConfig;

    constructor(private route: ActivatedRoute) {
        this.receivedData = this.route.snapshot.data;
    }
}
