const { includesForbiddenTag, getTagNameTranslate, forbiddenTags, mountNodeLoc } = require('../utils/rules.helper');

/**
 * Regra do Eslint para prevenir o uso de tags nativas `<a>`
 * e reforçar o uso do `<apollo-link>`, equivalente estável dentro do apollo design system. Arquivos `.jsx`/`.tsx`.
 *
 * @type {Rule}
 */
const jsxAnchorTagRule = context => {
    return {
        JSXOpeningElement: node => {
            const tagName = node && node.name.name;
            const wrongOcurrency = tagName;
            const rightOcurrencyUsage = getTagNameTranslate[tagName];

            if (includesForbiddenTag(forbiddenTags[1], tagName)) {
                context.report(node, `use <${rightOcurrencyUsage}> insted of <${wrongOcurrency}>`);
            }
        },
    };
};

/**
 * Regra do Eslint para prevenir o uso de tags nativas `<a>`
 * e reforçar o uso do `<apollo-link>`, equivalente estável dentro do apollo design system. Arquivos `.html`.
 *
 * @type {Rule}
 */
const htmlAnchorTagRule = context => {
    return {
        Element: node => {
            if (node.name === 'a') {
                node.loc = mountNodeLoc(node);
                context.report(node, 'use <apollo-link> insted of <a>');
            }
        },
    };
};

module.exports = { htmlAnchorTagRule, jsxAnchorTagRule };
