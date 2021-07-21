module.exports = {
    displayName: 'packages-stencil-sass',
    preset: '../../../jest.preset.js',
    globals: {
        'ts-jest': { tsconfig: '<rootDir>/tsconfig.spec.json' },
    },
    transform: {
        '^.+\\.[tj]sx?$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    coverageDirectory: '../../../coverage/libs/packages/stencil-sass',
    collectCoverageFrom: ['**/**.ts', '!**/index.ts'],
};
