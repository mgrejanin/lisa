import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[sellerPanelUppercase]',
})
export class UppercaseDirective {
    private inputElement: HTMLInputElement;

    constructor(private elementRef: ElementRef) {
        this.inputElement = this.elementRef.nativeElement;
    }

    @HostListener('blur', ['$event.target.value'])
    onBlur(value: string): void {
        this.inputElement.value = value.toUpperCase();
    }

    @HostListener('input', ['$event.target.value'])
    onInput(value: string): void {
        this.inputElement.value = value.toUpperCase();
    }
}
