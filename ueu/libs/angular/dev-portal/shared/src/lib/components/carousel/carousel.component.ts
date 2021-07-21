import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface Slide {
    src: string;
}

@Component({
    selector: 'dev-portal-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss'],
    animations: [
        trigger('carouselAnimation', [
            transition('void => *', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]),
            transition('* => void', [animate('300ms', style({ opacity: 0 }))]),
        ]),
    ],
})
export class CarouselComponent implements OnInit {
    @Input() slides: Slide[];
    @Input() controls = true;
    @Output() currentSlide = new EventEmitter<Slide>();

    current = 0;

    ngOnInit() {
        if (this.slides?.length) {
            this.currentSlide.emit(this.slides[0]);
        }
    }

    onPreviousClick() {
        const previous = this.current - 1;
        this.current = previous < 0 ? this.slides.length - 1 : previous;
        const item = this.slides.find((slide, index) => index === this.current);
        this.currentSlide.emit(item);
    }

    onNextClick() {
        const next = this.current + 1;
        this.current = next === this.slides.length ? 0 : next;
        const item = this.slides.find((slide, index) => index === this.current);
        this.currentSlide.emit(item);
    }
}
