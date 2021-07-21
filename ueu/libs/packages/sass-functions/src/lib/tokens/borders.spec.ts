import Borders from './borders';
describe('Borders token', () => {
    /** Border width */
    describe('borderWidth Property', () => {
        it('Should be defined', () => {
            expect(Borders.borderWidth).toBeDefined();
        });

        it('Should have none property', () => {
            expect(Borders.borderWidth.none).toBeDefined();
        });

        it('Should have light property', () => {
            expect(Borders.borderWidth.light).toBeDefined();
        });

        it('Should have medium property', () => {
            expect(Borders.borderWidth.medium).toBeDefined();
        });

        it('Should have strong property', () => {
            expect(Borders.borderWidth.strong).toBeDefined();
        });
    });

    /** Border Radius */
    describe('borderRadius Property', () => {
        it('Should be defined', () => {
            expect(Borders.borderRadius).toBeDefined();
        });

        it('Should have none property', () => {
            expect(Borders.borderRadius.none).toBeDefined();
        });

        it('Should have light property', () => {
            expect(Borders.borderRadius.light).toBeDefined();
        });

        it('Should have medium property', () => {
            expect(Borders.borderRadius.medium).toBeDefined();
        });

        it('Should have strong property', () => {
            expect(Borders.borderRadius.strong).toBeDefined();
        });

        it('Should have pill property', () => {
            expect(Borders.borderRadius.pill).toBeDefined();
        });

        it('Should have full property', () => {
            expect(Borders.borderRadius.full).toBeDefined();
        });
    });
});
