import Lineheight from './lineheight';

describe('Lineheight token', () => {
    it('Should have xs property', () => {
        expect(Lineheight.xs).toBeDefined();
    });

    it('Should have sm property', () => {
        expect(Lineheight.sm).toBeDefined();
    });

    it('Should have base property', () => {
        expect(Lineheight.base).toBeDefined();
    });

    it('Should have lg property', () => {
        expect(Lineheight.lg).toBeDefined();
    });

    it('Should have xl property', () => {
        expect(Lineheight.xl).toBeDefined();
    });

    it('Should have 2xl property', () => {
        expect(Lineheight['2xl']).toBeDefined();
    });

    it('Should have 3xl property', () => {
        expect(Lineheight['3xl']).toBeDefined();
    });

    it('Should have 4xl property', () => {
        expect(Lineheight['4xl']).toBeDefined();
    });

    it('Should have 5xl property', () => {
        expect(Lineheight['5xl']).toBeDefined();
    });

    it('Should have 6xl property', () => {
        expect(Lineheight['6xl']).toBeDefined();
    });

    it('Should have 7xl property', () => {
        expect(Lineheight['7xl']).toBeDefined();
    });
});
