import { dateIsBiggerThan24Hours } from './date-bigger-24hrs.helper';
describe('dateIsBiggerThan24Hours', () => {
    it('should date less than 24Hours', () => {
        const date = new Date();
        const dateToCompare = '2021-06-28T19:08:38.849000Z';

        date.setFullYear(2021, 7, 19);
        expect(dateIsBiggerThan24Hours(dateToCompare)).toBeFalsy();
    });

    it('should date greather than 24Hours (morning)', () => {
        const date = new Date();
        const dateToCompare = '2021-08-19T09:20:50.849000Z';

        date.setFullYear(2021, 7, 19);
        expect(dateIsBiggerThan24Hours(dateToCompare)).toBeTruthy();
    });

    it('should date greather than 24Hours (night)', () => {
        const date = new Date();
        const dateToCompare = '2021-08-19T20:08:38.849000Z';

        date.setFullYear(2021, 7, 19);
        expect(dateIsBiggerThan24Hours(dateToCompare)).toBeTruthy();
    });

    it('should date greather than 24Hour (dawn)', () => {
        const date = new Date();
        const dateToCompare = '2021-08-19T01:30:40.849000Z';

        date.setFullYear(2021, 7, 19);
        expect(dateIsBiggerThan24Hours(dateToCompare)).toBeTruthy();
    });
});
