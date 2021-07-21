import { ContactQuery } from './contact.query';
import { ContactStore } from './contact.store';

describe('ContactQuery', () => {
    let query: ContactQuery;

    beforeEach(() => {
        query = new ContactQuery(new ContactStore());
    });

    it('should create an instance', () => {
        expect(query).toBeTruthy();
    });

    it('should have tags$ observable', () => {
        expect(query.tags$).toBeDefined();
    });
});
