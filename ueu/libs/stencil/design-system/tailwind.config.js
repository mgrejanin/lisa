const { Token } = require('../../../dist/libs/packages/sass-functions/src/lib/tokens/index.js');

module.exports = {
    darkMode: 'class', // 'media' ou 'class'
    theme: {
        screens: {
           ...Token.screens 
        },
        spacing: {
            ...Token.spacing
        },
        borderWidth: {
            ...Token.borderWidth
        },
        borderRadius: {
            ...Token.borderRadius
        },
        boxShadow: {
            ...Token.boxShadow
        },
        fontSize: {
            ...Token.fontSize
        },
        lineHeight: {
            ...Token.lineHeight
        },
        fontFamily: {
            ...Token.fontFamily
        },
        opacity: {
            ...Token.opacity
        },
        colors: {
            primary: { ...Token.colors.primary },
            secondary: { ...Token.colors.secondary },
            warning: { ...Token.colors.warning },
            critical: { ...Token.colors.critical },
            success: { ...Token.colors.success },
            neutral: { ...Token.colors.neutral },
            grayscale: { ...Token.colors.grayscale },
            random: { ...Token.colors.random },
            background: { ...Token.colors.background },
        }
    },
};