import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'picpay-lab-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class PicpayLabHeaderComponent {
    @Input() disabledActions: boolean;
    @Input() readyToSubmit: boolean;
    @Input() savedIn: string;
    @Output() backRoute: EventEmitter<CustomEvent>;
    @Output() save: EventEmitter<CustomEvent>;
    @Output() sendForApproval: EventEmitter<CustomEvent>;

    constructor() {
        this.backRoute = new EventEmitter();
        this.save = new EventEmitter();
        this.sendForApproval = new EventEmitter();
    }

    onBackRoute(): void {
        this.backRoute.emit();
    }

    onSave(): void {
        this.save.emit();
    }

    onSendForApproval(): void {
        this.sendForApproval.emit();
    }
}
