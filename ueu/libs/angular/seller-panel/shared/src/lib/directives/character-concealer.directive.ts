import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[sellerPanelCharacterConcealer]',
})
export class CharacterConcealerDirective implements OnInit {
    @Input('sellerPanelCharacterConcealer') interval: number;

    constructor(private elementRef: ElementRef) {}

    ngOnInit(): void {
        this.interval = this.interval || this.elementRef.nativeElement.value.length;
        this.concealer();
    }

    concealer(): void {
        let rawValue = [...this.elementRef.nativeElement.value];

        rawValue = rawValue.map((value, index) =>
            index > 2 && index - 2 <= this.interval && value.trim().length ? '*' : value,
        );

        this.elementRef.nativeElement.value = rawValue.join().replace(/,/g, '');
    }
}
