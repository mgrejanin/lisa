import { Component, Input } from '@angular/core';

@Component({
    selector: 'picpedia-cards',
    templateUrl: './cards.component.html',
    styleUrls: ['./cards.component.scss'],
})
export class CardsComponent {
    @Input() title: string;
    @Input() icon: string;
    @Input() routerLink: string;
}
