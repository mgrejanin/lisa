const { readdirSync } = require('fs');

module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'scope-case': [2, 'always', 'kebab-case'],
        'scope-empty': [2, 'never'],
        'scope-enum': () => {
            const angular = readdirSync('./libs/angular', { withFileTypes: true })
                .filter(dirent => dirent.isDirectory())
                .map(dirent => dirent.name);
            const react = readdirSync('./libs/react', { withFileTypes: true })
                .filter(dirent => dirent.isDirectory())
                .map(dirent => dirent.name);
            const packages = readdirSync('./libs/packages', { withFileTypes: true })
                .filter(dirent => dirent.isDirectory())
                .map(dirent => dirent.name);
            const stencil = readdirSync('./libs/stencil', { withFileTypes: true })
                .filter(dirent => dirent.isDirectory())
                .map(dirent => dirent.name);
            const folders = [...angular, ...react, ...packages, ...stencil, 'core', 'shared', 'ui'];
            return [2, 'always', folders];
        },
    },
};
