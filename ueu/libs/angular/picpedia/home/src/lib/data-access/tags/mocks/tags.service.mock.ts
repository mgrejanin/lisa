import { Observable, of } from 'rxjs';

import { Tag } from '../../../models';
import { mockTags } from './tags.mock';

export class TagsServiceMock {
    getTags(): Observable<Tag[]> {
        return of(mockTags);
    }
}
