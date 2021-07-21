const tsconfig = require('../../../tsconfig.base.json');
const paths = tsconfig.compilerOptions.paths;
const alias = Object.keys(paths).reduce((aliases, k) => {
    return { ...aliases, [k]: './' + paths[k][0] };
}, {});

module.exports = {
    presets: [require.resolve('@docusaurus/core/lib/babel/preset')],
    plugins: [
        [
            require.resolve('babel-plugin-module-resolver'),
            {
                alias: alias,
            },
        ],
        [
            require.resolve('@babel/plugin-proposal-decorators'),
            {
                legacy: true,
            },
        ],
    ],
};
