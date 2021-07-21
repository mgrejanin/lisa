import { mockTags } from './mocks/tags.mock';
import { TagsState, TagsStore } from './tags.store';

describe('TagsStore', () => {
    let store: TagsStore;
    let mockTagsState: TagsState;

    beforeEach(() => {
        store = new TagsStore();
        mockTagsState = { tags: mockTags };
    });

    it('should create an instance', () => {
        expect(store).toBeTruthy();
    });

    it('should have update function', () => {
        const updateSpy = spyOn(store, 'update');
        store.update(mockTagsState);
        expect(updateSpy).toHaveBeenCalledWith<[TagsState]>(mockTagsState);
    });
});
