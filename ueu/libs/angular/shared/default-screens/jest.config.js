module.exports = {
    displayName: 'angular-shared-default-screens',
    preset: '../../../../jest.preset.js',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            stringifyContentPathRegex: '\\.(html|svg)$',
            astTransformers: {
                before: [
                    'jest-preset-angular/build/InlineFilesTransformer',
                    'jest-preset-angular/build/StripStylesTransformer',
                ],
            },
            tsconfig: '<rootDir>/tsconfig.spec.json',
        },
    },
    coverageDirectory: '../../../../coverage/libs/angular/shared/default-screens',
    snapshotSerializers: [
        'jest-preset-angular/build/serializers/no-ng-attributes',
        'jest-preset-angular/build/serializers/ng-snapshot',
        'jest-preset-angular/build/serializers/html-comment',
    ],
};
