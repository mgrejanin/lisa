'use strict';
exports.__esModule = true;
var prefix = 'apollo-scss';
/**
 * Método que aciona prefixo apollo no nome das rules.
 *
 * Provendo um padrão de nomenclatura.
 */
function namespace(ruleName) {
    return prefix + '/' + ruleName;
}
exports['default'] = namespace;
