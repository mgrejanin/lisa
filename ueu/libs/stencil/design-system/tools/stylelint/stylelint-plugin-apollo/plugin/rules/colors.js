"use strict";
exports.__esModule = true;
var stylelint = require("stylelint");
var namespace_1 = require("../utils/namespace");
var colors_deprecated_1 = require("./../utils/colors.deprecated");
var utils = stylelint.utils;
var ruleName = namespace_1["default"]('colors');
var messages = function (item) {
    return utils.ruleMessages(ruleName, {
        expected: function (unfixed, _) { return item + " \"" + unfixed + "\" esta depreciado(a)."; }
    });
};
/**
 * Regra para validar o uso de tokens colors depreciados.
 */
function default_1(_) {
    return function lint(postcssRoot, postcssResult) {
        var validOptions = utils.validateOptions(postcssResult, ruleName);
        if (!validOptions) {
            return;
        }
        postcssRoot.walkDecls(function (node) {
            var changes = colors_deprecated_1["default"];
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
