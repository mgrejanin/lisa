import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[sellerPanelAutoTrim]',
})
export class AutoTrimDirective {
    constructor(private elementRef: ElementRef) {}

    @HostListener('keyup', ['$event.target'])
    onKeyUp(element: HTMLInputElement | HTMLTextAreaElement): void {
        if (element.value.length) {
            this.elementRef.nativeElement.value = element.value.trim();
            return;
        }

        this.elementRef.nativeElement.value = '';
    }
}
