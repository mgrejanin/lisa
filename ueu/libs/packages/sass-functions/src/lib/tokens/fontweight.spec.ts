import Fontweight from './fontweight';

describe('Fontweight token', () => {
    it('should have thin property', () => {
        expect(Fontweight.thin).toBeDefined();
    });

    it('should have extralight property', () => {
        expect(Fontweight.extralight).toBeDefined();
    });

    it('should have light property', () => {
        expect(Fontweight.light).toBeDefined();
    });

    it('should have normal property', () => {
        expect(Fontweight.normal).toBeDefined();
    });

    it('should have medium property', () => {
        expect(Fontweight.medium).toBeDefined();
    });

    it('should have semibold property', () => {
        expect(Fontweight.semibold).toBeDefined();
    });

    it('should have bold property', () => {
        expect(Fontweight.bold).toBeDefined();
    });

    it('should have extrabold property', () => {
        expect(Fontweight.extrabold).toBeDefined();
    });

    it('should have black property', () => {
        expect(Fontweight.black).toBeDefined();
    });
});
