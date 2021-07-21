import { themes } from '@storybook/theming';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import { defineCustomElements } from './../../../../dist/libs/stencil/design-system/loader';
import './../src/styles/apollo.scss';
import './main.scss';

import { Token } from './../../../packages/sass-functions/src/lib/tokens';

defineCustomElements();

const defaultInfo = {
    brandTitle: 'Apollo Design System',
    brandUrl: 'https://picpay.atlassian.net/wiki/spaces/SDS/overview',
    colorPrimary: Token.colors.primary.light[500].base,
    colorSecondary: Token.colors.primary.light[500].base,
    fontBase: Token.fontFamily.sans,
    barTextColor: Token.colors.grayscale.light[500].base,
    barSelectedColor: Token.colors.primary.light[500].base,
};

const darkTheme = {
    ...themes.dark,
    ...defaultInfo,
    base: 'dark',
    brandImage: '/storybook-assets/design-system/logos/logo-dark.png',
    appBg: Token.colors.background.dark.primary,
    appContentBg: Token.colors.background.dark.primary,
    textColor: Token.colors.white.base,
};

const lightTheme = {
    ...themes.light,
    ...defaultInfo,
    base: 'light',
    brandImage: '/storybook-assets/design-system/logos/logo.png',
    appBg: Token.colors.background.light.primary,
    appContentBg: Token.colors.background.light.primary,
    textColor: Token.colors.black.base,
};

const components = {
    // h1: 'apollo-heading',
    // p: 'apollo-text',
    // a: 'apollo-link'
};

export const parameters = {
    layout: 'centered',
    viewport: {
        viewports: MINIMAL_VIEWPORTS,
    },
    darkMode: {
        current: 'light',
        dark: darkTheme,
        light: lightTheme,
        darkClass: 'theme-dark',
        lightClass: 'theme-light',
    },
    docs: {
        theme: lightTheme,
        components,
    },
    options: {
        storySort: {
            order: [
                'Introdução',
                ['Bem vindo', 'Começando'],
                'Design Tokens',
                'Layouts',
                'Typography',
                'Navigation',
                'Surface',
                'Components',
                'Packages',
            ],
        },
    },
    previewTabs: {
        canvas: { hidden: true },
    },
    viewMode: 'docs',
};
