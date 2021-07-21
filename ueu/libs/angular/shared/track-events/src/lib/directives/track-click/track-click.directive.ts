import { Directive, HostListener, Input } from '@angular/core';

import { EventTracking } from '@picpay/event-tracking';

@Directive({
    selector: '[picpayTrackClick]',
})
export class TrackClickDirective {
    /**
     * Desativando a o tslint na linha abaixo. O payload dos eventos sempre será definido pelo negócio.
     * Logo, não haverá um payload pré definido
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Input() eventPayload: any;
    @Input() eventName: string;

    @HostListener('click')
    trackClick(): void {
        EventTracking.track(this.eventName, this.eventPayload);
    }
}
