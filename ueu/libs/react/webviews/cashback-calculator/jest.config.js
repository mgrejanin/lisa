module.exports = {
    displayName: 'cashback-calculator',
    preset: '../../../../jest.preset.js',
    transform: {
        '^.+\\.[tj]sx?$': ['babel-jest', { cwd: __dirname, configFile: './babel-jest.config.json' }],
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    setupFilesAfterEnv: ['./setupTests.js'],
    coverageDirectory: '../../../../coverage/libs/react/webviews/cashback-calculator',
};
