const path = require('path');
const { sassFunctions } = require('../../../dist/libs/packages/sass-functions/src/index.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function (context, options) {
    return {
        name: 'docusaurus-custom-webpack',
        configureWebpack(config, isServer, utils) {
            return {
                module: {
                    rules: [
                        {
                            test: /\.s[ac]ss$/i,
                            use: [
                                {
                                    loader: 'sass-loader',
                                    options: {
                                        implementation: require('sass'),
                                        sassOptions: {
                                            includePaths: [
                                                path.resolve(__dirname, '../../../node_modules'),
                                                path.resolve(
                                                    __dirname,
                                                    '../../../libs/stencil/design-system/src/styles',
                                                ),
                                                path.resolve(__dirname, '../../../libs/ui/styles/src/lib'),
                                                path.resolve(
                                                    __dirname,
                                                    '../../../libs/stencil/design-system/helpers/src/lib/styles',
                                                ),
                                            ],
                                            functions: {
                                                'theme($value)': sassFunctions.theme
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            test: /\.(jpe?g|png|gif|svg)$/i,
                            loader: 'file-loader',
                        },
                    ],
                },
                plugins: [
                    new CopyWebpackPlugin({
                        patterns: [
                            {
                                from: 'libs/stencil/design-system/src/statics/assets/design-system',
                                to: './assets/design-system',
                            },
                            {
                                from: 'libs/ui/components/src/assets',
                                to: './assets/ui',
                            },
                            {
                                from: 'apps/angular/dev-portal/src/assets',
                                to: './assets/dev-portal',
                            },
                            {
                                from: './libs/angular/dev-portal/assets/src/lib',
                                to: './assets',
                            },
                            {
                                from: 'libs/packages/keycloak/src/assets',
                                to: './assets/keycloak',
                            },
                        ],
                    }),
                ],
            };
        },
    };
};
