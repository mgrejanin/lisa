import { Token, ThemeConfig } from './';

describe('Token token', () => {
    it('Should have borderWidth property', () => {
        expect(Token.borderWidth).toBeDefined();
    });

    it('Should have borderRadius property', () => {
        expect(Token.borderRadius).toBeDefined();
    });

    it('Should have colors property', () => {
        expect(Token.colors).toBeDefined();
    });

    it('Should have boxShadow property', () => {
        expect(Token.boxShadow).toBeDefined();
    });

    it('Should have screens property', () => {
        expect(Token.screens).toBeDefined();
    });

    it('Should have spacing property', () => {
        expect(Token.spacing).toBeDefined();
    });

    it('Should have fontSize property', () => {
        expect(Token.fontSize).toBeDefined();
    });

    it('Should have lineHeight property', () => {
        expect(Token.lineHeight).toBeDefined();
    });

    it('Should have fontWeight property', () => {
        expect(Token.fontWeight).toBeDefined();
    });

    it('Should have fontFamily property', () => {
        expect(Token.fontFamily).toBeDefined();
    });

    it('Should have opacity property', () => {
        expect(Token.opacity).toBeDefined();
    });

    it('Should have size property', () => {
        expect(Token.size).toBeDefined();
    });

    it('Should have ThemeConfig properties', () => {
        const expected = [
            'type',
            'colors',
            'breakpoints',
            'zIndex',
            'spacing',
            'layout',
            'transition',
            'borderRadius',
            'borderWidth',
            'boxShadow',
            'opacity',
            'size',
        ];
        expect(Object.keys(ThemeConfig)).toEqual(expected);
    });
});
