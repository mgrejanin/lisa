import { ContactStore } from './contact.store';

// interfaces
import { ContactTagGroup } from '../../models';

describe('ContactStore', () => {
    let store: ContactStore;

    beforeEach(() => {
        store = new ContactStore();
    });

    it('should create an instance', () => {
        expect(store).toBeTruthy();
    });

    it('should have updateTags function', () => {
        const updateSpy = spyOn(store, 'update');

        const mockContact: ContactTagGroup = {
            b2p: [
                {
                    subject: 'tag subject',
                    tag: 'tag value',
                },
            ],
        };

        store.updateTags(mockContact);

        expect(updateSpy).toHaveBeenCalledWith({ tags: mockContact });
    });
});
