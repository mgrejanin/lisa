const {
    includesForbiddenTag,
    getTagNameTranslate,
    forbiddenTags,
    getForbiddenTagsIndex,
    mountNodeLoc,
} = require('../utils/rules.helper');

/**
 * Regra do Eslint para prevenir o uso de tags nativas `<p>`
 * e reforçar o uso do `<apollo-text>`, equivalente estável dentro do apollo design system. Arquivos `.jsx`/`.tsx`.
 *
 * @type {Rule}
 */
const jsxParagraphTagRule = context => {
    return {
        JSXOpeningElement: node => {
            const tagName = node && node.name.name;
            const wrongOcurrency = tagName;
            const rightOcurrencyUsage = getTagNameTranslate[tagName];

            const pIndex = getForbiddenTagsIndex('p');

            if (includesForbiddenTag(forbiddenTags[pIndex], tagName)) {
                context.report(node, `use <${rightOcurrencyUsage}> insted of <${wrongOcurrency}>`);
            }
        },
    };
};

/**
 * Regra do Eslint para prevenir o uso de tags nativas `<p>`
 * e reforçar o uso do `<apollo-text>`, equivalente estável dentro do apollo design system. Arquivos `.html`.
 *
 * @type {Rule}
 */
const htmlParagraphTagRule = context => {
    return {
        Element: node => {
            if (node.name === 'p') {
                node.loc = mountNodeLoc(node);
                context.report(node, 'use <apollo-text> insted of <p>');
            }
        },
    };
};

module.exports = { htmlParagraphTagRule, jsxParagraphTagRule };
