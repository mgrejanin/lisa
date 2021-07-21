import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'picpay-lab-device',
    templateUrl: './device.component.html',
    styleUrls: ['./device.component.scss'],
})
export class PicpayLabDeviceComponent {
    @Input() addSectionVisible: boolean;
    @Output() addSectionClick: EventEmitter<CustomEvent>;

    constructor() {
        this.addSectionVisible = true;
        this.addSectionClick = new EventEmitter();
    }

    onAddSectionClick(): void {
        this.addSectionClick.emit();
    }
}
