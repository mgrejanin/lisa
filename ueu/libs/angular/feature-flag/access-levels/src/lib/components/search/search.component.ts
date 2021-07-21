// @angular
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'feature-flag-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
    @Output() updateFilter = new EventEmitter<string>();

    update(data: string) {
        this.updateFilter.emit(data);
    }
}
