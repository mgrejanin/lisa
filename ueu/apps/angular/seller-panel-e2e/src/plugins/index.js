// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const { preprocessTypescript } = require('@nrwl/cypress/plugins/preprocessor');
const webpack = require('webpack');

module.exports = (on, config) => {
    if (!config.env.tsConfig) {
        config.env.tsConfig = config.fileServerFolder + '/tsconfig.json';
    }

    on(
        'file:preprocessor',
        preprocessTypescript(config, wpConfig => {
            wpConfig.resolve.fallback = {
                ...wpConfig.resolve.fallback,
                path: require.resolve('path-browserify'),
            };
            wpConfig.plugins.push(
                new webpack.ProvidePlugin({
                    process: 'process/browser',
                }),
            );
            wpConfig.module.rules.push(
                {
                    test: /\.feature$/,
                    use: [
                        {
                            loader: 'cypress-cucumber-preprocessor/loader',
                        },
                    ],
                },
                {
                    test: /\.features$/,
                    use: [
                        {
                            loader: 'cypress-cucumber-preprocessor/lib/featuresLoader',
                        },
                    ],
                },
            );
            return wpConfig;
        }),
    );
};
