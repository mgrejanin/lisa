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

module.exports = (on, config) => {
    on('file:preprocessor', preprocessTypescript(config, customizeWebpackConfig));
    return config;
};

function customizeWebpackConfig(webPackConfig) {
    webPackConfig.node = {
        fs: 'empty',
        child_process: 'empty',
        readline: 'empty',
    };

    pushFeature(webPackConfig);
    pushFeatures(webPackConfig);

    return webPackConfig;
}

function pushFeature(webPackConfig) {
    pushModuleRule(webPackConfig, /\.feature$/, 'cypress-cucumber-preprocessor/loader');
}

function pushFeatures(webPackConfig) {
    pushModuleRule(webPackConfig, /\.features$/, 'cypress-cucumber-preprocessor/lib/featuresLoader');
}

function pushModuleRule(webPackConfig, testRegex, loaderLib) {
    webPackConfig.module.rules.push({
        test: testRegex,
        use: [{ loader: loaderLib }],
    });
}
