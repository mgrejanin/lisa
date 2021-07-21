'use strict';
exports.__esModule = true;
var stylelint = require('stylelint');
var namespace_1 = require('../utils/namespace');
var spacing_deprecated_1 = require('./../utils/spacing.deprecated');
var utils = stylelint.utils;
var ruleName = namespace_1['default']('spacing');
var messages = function () {
    return utils.ruleMessages(ruleName, {
        expected: function (unfixed, _) {
            return 'Token "' + unfixed + '" esta depreciado(a).';
        },
    });
};
/**
 * Regra para validar o uso de tokens spacing depreciados.
 */
function default_1(_) {
    return function lint(postcssRoot, postcssResult) {
        var validOptions = utils.validateOptions(postcssResult, ruleName);
        if (!validOptions) {
            return;
        }
        postcssRoot.walkDecls(function (node) {
            var changes = spacing_deprecated_1['default'];
            changes.map(function (c) {
                if (node.value.includes(c.key)) {
                    utils.report({
                        ruleName: ruleName,
                        result: postcssResult,
                        message: messages().expected(c.key),
                        node: node,
                        word: c.key,
                    });
                }
                return;
            });
            return;
        });
    };
}
exports['default'] = default_1;
