import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[sellerPanelNumeric]',
})
export class NumericDirective {
    @Input('sellerPanelNumeric') apply = true;

    private inputElement: HTMLInputElement;

    constructor(private elementRef: ElementRef) {
        this.inputElement = this.elementRef.nativeElement;
    }

    @HostListener('blur', ['$event.target.value'])
    onBlur(value: string): void {
        this.transformValue(value);
    }

    @HostListener('keyup', ['$event.target.value'])
    onKeyUp(value: string): void {
        this.transformValue(value);
    }

    private transformValue(value: string): void {
        if (this.apply) {
            this.inputElement.value = value.replace(/\D/g, '');
        }
    }
}
