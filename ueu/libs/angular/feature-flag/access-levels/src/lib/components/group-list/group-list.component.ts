// squads
import { Component, Input } from '@angular/core';

// interfaces
import { Squad } from '../../models';

@Component({
    selector: 'feature-flag-group-list',
    templateUrl: './group-list.component.html',
    styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent {
    @Input() squads: Squad[];
}
