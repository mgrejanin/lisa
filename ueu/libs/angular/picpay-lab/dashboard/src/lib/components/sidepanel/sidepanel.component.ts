import { Component, EventEmitter, Input, Output } from '@angular/core';

type Side = 'left' | 'right';

@Component({
    selector: 'picpay-lab-sidepanel',
    templateUrl: './sidepanel.component.html',
    styleUrls: ['./sidepanel.component.scss'],
})
export class PicpayLabSidePanelComponent {
    @Input() title: string;
    @Input() description: string;
    @Input() side: Side = 'left';
    @Input() icon = 'close';

    @Output() clickButton: EventEmitter<CustomEvent> = new EventEmitter();

    handleClick(event) {
        this.clickButton.emit(event);
    }
}
