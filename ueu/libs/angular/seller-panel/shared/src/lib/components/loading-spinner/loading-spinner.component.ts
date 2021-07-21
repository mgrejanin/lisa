import { Component, Input } from '@angular/core';

@Component({
    selector: 'seller-panel-loading-spinner',
    templateUrl: './loading-spinner.component.html',
    styleUrls: ['./loading-spinner.component.scss'],
})
export class LoadingSpinnerComponent {
    @Input() text = '';
    @Input() size = 60;
    @Input() stroke = 6;
    @Input() textAlign: 'left' | 'right' = 'right';
}
