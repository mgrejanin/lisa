import { Component, Input } from '@angular/core';

@Component({
    selector: 'picpedia-badge-certification',
    templateUrl: './badge-certification.component.html',
    styleUrls: ['./badge-certification.component.scss'],
})
export class BadgeCertificationComponent {
    @Input() badgeLabel: string;
}
