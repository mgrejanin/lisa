import { Component, Input } from '@angular/core';
@Component({
    selector: 'dev-portal-logo',
    templateUrl: './logo.component.html',
    styleUrls: ['./logo.component.scss'],
})
export class LogoComponent {
    @Input() spotlogo = '';
}
