import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'seller-panel-feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.scss'],
    animations: [
        // the fade-in/fade-out animation.
        trigger('simpleFadeAnimation', [
            state('in', style({ opacity: 1, transform: 'scale(1)' })),

            transition(':enter', [style({ opacity: 0, transform: 'scale(0.9)' }), animate(200)]),

            transition(':leave', animate(200, style({ opacity: 0, transform: 'scale(0.9)' }))),
        ]),
    ],
})
export class FeedBackComponent {
    @Input() imagePath!: string;
    @Input() title!: string;
    @Input() description!: string;
    @Input() height = '60vh';
}
