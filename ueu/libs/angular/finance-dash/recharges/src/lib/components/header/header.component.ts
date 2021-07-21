import { Component, Input } from '@angular/core';

@Component({
    selector: 'finance-dash-recharges-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    @Input() showReturnBtn: boolean;
}
