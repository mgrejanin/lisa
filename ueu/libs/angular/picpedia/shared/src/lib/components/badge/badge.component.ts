import { Component, Input } from '@angular/core';

@Component({
    selector: 'picpedia-badge',
    templateUrl: './badge.component.html',
    styleUrls: ['./badge.component.scss'],
})
export class BadgeComponent {
    @Input() description: string;
}
