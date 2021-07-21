module.exports = {
    displayName: 'packages-event-tracking',
    preset: '../../../jest.preset.js',
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
        __DEV__: false,
        window: {},
    },
    transform: {
        '^.+\\.[tj]sx?$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    coverageDirectory: '../../../coverage/libs/packages/event-tracking',
};
