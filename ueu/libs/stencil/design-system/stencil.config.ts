import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
import { postcss } from '@stencil/postcss';
import path from 'path';
import postcssPresetEnv from 'postcss-preset-env';
import { sass } from '../../../libs/packages/stencil-sass/src';
import { sassFunctions } from '../../../libs/packages/sass-functions/src';

export const config: Config = {
    namespace: 'design-system',
    taskQueue: 'async',
    globalStyle: './src/styles/apollo.scss',
    buildEs5: false,
    devServer: {
        openBrowser: false,
    },
    outputTargets: [
        {
            type: 'dist',
            esmLoaderPath: '../loader',
            dir: '../../../dist/libs/stencil/design-system/dist',
        },
        {
            type: 'www',
            dir: '../../../dist/libs/stencil/design-system/www',
            serviceWorker: null, // disable service workers
            copy: [{ src: './statics/assets', dest: 'assets' }],
        },
        {
            type: 'docs-readme',
            strict: true,
            footer: 'PicPay Doc',
        },
        {
            type: 'docs-vscode',
            file: 'custom-elements.json',
        },
        {
            type: 'angular',
            componentCorePackage: '@picpay/design-system',
            directivesArrayFile:
                './../../../dist/libs/stencil/design-system/angular/src/generated/directives/proxies-list.ts',
            directivesProxyFile:
                './../../../dist/libs/stencil/design-system/angular/src/generated/directives/proxies.ts',
            directivesUtilsFile: './../../../dist/libs/stencil/design-system/angular/src/generated/directives/utils.ts',
            excludeComponents: ['apollo-page'],
        },
        reactOutputTarget({
            componentCorePackage: '@picpay/design-system',
            proxiesFile: '../../../../dist/libs/stencil/design-system/react/src/generated/components.ts',
            excludeComponents: ['apollo-page'],
        }),
    ],

    plugins: [
        sass({
            includePaths: [path.resolve(__dirname, '../../../node_modules'), path.resolve(__dirname, './src/styles')],
            functions: {
                'theme($value)': sassFunctions.theme,
            },
        }),
        postcss({
            plugins: [postcssPresetEnv({ stage: 1 })],
        }),
    ],
};
