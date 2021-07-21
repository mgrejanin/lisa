import Fontfamily from './fontfamily';

describe('Fontfamily', () => {
    it('Should have sans property', () => {
        expect(Fontfamily.sans).toBeDefined();
    });

    it('Should have system property', () => {
        expect(Fontfamily.system).toBeDefined();
    });

    it('Should have serif property', () => {
        expect(Fontfamily.serif).toBeDefined();
    });

    it('Should have mono property', () => {
        expect(Fontfamily.mono).toBeDefined();
    });
});
