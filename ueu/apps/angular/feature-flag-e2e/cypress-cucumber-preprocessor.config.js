/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line no-undef
const path = require('path');

// eslint-disable-next-line no-undef
const stepDefinitionsPath = path.resolve(process.cwd(), './src/integration/**/*');
// eslint-disable-next-line no-undef
const outputFolder = path.resolve(process.cwd(), '../../../cyreport/cucumber-json');

// eslint-disable-next-line no-undef
module.exports = {
    nonGlobalStepDefinitions: true,
    stepDefinitions: stepDefinitionsPath,
    commonPath: stepDefinitionsPath,
    cucumberJson: {
        generate: true,
        outputFolder: outputFolder,
        filePrefix: '',
        fileSuffix: '.cucumber',
    },
};
