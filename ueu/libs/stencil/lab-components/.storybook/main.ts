import * as path from 'path';
import { sassFunctions } from './../../../packages/sass-functions/src';

export default {
    stories: ['../src/**/*.stories.mdx'],
    addons: [
        {
            name: '@storybook/addon-docs',
            options: { configureJSX: true },
        },
        '@storybook/addon-controls',
        '@storybook/addon-actions',
        '@storybook/addon-viewport',
        'storybook-dark-mode',
    ],
    webpackFinal: async (config, { env }) => {
        return {
            ...config,
            module: {
                ...config.module,
                rules: [
                    ...config.module.rules,
                    {
                        test: /\.scss$/,
                        use: [
                            'style-loader',
                            'css-loader',
                            {
                                loader: 'sass-loader',
                                options: {
                                    sassOptions: {
                                        includePaths: [
                                            path.resolve(__dirname, '../../../../node_modules'),
                                            path.resolve(__dirname, './../../design-system/src/styles'),
                                        ],
                                        functions: {
                                            'theme($value)': sassFunctions.theme,
                                        },
                                    },
                                },
                            },
                        ],
                        include: path.resolve(__dirname, '../'),
                    },
                    {
                        test: /\.(png|jpe?g|gif)$/i,
                        use: ['url-loader'],
                    },
                ],
            },
        };
    },
    babel: async options => ({
        ...options,
    }),
};
