// interfaces
import { TokenType } from '../interfaces/token.model';

// functions
import { Apollo } from './design-system';
import { ThemeConfig } from './../tokens';

describe('Apollo design system', () => {
    /**
     *  The methodology used for this unit test
     *  is testing if the getToken will return the
     *  correct value for any given token type.
     *
     *  To make sure we are getting all of the
     *  theme properties for the given token type,
     *  we get a random property of the corresponding
     *  theme object each run.
     */
    const getRandomKey = function (obj): string {
        const keys = Object.keys(obj);
        const randomKey = keys[(keys.length * Math.random()) << 0];

        return randomKey;
    };

    it('Should return undefined if no prop is passed', () => {
        const token = Apollo.getToken(null, TokenType.BOX_SHADOW);

        expect(token).toBeUndefined();
    });

    it('Should have getToken function (default)', () => {
        const randomKey = getRandomKey(ThemeConfig.borderRadius);
        const expectedToken = ThemeConfig.borderRadius[randomKey];
        const token = Apollo.getToken(`borderRadius.${randomKey}`, TokenType.DEFAULT);

        expect(token).toBe(expectedToken);
    });

    it('Should have getToken function (Box shadow)', () => {
        const randomKey = getRandomKey(ThemeConfig.boxShadow);
        const expectedToken = ThemeConfig.boxShadow[randomKey];
        const token = Apollo.getToken(randomKey, TokenType.BOX_SHADOW);

        expect(token).toBe(expectedToken);
    });

    it('Should have getToken function (Border radius)', () => {
        const randomKey = getRandomKey(ThemeConfig.borderRadius);
        const expectedToken = ThemeConfig.borderRadius[randomKey];
        const token = Apollo.getToken(randomKey, TokenType.BORDER_RADIUS);

        expect(token).toBe(expectedToken);
    });

    it('Should have getToken function (Border width)', () => {
        const randomKey = getRandomKey(ThemeConfig.borderWidth);
        const expectedToken = ThemeConfig.borderWidth[randomKey];
        const token = Apollo.getToken(randomKey, TokenType.BORDER_WIDTH);

        expect(token).toBe(expectedToken);
    });

    it('Should have getToken function (Colors - default depth)', () => {
        const expectedToken = ThemeConfig.colors.colorPalette['warning']['base'];
        const token = Apollo.getToken('warning', TokenType.COLOR);

        expect(token).toBe(expectedToken);
    });

    it('Should have getToken function (Colors - specific depth)', () => {
        const expectedToken = ThemeConfig.colors.colorPalette['primary']['400']['base']
        const token = Apollo.getToken(`primary.400`, TokenType.COLOR);

        expect(token).toBe(expectedToken);
    });

    it('Should have getToken function (Font Weight)', () => {
        const randomKey = getRandomKey(ThemeConfig.type.fontWeight);
        const expectedToken = ThemeConfig.type.fontWeight[randomKey];
        const token = Apollo.getToken(randomKey, TokenType.FONT_WEIGHT);

        expect(token).toBe(expectedToken);
    });

    it('Should have getToken function (Line Height)', () => {
        const randomKey = getRandomKey(ThemeConfig.type.lineHeight);
        const expectedToken = ThemeConfig.type.lineHeight[randomKey];
        const token = Apollo.getToken(randomKey, TokenType.LINE_HEIGHT);

        expect(token).toBe(expectedToken);
    });

    it('Should have getToken function (Font size)', () => {
        const randomKey = getRandomKey(ThemeConfig.type.sizes);
        const expectedToken = ThemeConfig.type.sizes[randomKey];
        const token = Apollo.getToken(randomKey, TokenType.FONT_SIZE);

        expect(token).toBe(expectedToken);
    });

    it('Should have getToken function (Layout)', () => {
        const randomKey = getRandomKey(ThemeConfig.layout);
        const expectedToken = ThemeConfig.layout[randomKey];
        const token = Apollo.getToken(randomKey, TokenType.LAYOUT);

        expect(token).toBe(expectedToken);
    });

    it('Should have getToken function (Opacity)', () => {
        const randomKey = getRandomKey(ThemeConfig.opacity);
        const expectedToken = ThemeConfig.opacity[randomKey];
        const token = Apollo.getToken(randomKey, TokenType.OPACITY);

        expect(token).toBe(expectedToken);
    });

    it('Should have getToken function (Size)', () => {
        const randomKey = getRandomKey(ThemeConfig.size);
        const expectedToken = ThemeConfig.size[randomKey];
        const token = Apollo.getToken(randomKey, TokenType.SIZE);

        expect(token).toBe(expectedToken);
    });

    it('Should have getToken function (Spacing)', () => {
        const randomKey = getRandomKey(ThemeConfig.spacing.scale);
        const expectedToken = ThemeConfig.spacing.scale[randomKey];
        const token = Apollo.getToken(randomKey, TokenType.SPACE);

        expect(token).toBe(expectedToken);
    });

    it('Should have getToken function (Transition)', () => {
        const randomKey = getRandomKey(ThemeConfig.transition);
        const expectedToken = ThemeConfig.transition[randomKey];
        const token = Apollo.getToken(randomKey, TokenType.TRANSITION);

        expect(token).toBe(expectedToken);
    });

    it('Should have getToken function (Type)', () => {
        const randomKey = getRandomKey(ThemeConfig.type);
        const expectedToken = ThemeConfig.type[randomKey];
        const token = Apollo.getToken(randomKey, TokenType.TYPE);

        expect(token).toBe(expectedToken);
    });

    it('Should have getToken function (Z)', () => {
        const randomKey = getRandomKey(ThemeConfig.zIndex);
        const expectedToken = ThemeConfig.zIndex[randomKey];
        const token = Apollo.getToken(randomKey, TokenType.Z);

        expect(token).toBe(expectedToken);
    });

    it('Should have type function', () => {
        const randomKey = getRandomKey(ThemeConfig.type);
        const expectedToken = ThemeConfig.type[randomKey];
        const token = Apollo.getToken(randomKey, TokenType.TYPE);

        expect(token).toBe(expectedToken);
    });

    it('Should have opacity function', () => {
        const randomKey = getRandomKey(ThemeConfig.opacity);
        const expectedToken = ThemeConfig.opacity[randomKey];
        const token = Apollo.getToken(randomKey, TokenType.OPACITY);

        expect(token).toBe(expectedToken);
    });

    it('Should have borderWidth function', () => {
        const randomKey = getRandomKey(ThemeConfig.borderWidth);
        const expectedToken = ThemeConfig.borderWidth[randomKey];
        const token = Apollo.getToken(randomKey, TokenType.BORDER_WIDTH);

        expect(token).toBe(expectedToken);
    });

    it('Should have borderRadius function', () => {
        const randomKey = getRandomKey(ThemeConfig.borderRadius);
        const expectedToken = ThemeConfig.borderRadius[randomKey];
        const token = Apollo.getToken(randomKey, TokenType.BORDER_RADIUS);

        expect(token).toBe(expectedToken);
    });

    it('Should have boxShadow function', () => {
        const randomKey = getRandomKey(ThemeConfig.boxShadow);
        const expectedToken = ThemeConfig.boxShadow[randomKey];
        const token = Apollo.getToken(randomKey, TokenType.BOX_SHADOW);

        expect(token).toBe(expectedToken);
    });

    it('Should have transition function', () => {
        const randomKey = getRandomKey(ThemeConfig.transition);
        const expectedToken = ThemeConfig.transition[randomKey];
        const token = Apollo.getToken(randomKey, TokenType.TRANSITION);

        expect(token).toBe(expectedToken);
    });

    it('Should have layout function', () => {
        const randomKey = getRandomKey(ThemeConfig.layout);
        const expectedToken = ThemeConfig.layout[randomKey];
        const token = Apollo.getToken(randomKey, TokenType.LAYOUT);

        expect(token).toBe(expectedToken);
    });

    it('Should have size function', () => {
        const randomKey = getRandomKey(ThemeConfig.size);
        const expectedToken = ThemeConfig.size[randomKey];
        const token = Apollo.getToken(randomKey, TokenType.SIZE);

        expect(token).toBe(expectedToken);
    });
});
