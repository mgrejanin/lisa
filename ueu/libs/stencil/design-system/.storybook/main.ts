import * as path from 'path';
import { sassFunctions } from './../../../packages/sass-functions/src';

export default {
    stories: ['../src/**/*.stories.@(js|ts|tsx|mdx)'],
    addons: [
        {
            name: '@storybook/addon-docs',
            options: { configureJSX: true },
        },
        '@storybook/addon-controls',
        '@storybook/addon-actions',
        '@storybook/addon-viewport',
        '@storybook/addon-notes',
        'storybook-dark-mode',
    ],
    webpackFinal: async (config, { env }) => {
        config.module.rules[0].use[0].options.presets = [
            require.resolve('@babel/preset-react'),
            require.resolve('@babel/preset-env'),
            require.resolve('@emotion/babel-preset-css-prop'),
        ];
        config.module.rules.push({
            test: /\.(ts|tsx)$/,
            loader: require.resolve('babel-loader'),
            options: {
                presets: [['react-app', { flow: false, typescript: true }], '@emotion/babel-preset-css-prop'],
                plugins: [require.resolve('@babel/plugin-proposal-class-properties')],
            },
        });
        config.resolve.extensions.push('.ts', '.tsx');

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
                                            path.resolve(__dirname, './../src/styles'),
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
