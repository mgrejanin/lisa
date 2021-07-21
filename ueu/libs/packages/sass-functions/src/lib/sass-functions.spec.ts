// sass
import * as sass from 'sass';
import { sassFunctions } from './sass-functions';

/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Apollo } from './helpers/design-system';
import { TokenType } from './interfaces/token.model';

describe('Sass functions', () => {
    /** Spacing */
    it('Should have theme function spacing', () => {
        const type: sass.types.String = new sass.types.String('spacing.2');

        const expectedValue = Apollo.getToken('2', TokenType.SPACE);
        const result = sassFunctions.theme(type);
        const resultValue = `${result.getValue()}${result.getUnit()}`;

        expect(result instanceof sass.types.Number).toBe(true);
        expect(resultValue).toBe(expectedValue);
    });

    /** Color */
    it('Should have theme function color', () => {
        const type: sass.types.String = new sass.types.String('colors.primary');

        const expectedValue = Apollo.getToken('primary', TokenType.COLOR);
        const result = sassFunctions.theme(type);
        const resultValue = result.getValue();

        expect(result instanceof sass.types.String).toBe(true);
        expect(resultValue).toBe(expectedValue);
    });

    /** Font size */
    it('Should have theme function fontSize', () => {
        const type: sass.types.String = new sass.types.String('fontSize.xs');

        const expectedValue = `0${Apollo.getToken('sizes.xs', TokenType.TYPE)}`;
        const result = sassFunctions.theme(type);
        const resultValue = `${result.getValue()}${result.getUnit()}`;

        expect(result instanceof sass.types.Number).toBe(true);
        expect(resultValue).toBe(expectedValue);
    });

    /** Font family */
    it('Should have theme function fontFamily', () => {
        const type: sass.types.String = new sass.types.String('fontFamily.sans');

        const expectedValue = Apollo.getToken('sans', TokenType.TYPE).join(', ');
        const result = sassFunctions.theme(type);
        const resultValue = result.getValue();

        expect(resultValue).toBe(expectedValue);
    });

    /** Line height */
    it('Should have theme function lineHeight', () => {
        const type: sass.types.String = new sass.types.String('lineHeight.xs');

        const expectedValue = Apollo.getToken('lineHeight.xs', TokenType.TYPE);
        const result = sassFunctions.theme(type);
        const resultValue = `${result.getValue()}${result.getUnit()}`;

        expect(result instanceof sass.types.Number).toBe(true);
        expect(resultValue).toBe(expectedValue);
    });

    /** Font size */
    it('Should have theme function fontSize', () => {
        const type: sass.types.String = new sass.types.String('fontSize.base');

        const expectedValue = Apollo.getToken('base', TokenType.FONT_SIZE);
        const result = sassFunctions.theme(type);
        const resultValue = `${result.getValue()}${result.getUnit()}`;
        expect(result instanceof sass.types.Number).toBe(true);
        expect(resultValue).toBe(expectedValue);
    });

    /** Font weight */
    it('Should have theme function fontWeight', () => {
        const type: sass.types.String = new sass.types.String('fontWeight.normal');

        const expectedValue = Apollo.getToken('fontWeight.normal', TokenType.TYPE);
        const result = sassFunctions.theme(type);
        const resultValue = result.getValue();

        expect(result instanceof sass.types.Number).toBe(true);
        expect(resultValue).toBe(expectedValue);
    });

    /** parseColor */
    it('Should have parseColor function (css-vars)', () => {
        const type: sass.types.String = new sass.types.String('colors.primary');
        const result = sassFunctions.parseColor(sassFunctions.theme(type));

        expect(result instanceof sass.types.Color).toBe(true);
    });

    it('Should have parseColor function (non-css-vars)', () => {
        const type: sass.types.String = new sass.types.String('colors.white');
        const result = sassFunctions.parseColor(sassFunctions.theme(type));

        expect(result instanceof sass.types.Color).toBe(true);
    });
});
