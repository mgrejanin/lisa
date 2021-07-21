import { formatISODate } from './format-iso-date.helper';

describe('formatISODate', () => {
    it('should format a ISO Date to brazilian date', () => {
        const ISODate = new Date('1995-08-19T08:00:00.000Z').toISOString();
        expect(formatISODate(ISODate)).toBe('19.08.1995');
    });

    it('should format a ISO Date to brazilian date with hour', () => {
        const ISODate = new Date('1995-08-19T08:00:00.000Z').toISOString();
        expect(formatISODate(ISODate, true)).toBe('19.08.1995 - 08:00');
    });
});
