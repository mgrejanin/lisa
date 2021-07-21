import { themes } from '@storybook/theming';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

import { defineCustomElements as DSDefine } from './../../../../dist/libs/stencil/design-system/loader';
import { defineCustomElements as LabDefine } from './../../../../dist/libs/stencil/lab-components/loader';

import './main.scss';

DSDefine();
LabDefine();

const defaultInfo = {
    brandTitle: 'PicPay Lab Components',
    brandUrl: 'https://picpay.atlassian.net/wiki/spaces/STOR/pages/1137346268/PicPay+Lab',
};

const darkTheme = {
    ...themes.dark,
    ...defaultInfo,
    base: 'dark',
    brandImage: '', // Inserir imagem para fundos escuros
};

const lightTheme = {
    ...themes.light,
    ...defaultInfo,
    base: 'light',
    brandImage: '', // Inserir imagem para fundos claros
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
    // docs: {
    //     theme: darkTheme,
    // },
    options: {
        storySort: {
            order: ['Bem vindo', 'Components'],
        },
    },
};
