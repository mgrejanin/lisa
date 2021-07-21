import Size from './size';

describe('Size token', () => {
    it('Should have xs property', () => {
        expect(Size.xs).toBeDefined();
    });

    it('Should have sm property', () => {
        expect(Size.sm).toBeDefined();
    });

    it('Should have md property', () => {
        expect(Size.md).toBeDefined();
    });

    it('Should have lg property', () => {
        expect(Size.lg).toBeDefined();
    });

    it('Should have full property', () => {
        expect(Size.full).toBeDefined();
    });
});
