import Screens from './screens';

describe('Screens token', () => {
    it('should have base property', () => {
        expect(Screens.base).toBeDefined();
    });

    it('should have xs property', () => {
        expect(Screens.xs).toBeDefined();
    });

    it('should have sm property', () => {
        expect(Screens.sm).toBeDefined();
    });

    it('should have md property', () => {
        expect(Screens.md).toBeDefined();
    });

    it('should have lg property', () => {
        expect(Screens.lg).toBeDefined();
    });
});
