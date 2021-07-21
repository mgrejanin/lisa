import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { Tag } from '../../models';
import { TagsState, TagsStore } from './tags.store';

@Injectable({ providedIn: 'root' })
export class TagsQuery extends Query<TagsState> {
    readonly isLoading$: Observable<boolean>;
    readonly tags$: Observable<Tag[]>;

    constructor(protected store: TagsStore) {
        super(store);
        this.isLoading$ = this.selectLoading();
        this.tags$ = this.select('tags');
    }
}
