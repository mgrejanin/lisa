const { htmlParagraphTagRule, jsxParagraphTagRule } = require('./rules/paragraph-tag');

const { htmlAnchorTagRule, jsxAnchorTagRule } = require('./rules/anchor-tag');

const {
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
} = require('./rules/heading-tags');

const htmlUsageReinforcerTagsRule = require('./rules/html-usage-reinforcer');
const jsxUsageReinforcerTagsRule = require('./rules/jsx-usage-reinforcer');

const generateRuleObject = ({ description, recommended }, createFunc) => {
    return {
        meta: {
            description,
            recommended,
            type: 'code',
            category: 'Best Practice',
            fixable: null,
            schema: [],
        },
        create: createFunc,
    };
};

module.exports = {
    rules: {
        'html-paragraph-tag': {
            ...generateRuleObject(
                { description: 'Disallow usage of paragraph <p> tag', recommended: false },
                htmlParagraphTagRule,
            ),
        },
        'html-anchor-tag': {
            ...generateRuleObject(
                { description: 'Disallow usage of anchor <a> tag', recommended: false },
                htmlAnchorTagRule,
            ),
        },
        'jsx-anchor-tag': {
            ...generateRuleObject(
                { description: 'Disallow usage of anchor <a> tag', recommended: false },
                jsxAnchorTagRule,
            ),
        },
        'html-h1-tag': {
            ...generateRuleObject({ description: 'Disallow usage of <h1> tag', recommended: false }, htmlh1TagRule),
        },
        'html-h2-tag': {
            ...generateRuleObject({ description: 'Disallow usage of <h2> tag', recommended: false }, htmlh2TagRule),
        },
        'html-h3-tag': {
            ...generateRuleObject({ description: 'Disallow usage of <h3> tag', recommended: false }, htmlh3TagRule),
        },
        'html-h4-tag': {
            ...generateRuleObject({ description: 'Disallow usage of <h4> tag', recommended: false }, htmlh4TagRule),
        },
        'html-h5-tag': {
            ...generateRuleObject({ description: 'Disallow usage of <h5> tag', recommended: false }, htmlh5TagRule),
        },
        'html-h6-tag': {
            ...generateRuleObject({ description: 'Disallow usage of <h6> tag', recommended: false }, htmlh6TagRule),
        },
        'jsx-h1-tag': {
            ...generateRuleObject({ description: 'Disallow usage of <h1> tag', recommended: false }, jsxh1TagRule),
        },
        'jsx-h2-tag': {
            ...generateRuleObject({ description: 'Disallow usage of <h2> tag', recommended: false }, jsxh2TagRule),
        },
        'jsx-h3-tag': {
            ...generateRuleObject({ description: 'Disallow usage of <h3> tag', recommended: false }, jsxh3TagRule),
        },
        'jsx-h4-tag': {
            ...generateRuleObject({ description: 'Disallow usage of <h4> tag', recommended: false }, jsxh4TagRule),
        },
        'jsx-h5-tag': {
            ...generateRuleObject({ description: 'Disallow usage of <h5> tag', recommended: false }, jsxh5TagRule),
        },
        'jsx-h6-tag': {
            ...generateRuleObject({ description: 'Disallow usage of <h6> tag', recommended: false }, jsxh6TagRule),
        },
        'jsx-paragraph-tag': {
            ...generateRuleObject(
                { description: 'Disallow usage of <p> tag', recommended: false },
                jsxParagraphTagRule,
            ),
        },
        'html-usage-reinforcer': {
            ...generateRuleObject(
                { description: 'Disallow usage of native tags', recommended: true },
                htmlUsageReinforcerTagsRule,
            ),
        },
        'jsx-usage-reinforcer': {
            ...generateRuleObject(
                { description: 'Disallow usage of native tags', recommended: true },
                jsxUsageReinforcerTagsRule,
            ),
        },
    },
};
