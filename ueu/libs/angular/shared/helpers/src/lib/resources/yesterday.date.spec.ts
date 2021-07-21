import { getYesterdayDate } from './yesterday-date.helper';

describe('getYesterdayDate', () => {
    it('should return yesterday date in ISO format', () => {
        const date = new Date();
        const dateISO = new Date().toISOString();

        const ISODateRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/;

        const yesterdayDate = new Date(date.setDate(date.getDate() - 1)).toISOString().split('T').shift(); // yyyy-mm-dd
        const yesterdayMonth = yesterdayDate.split('-')[1];
        const yesterdayDay = yesterdayDate.split('-')[2];
        const actualYear = dateISO.split('-').shift();

        const result = getYesterdayDate();
        const resultDate = result.split('T').shift(); // yyyy-mm-dd

        expect(ISODateRegex.test(result)).toBeTruthy();
        expect(resultDate.split('-')[0]).toContain(actualYear);
        expect(resultDate.split('-')[1]).toContain(yesterdayMonth);
        expect(resultDate.split('-')[2]).toContain(yesterdayDay);
    });
});
