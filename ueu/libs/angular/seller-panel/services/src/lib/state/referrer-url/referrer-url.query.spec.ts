import { ReferrerUrlQuery } from './referrer-url.query';
import { ReferrerUrlStore } from './referrer-url.store';

describe('ReferrerUrlQuery', () => {
    let query: ReferrerUrlQuery;

    beforeEach(() => {
        query = new ReferrerUrlQuery(new ReferrerUrlStore());
    });

    it('should create an instance', () => {
        expect(query).toBeTruthy();
    });
});
