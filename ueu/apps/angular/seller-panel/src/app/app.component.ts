import { Component } from '@angular/core';
import { NgxZendeskWebwidgetService } from 'ngx-zendesk-webwidget';

@Component({
    selector: 'seller-panel-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor(private zendeskService: NgxZendeskWebwidgetService) {}
}
