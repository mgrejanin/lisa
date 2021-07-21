import { TagsQuery } from './tags.query';
import { TagsStore } from './tags.store';

describe('TagsQuery', () => {
    let query: TagsQuery;

    beforeEach(() => {
        query = new TagsQuery(new TagsStore());
    });

    it('should create an instance', () => {
        expect(query).toBeTruthy();
    });

    it('should have isLoading$ observable', () => {
        expect(query.isLoading$).toBeTruthy();
    });

    it('should have tags$ observable', () => {
        expect(query.tags$).toBeTruthy();
    });
});
