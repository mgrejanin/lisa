import { Observable, of } from 'rxjs';

import { Tag } from '../../../models';
import { mockTags } from './tags.mock';

export class TagsQueryMock {
    isLoading$: Observable<boolean>;
    tags$: Observable<Tag[]>;

    constructor() {
        this.isLoading$ = of(false);
        this.tags$ = of(mockTags);
    }
}
