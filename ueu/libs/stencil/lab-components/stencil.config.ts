import { Config } from '@stencil/core';
import { postcss } from '@stencil/postcss';
import path from 'path';
import postcssPresetEnv from 'postcss-preset-env';
import { sass } from '../../packages/stencil-sass/src';
import { sassFunctions } from '../../../libs/packages/sass-functions/src';

export const config: Config = {
    namespace: 'lab-components',
    taskQueue: 'async',
    globalStyle: './../design-system/src/styles/apollo.scss',
    buildEs5: false,
    devServer: {
        openBrowser: false,
    },
    outputTargets: [
        {
            type: 'dist',
            esmLoaderPath: '../loader',
            dir: '../../../dist/libs/stencil/lab-components/dist',
        },
        {
            type: 'www',
            dir: '../../../dist/libs/stencil/lab-components/www',
            serviceWorker: null, // disable service workers
            copy: [
                { src: '../../../../dist/libs/stencil/design-system/www/build', dest: 'static/design-system' },
                { src: '../../design-system/src/statics/assets', dest: 'assets' },
            ],
        },
        {
            type: 'docs-readme',
            strict: true,
            footer: 'PicPay Lab Doc',
        },
        {
            type: 'docs-vscode',
            file: 'custom-elements.json',
        },
        {
            type: 'angular',
            componentCorePackage: '@picpay/lab-components',
            directivesArrayFile: '../../../dist/libs/stencil/lab-components/dist/angular/proxies-list.ts',
            directivesProxyFile: '../../../dist/libs/stencil/lab-components/dist/angular/proxies.ts',
            directivesUtilsFile: '../../../dist/libs/stencil/lab-components/dist/angular/utils.ts',
            excludeComponents: ['lab-page'],
        },
    ],

    plugins: [
        sass({
            includePaths: [
                path.resolve(__dirname, '../../../node_modules'),
                path.resolve(__dirname, './../design-system/src/styles'),
            ],
            functions: {
                'theme($value)': sassFunctions.theme
            },
        }),
        postcss({
            plugins: [postcssPresetEnv({ stage: 1 })],
        }),
    ],
};
