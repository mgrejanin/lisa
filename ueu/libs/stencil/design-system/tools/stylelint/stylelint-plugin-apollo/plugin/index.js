"use strict";
exports.__esModule = true;
var stylelint_1 = require("stylelint");
var namespace_1 = require("./utils/namespace");
var rules_1 = require("./rules");
/**
 * Cria todas as regras exportadas dentro de `rules/`.
 */
var rulesPlugins = Object.keys(rules_1["default"]).map(function (ruleName) {
    return stylelint_1.createPlugin(namespace_1["default"](ruleName), rules_1["default"][ruleName]);
});
exports["default"] = rulesPlugins;
