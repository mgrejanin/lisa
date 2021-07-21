const nxPreset = require('@nrwl/jest/preset');

module.exports = {
    ...nxPreset,
    collectCoverage: true,
    coverageReporters: ['html', 'json'],
    collectCoverage: true,
    coverageThreshold: {
        global: {
            branches: 0,
            functions: 0,
            lines: 0,
            statements: 0,
        },
    },
    globals: {
        __DEV__: true,
    },
    collectCoverageFrom: [
        '**/*{.,-}(segment|route|state|validator|component|service|query|config|store|guard|interceptor|interface|pipe|directive|sdk|helper).ts',
        // '**/*.ts',
        '!**/*.mock.ts',
        // '!**/index.ts',
    ],
};
