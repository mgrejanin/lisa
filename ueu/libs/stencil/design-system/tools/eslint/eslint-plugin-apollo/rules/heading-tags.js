const {
    includesForbiddenTag,
    getTagNameTranslate,
    forbiddenTags,
    getForbiddenTagsIndex,
    mountNodeLoc,
} = require('../utils/rules.helper');

/**
 * Regra do Eslint para prevenir o uso de tags nativas `<h1>`
 * e reforçar o uso do `<apollo-heading>`, equivalente estável dentro do apollo design system. Arquivos `.jsx`/`.tsx`.
 *
 * @type {Rule}
 */
const jsxh1TagRule = context => {
    return {
        JSXOpeningElement: node => {
            const tagName = node && node.name.name;
            const wrongOcurrency = tagName;
            const rightOcurrencyUsage = getTagNameTranslate[tagName];
            const h1Index = getForbiddenTagsIndex('h1');
            if (includesForbiddenTag(forbiddenTags[h1Index], tagName)) {
                context.report(node, `use <${rightOcurrencyUsage}> insted of <${wrongOcurrency}>`);
            }
        },
    };
};

/**
 * Regra do Eslint para prevenir o uso de tags nativas `<h2>`
 * e reforçar o uso do `<apollo-heading>`, equivalente estável dentro do apollo design system. Arquivos `.jsx`/`.tsx`.
 * @type {Rule}
 */
const jsxh2TagRule = context => {
    return {
        JSXOpeningElement: node => {
            const tagName = node && node.name.name;
            const wrongOcurrency = tagName;
            const rightOcurrencyUsage = getTagNameTranslate[tagName];
            const h1Index = getForbiddenTagsIndex('h2');
            if (includesForbiddenTag(forbiddenTags[h1Index], tagName)) {
                context.report(node, `use <${rightOcurrencyUsage}> insted of <${wrongOcurrency}>`);
            }
        },
    };
};

/**
 * Regra do Eslint para prevenir o uso de tags nativas `<h3>`
 * e reforçar o uso do `<apollo-heading>`, equivalente estável dentro do apollo design system. Arquivos `.jsx`/`.tsx`.
 * @type {Rule}
 */
const jsxh3TagRule = context => {
    return {
        JSXOpeningElement: node => {
            const tagName = node && node.name.name;
            const wrongOcurrency = tagName;
            const rightOcurrencyUsage = getTagNameTranslate[tagName];
            const h1Index = getForbiddenTagsIndex('h3');
            if (includesForbiddenTag(forbiddenTags[h1Index], tagName)) {
                context.report(node, `use <${rightOcurrencyUsage}> insted of <${wrongOcurrency}>`);
            }
        },
    };
};

/**
 * Regra do Eslint para prevenir o uso de tags nativas `<h4>`
 * e reforçar o uso do `<apollo-heading>`, equivalente estável dentro do apollo design system. Arquivos `.jsx`/`.tsx`.
 * @type {Rule}
 */
const jsxh4TagRule = context => {
    return {
        JSXOpeningElement: node => {
            const tagName = node && node.name.name;
            const wrongOcurrency = tagName;
            const rightOcurrencyUsage = getTagNameTranslate[tagName];
            const h1Index = getForbiddenTagsIndex('h4');
            if (includesForbiddenTag(forbiddenTags[h1Index], tagName)) {
                context.report(node, `use <${rightOcurrencyUsage}> insted of <${wrongOcurrency}>`);
            }
        },
    };
};

/**
 * Regra do Eslint para prevenir o uso de tags nativas `<h5>`
 * e reforçar o uso do `<apollo-heading>`, equivalente estável dentro do apollo design system. Arquivos `.jsx`/`.tsx`.
 * @type {Rule}
 */
const jsxh5TagRule = context => {
    return {
        JSXOpeningElement: node => {
            const tagName = node && node.name.name;
            const wrongOcurrency = tagName;
            const rightOcurrencyUsage = getTagNameTranslate[tagName];
            const h1Index = getForbiddenTagsIndex('h5');
            if (includesForbiddenTag(forbiddenTags[h1Index], tagName)) {
                context.report(node, `use <${rightOcurrencyUsage}> insted of <${wrongOcurrency}>`);
            }
        },
    };
};

/**
 * Regra do Eslint para prevenir o uso de tags nativas `<h6>`
 * e reforçar o uso do `<apollo-heading>`, equivalente estável dentro do apollo design system. Arquivos `.jsx`/`.tsx`.
 * @type {Rule}
 */
const jsxh6TagRule = context => {
    return {
        JSXOpeningElement: node => {
            const tagName = node && node.name.name;
            const wrongOcurrency = tagName;
            const rightOcurrencyUsage = getTagNameTranslate[tagName];
            const h1Index = getForbiddenTagsIndex('h6');
            if (includesForbiddenTag(forbiddenTags[h1Index], tagName)) {
                context.report(node, `use <${rightOcurrencyUsage}> insted of <${wrongOcurrency}>`);
            }
        },
    };
};

/**
 * Regra do Eslint para prevenir o uso de tags nativas `<h1>`
 * e reforçar o uso do `<apollo-heading>`, equivalente estável dentro do apollo design system. Arquivos `.html`.
 * @type {Rule}
 */
const htmlh1TagRule = context => {
    return {
        Element: node => {
            if (node.name === 'h1') {
                node.loc = mountNodeLoc(node);
                context.report(node, 'use apollo-heading insted of h1');
            }
        },
    };
};

/**
 * Regra do Eslint para prevenir o uso de tags nativas `<h2>`
 * e reforçar o uso do `<apollo-heading>`, equivalente estável dentro do apollo design system. Arquivos `.html`.
 * @type {Rule}
 */
const htmlh2TagRule = context => {
    return {
        Element: node => {
            if (node.name === 'h2') {
                node.loc = mountNodeLoc(node);
                context.report(node, 'use apollo-heading insted of h2');
            }
        },
    };
};

/**
 * Regra do Eslint para prevenir o uso de tags nativas `<h3>`
 * e reforçar o uso do `<apollo-heading>`, equivalente estável dentro do apollo design system. Arquivos `.html`.
 * @type {Rule}
 */
const htmlh3TagRule = context => {
    return {
        Element: node => {
            if (node.name === 'h3') {
                node.loc = mountNodeLoc(node);
                context.report(node, 'use apollo-heading insted of h3');
            }
        },
    };
};

/**
 * Regra do Eslint para prevenir o uso de tags nativas `<h4>`
 * e reforçar o uso do `<apollo-heading>`, equivalente estável dentro do apollo design system. Arquivos `.html`.
 * @type {Rule}
 */
const htmlh4TagRule = context => {
    return {
        Element: node => {
            if (node.name === 'h4') {
                node.loc = mountNodeLoc(node);
                context.report(node, 'use apollo-heading insted of h4');
            }
        },
    };
};

/**
 * Regra do Eslint para prevenir o uso de tags nativas `<h5>`
 * e reforçar o uso do `<apollo-heading>`, equivalente estável dentro do apollo design system. Arquivos `.html`.
 * @type {Rule}
 */
const htmlh5TagRule = context => {
    return {
        Element: node => {
            if (node.name === 'h5') {
                node.loc = mountNodeLoc(node);
                context.report(node, 'use apollo-heading insted of h5');
            }
        },
    };
};

/**
 * Regra do Eslint para prevenir o uso de tags nativas `<h6>`
 * e reforçar o uso do `<apollo-heading>`, equivalente estável dentro do apollo design system. Arquivos `.html`.
 * @type {Rule}
 */
const htmlh6TagRule = context => {
    return {
        Element: node => {
            if (node.name === 'h6') {
                node.loc = mountNodeLoc(node);
                context.report(node, 'use apollo-heading insted of h6');
            }
        },
    };
};

module.exports = {
    htmlh1TagRule,
    htmlh2TagRule,
    htmlh3TagRule,
    htmlh4TagRule,
    htmlh5TagRule,
    htmlh6TagRule,
    jsxh1TagRule,
    jsxh2TagRule,
    jsxh3TagRule,
    jsxh4TagRule,
    jsxh5TagRule,
    jsxh6TagRule,
};
