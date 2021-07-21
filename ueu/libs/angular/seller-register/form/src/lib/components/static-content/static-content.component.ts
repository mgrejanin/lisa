import { Component, Input } from '@angular/core';

@Component({
    selector: 'seller-register-static-content',
    templateUrl: './static-content.component.html',
    styleUrls: ['./static-content.component.scss'],
})
export class StaticContentComponent {
    @Input() title: string;
    @Input() responsiveTitle: boolean;

    @Input() firstParagraph: string;
    @Input() secondParagraph: string;
    @Input() boldParagraph: boolean;

    @Input() illustration: string;
    @Input() illustrationAlt: string;
}
