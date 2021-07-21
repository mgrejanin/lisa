import Borders from './borders';
import colors from './colors';
import boxShadow from './shadow';
import screens from './screens';
import spacing from './spacing';
import fontSize from './fontsize';
import lineHeight from './lineheight';
import fontWeight from './fontweight';
import fontFamily from './fontfamily';
import opacity from './opacity';
import size from './size';

const transitions = {
    duration: '300ms',
    timing: 'cubic-bezier(0.77, 0, 0.175, 1)',
};

export const Token = {
    ...Borders,
    colors,
    boxShadow,
    screens,
    spacing,
    fontSize,
    lineHeight,
    fontWeight,
    fontFamily,
    opacity,
    size,
} as const;

export const ThemeConfig = {
    type: {
        ...Token.fontFamily,
        baseFontSize: Token.fontSize.base,
        sizes: Token.fontSize,
        fontFamilyBase: Token.fontFamily.sans,
        fontFamilyHeadings: Token.fontFamily.sans,
        lineHeight: Token.lineHeight,
        fontWeight: Token.fontWeight,
    },

    colors: {
        colorPalette: Token.colors,
    },

    breakpoints: Token.screens,

    zIndex: {
        low: 10,
        mid: 100,
        high: 1000,
    },

    spacing: {
        scale: Token.spacing,
    },

    layout: {
        gutter: 20,
        maxWidth: 1200,
        grid: {
            columnCount: 12,
        },
    },

    transition: {
        default: {
            duration: transitions.duration,
            timing: transitions.timing,
            transition: `all ${transitions.duration} ${transitions.timing}`,
        },
    },

    borderRadius: Token.borderRadius,
    borderWidth: Token.borderWidth,
    boxShadow: Token.boxShadow,
    opacity: Token.opacity,

    size: Token.size,
};
