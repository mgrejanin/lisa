import { ViewChild, ElementRef } from '@angular/core';
import { Component, Input } from '@angular/core';

export type NoticeType = 'simple' | 'complete';
export type NoticeTheme = 'info' | 'warning' | 'error' | 'success';
@Component({
    selector: 'dev-portal-notice',
    templateUrl: './notice.component.html',
    styleUrls: ['./notice.component.scss'],
})
export class NoticeComponent {
    @ViewChild('notice') notice: ElementRef;

    @Input() type: NoticeType = 'simple';
    @Input() theme: NoticeTheme = 'info';
    @Input() customImg: string;
    @Input() btnClosed: boolean;

    constructor() {
        this.customImg = '';
        this.btnClosed = false;
    }

    onClose() {
        this.notice.nativeElement.remove();
    }
}
