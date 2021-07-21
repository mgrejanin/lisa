// @angular
import { Component, Input } from '@angular/core';

@Component({
    selector: 'feature-flag-group-list-item',
    templateUrl: './group-list-item.component.html',
    styleUrls: ['./group-list-item.component.scss'],
})
export class GroupListItemComponent {
    @Input() id!: string;
    @Input() title!: string;
    @Input() label?: string;
    @Input() iconName = 'interface-users-alt';
    @Input() link: string;
    @Input() active: boolean;
}
