module.exports = {
    displayName: 'packages-sass-functions',
    preset: '../../../jest.preset.js',
    globals: {
        'ts-jest': { tsconfig: '<rootDir>/tsconfig.spec.json' },
    },
    transform: {
        '^.+\\.[tj]sx?$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    coverageDirectory: '../../../coverage/libs/packages/sass-functions',
    collectCoverageFrom: ['**/**.ts', '!**/index.ts'],
};
