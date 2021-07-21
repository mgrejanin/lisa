import { Component, Input } from '@angular/core';

@Component({
    selector: 'seller-panel-loading-button',
    templateUrl: './loading-button.component.html',
    styleUrls: ['./loading-button.component.scss'],
})
export class LoadingButtonComponent {
    @Input() action = true;
    @Input() class = false;
    @Input() loadingText = 'Carregando...';
    @Input() normalText = 'Efetuar ação';
    @Input() side = 'right';
}
