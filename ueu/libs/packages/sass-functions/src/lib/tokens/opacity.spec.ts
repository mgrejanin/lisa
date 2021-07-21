import Opacity from './opacity';

describe('Opacity token', () => {
    it('Should have none property', () => {
        expect(Opacity.none).toBeDefined();
    });

    it('Should have ultralight property', () => {
        expect(Opacity.ultralight).toBeDefined();
    });

    it('Should have light property', () => {
        expect(Opacity.light).toBeDefined();
    });

    it('Should have medium property', () => {
        expect(Opacity.medium).toBeDefined();
    });

    it('Should have strong property', () => {
        expect(Opacity.strong).toBeDefined();
    });

    it('Should have full property', () => {
        expect(Opacity.full).toBeDefined();
    });
});
