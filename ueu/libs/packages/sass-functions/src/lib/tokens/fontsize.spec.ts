import Fontsize from './fontsize';

describe('Fontsize token', () => {
    it('Should have xs property', () => {
        expect(Fontsize.xs).toBeDefined();
    });

    it('Should have sm property', () => {
        expect(Fontsize.sm).toBeDefined();
    });

    it('Should have base property', () => {
        expect(Fontsize.base).toBeDefined();
    });

    it('Should have lg property', () => {
        expect(Fontsize.lg).toBeDefined();
    });

    it('Should have xl property', () => {
        expect(Fontsize.xl).toBeDefined();
    });

    it('Should have 2xl property', () => {
        expect(Fontsize['2xl']).toBeDefined();
    });

    it('Should have 3xl property', () => {
        expect(Fontsize['3xl']).toBeDefined();
    });

    it('Should have 4xl property', () => {
        expect(Fontsize['4xl']).toBeDefined();
    });

    it('Should have 5xl property', () => {
        expect(Fontsize['5xl']).toBeDefined();
    });

    it('Should have 6xl property', () => {
        expect(Fontsize['6xl']).toBeDefined();
    });

    it('Should have 7xl property', () => {
        expect(Fontsize['7xl']).toBeDefined();
    });
});
