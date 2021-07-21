const { includesForbiddenTag, getTagNameTranslate, forbiddenTags } = require('../utils/rules.helper');

/**
 * Regra do Eslint para prevenir o uso de tags nativas
 * e reforçar o uso apollo design system. Arquivos `.jsx`/`.tsx`.
 *
 * @type {Rule}
 */
const jsxUsageReinforcerTagsRule = context => {
    return {
        JSXOpeningElement: node => {
            const tagName = node && node.name.name;
            const wrongOcurrency = tagName;
            const rightOcurrencyUsage = getTagNameTranslate[tagName];

            if (includesForbiddenTag(forbiddenTags, tagName)) {
                context.report(node, `use <${rightOcurrencyUsage}> insted of <${wrongOcurrency}>`);
            }
        },
    };
};

module.exports = jsxUsageReinforcerTagsRule;
