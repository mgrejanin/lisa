import { Component, Input } from '@angular/core';
import { EventTrackingService } from '@picpay/seller-panel/services';

@Component({
    selector: 'seller-panel-resume-future-releases',
    templateUrl: './resume-future-releases.component.html',
    styleUrls: ['./resume-future-releases.component.scss'],
})
export class ResumeFutureReleasesComponent {
    @Input() balance: number;
    @Input() date: string;

    @Input() loading: boolean;
    @Input() error: boolean;
    @Input() noBalance: boolean;

    constructor(private eventTracking: EventTrackingService) {}

    eventTrackingClicked(): void {
        this.eventTracking.eventTrackingUserCliked('LANCAMENTOS_FUTUROS', 'inicio', window, document);
    }
}
