import { convertISOTimeToBrasilianTime } from './date-to-gmt3.helper';

describe('convertISOTimeToBrasilianTime', () => {
    it('should convert GMT-0 hour to GMT-3 (morning)', () => {
        jest.useFakeTimers('modern').setSystemTime(new Date(2021, 5, 28, 11, 20));
        expect(convertISOTimeToBrasilianTime(new Date().toISOString())).toBe('2021-06-28T11:20:00.000Z');
    });

    it('should convert GMT-0 hour to GMT-3 (night)', () => {
        jest.useFakeTimers('modern').setSystemTime(new Date(2021, 5, 28, 20, 40));
        expect(convertISOTimeToBrasilianTime(new Date().toISOString())).toBe('2021-06-28T20:40:00.000Z');
    });

    it('should convert GMT-0 hour to GMT-3 (dawn)', () => {
        jest.useFakeTimers('modern').setSystemTime(new Date(2021, 5, 28, 3, 10, 10));
        expect(convertISOTimeToBrasilianTime(new Date().toISOString())).toBe('2021-06-28T03:10:10.000Z');
    });
});
