"use strict";
exports.__esModule = true;
var stylelint = require("stylelint");
var namespace_1 = require("../utils/namespace");
var parseColorfn = [{ key: 'parseColor', type: 'função' }];
var utils = stylelint.utils;
var ruleName = namespace_1["default"]('parseColor');
var messages = function (item) {
    return utils.ruleMessages(ruleName, {
        expected: function (unfixed, _) { return "A " + item + " \"" + unfixed + "\" esta depreciada."; }
    });
};
/**
 * Regra para validar o uso da funcão `parseColor()`.
 */
function default_1(_) {
    return function lint(postcssRoot, postcssResult) {
        var validOptions = utils.validateOptions(postcssResult, ruleName);
        if (!validOptions) {
            return;
        }
        postcssRoot.walkDecls(function (node) {
            var changes = parseColorfn;
            changes.map(function (c) {
                if (node.value.includes(c.key)) {
                    utils.report({
                        ruleName: ruleName,
                        result: postcssResult,
                        message: messages(c.type).expected(c.key),
                        node: node,
                        word: c.key
                    });
                }
                return;
            });
            return;
        });
    };
}
exports["default"] = default_1;
