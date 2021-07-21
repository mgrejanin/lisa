const { includesForbiddenTag, getTagNameTranslate, forbiddenTags, mountNodeLoc } = require('../utils/rules.helper');

/**
 * Regra do Eslint para prevenir o uso de tags nativas
 * e reforçar o uso apollo design system. Arquivos `.html`.
 *
 * @type {Rule}
 */
const htmlUsageReinforcerTagsRule = context => {
    return {
        Element: node => {
            const tagName = node && node.name;
            node.loc = mountNodeLoc(node);

            if (includesForbiddenTag(forbiddenTags, tagName)) {
                const wrongOcurrency = tagName;
                const rightOcurrencyUsage = getTagNameTranslate[tagName];

                context.report(node, `use <${rightOcurrencyUsage}> insted of <${wrongOcurrency}>`);
            }
        },
    };
};

module.exports = htmlUsageReinforcerTagsRule;
